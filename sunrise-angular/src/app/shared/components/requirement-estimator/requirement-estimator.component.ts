import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SITE_DATA } from '../../../core/constants/site-data';

export type PremiseType = 'society' | 'office' | 'warehouse' | 'retail' | 'residential';

@Component({
  selector: 'app-requirement-estimator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requirement-estimator.component.html',
  styleUrl: './requirement-estimator.component.scss'
})
export class RequirementEstimatorComponent {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  // Step State
  currentStep = signal<number>(1);
  copiedToast = signal<boolean>(false);

  // Configuration Signals
  selectedPremise = signal<PremiseType>('society');
  premiseLocation = signal<string>('Thane (West)');

  // Services Selected
  needCctv = signal<boolean>(true);
  needIntercom = signal<boolean>(true);
  needBiometrics = signal<boolean>(false);
  needNetworking = signal<boolean>(false);
  needAmc = signal<boolean>(true);

  // Quantitative Parameters
  cameraCount = signal<number>(8);
  storageDays = signal<number>(30);
  flatCount = signal<number>(32);
  wingCount = signal<number>(1);
  doorCount = signal<number>(2);
  employeeCount = signal<number>(25);
  lanPoints = signal<number>(24);

  // Derived Architecture Recommendations
  recommendedNvr = computed(() => {
    const cams = this.cameraCount();
    if (cams <= 4) return '4-Channel 4K Network Video Recorder (NVR)';
    if (cams <= 8) return '8-Channel 4K H.265+ NVR';
    if (cams <= 16) return '16-Channel 4K H.265+ NVR';
    if (cams <= 32) return '32-Channel 4K Enterprise NVR';
    return '64-Channel Multi-Drive High-Capacity NVR';
  });

  recommendedHdd = computed(() => {
    const cams = this.cameraCount();
    const days = this.storageDays();
    const estTb = Math.ceil((cams * 20 * days) / 1000);
    const standardSizes = [2, 4, 6, 8, 12, 16, 24];
    const match = standardSizes.find(s => s >= estTb) || standardSizes[standardSizes.length - 1];
    return `${match} TB Surveillance Grade HDD (WD Purple / Seagate SkyHawk)`;
  });

  recommendedIntercom = computed(() => {
    const flats = this.flatCount();
    if (flats <= 24) return 'Compact Multi-Line Society Intercom (up to 24 lines)';
    if (flats <= 64) return 'Matrix ETERNITY Expandable CHS Intercom (up to 64 lines)';
    if (flats <= 128) return 'Matrix ETERNITY Hybrid IP-PBX (up to 128 lines)';
    return 'Enterprise Modular IP-PBX with Optical Fiber Backbone (128+ lines)';
  });

  recommendedBiometric = computed(() => {
    const employees = this.employeeCount();
    const doors = this.doorCount();
    if (doors > 2 || employees > 100) {
      return 'Essl AI Facial Recognition Readers + 600lbs Fail-Safe EM Locks';
    }
    return 'Essl X990 Fingerprint Terminal + Push-to-Exit EM Lock Setup';
  });

  // Text representation of BOQ for WhatsApp or Clipboard
  formattedBoqText = computed(() => {
    const premiseNames: Record<PremiseType, string> = {
      society: 'Cooperative Housing Society (CHS)',
      office: 'Corporate Office / Commercial Complex',
      warehouse: 'Industrial Warehouse / Factory',
      retail: 'Retail Store / Showroom',
      residential: 'Residential Villa / Bungalow'
    };

    const servicesList: string[] = [];
    if (this.needCctv()) servicesList.push(`CCTV (${this.cameraCount()} Cams, ${this.storageDays()} Days)`);
    if (this.needIntercom()) servicesList.push(`Intercom (${this.flatCount()} Flats, ${this.wingCount()} Wing(s))`);
    if (this.needBiometrics()) servicesList.push(`Biometrics (${this.doorCount()} Doors, ${this.employeeCount()} Users)`);
    if (this.needNetworking()) servicesList.push(`Structured Cabling (${this.lanPoints()} Points)`);
    if (this.needAmc()) servicesList.push('Annual Maintenance Contract (AMC)');

    return [
      `*Sunrise Communication — Technical Requirement & BOQ Estimate*`,
      `🏢 *Premise Type:* ${premiseNames[this.selectedPremise()]}`,
      `📍 *Target Location:* ${this.premiseLocation() || 'Thane / Mumbai'}`,
      `⚙️ *Scope of Work:* ${servicesList.join(', ')}`,
      ``,
      `📋 *Calculated Architecture:*`,
      this.needCctv() ? `• Surveillance: ${this.recommendedNvr()} + ${this.recommendedHdd()}` : null,
      this.needIntercom() ? `• Telecom: ${this.recommendedIntercom()}` : null,
      this.needBiometrics() ? `• Access Control: ${this.recommendedBiometric()}` : null,
      this.needNetworking() ? `• Cabling: ${this.lanPoints()} Certified Cat6 LAN I/O Ports` : null,
      this.needAmc() ? `• Maintenance: Scheduled Preventive Servicing & On-Call Breakdown Support` : null,
      ``,
      `📌 _Note: Indicative requirement estimate. Final hardware selection, cable lengths, and proposal subject to site survey._`,
      ``,
      `📞 *Provider:* Sunrise Communication (Thane West)`,
      `📱 *Direct Contact:* +91 93238 48622 / +91 99875 55399`,
      `🌐 *Website:* https://sunrisecommunication.in`
    ].filter(Boolean).join('\n');
  });

  // Dynamic WhatsApp Lead Generation Link
  whatsappQuoteUrl = computed(() => {
    return `https://wa.me/919323848622?text=${encodeURIComponent(this.formattedBoqText())}`;
  });

  copyBoqToClipboard() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.formattedBoqText()).then(() => {
        this.copiedToast.set(true);
        setTimeout(() => this.copiedToast.set(false), 3500);
      });
    }
  }

  setPremise(type: PremiseType) {
    this.selectedPremise.set(type);
    if (type === 'society') {
      this.needCctv.set(true);
      this.needIntercom.set(true);
      this.needBiometrics.set(false);
      this.needNetworking.set(false);
      this.cameraCount.set(16);
      this.flatCount.set(48);
    } else if (type === 'office') {
      this.needCctv.set(true);
      this.needIntercom.set(false);
      this.needBiometrics.set(true);
      this.needNetworking.set(true);
      this.cameraCount.set(8);
      this.doorCount.set(2);
      this.employeeCount.set(35);
      this.lanPoints.set(30);
    } else if (type === 'warehouse') {
      this.needCctv.set(true);
      this.needIntercom.set(false);
      this.needBiometrics.set(true);
      this.needNetworking.set(true);
      this.cameraCount.set(16);
      this.storageDays.set(45);
    } else {
      this.needCctv.set(true);
      this.needIntercom.set(false);
      this.needBiometrics.set(false);
      this.cameraCount.set(4);
    }
  }

  goToStep(step: number) {
    this.currentStep.set(step);
  }
}
