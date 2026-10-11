import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../../shared/components/page-title.component';
import { SITE_DATA } from '../../../core/constants/site-data';
import { InquiryService } from '../../../core/services/inquiry.service';

export interface DiagnosticSymptom {
  id: string;
  label: string;
  severity: 'Critical' | 'High' | 'Moderate';
  probableCause: string;
  recommendedAction: string;
  preventiveAdvice: string;
}

export interface DiagnosticSystem {
  id: string;
  name: string;
  icon: string;
  description: string;
  symptoms: DiagnosticSymptom[];
}

@Component({
  selector: 'app-system-diagnostics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PageTitleComponent],
  templateUrl: './system-diagnostics.component.html',
  styleUrl: './system-diagnostics.component.scss'
})
export class SystemDiagnosticsComponent {
  private fb = inject(FormBuilder);
  private inquiryService = inject(InquiryService);
  siteData = SITE_DATA;

  readonly diagnosticSystems: DiagnosticSystem[] = [
    {
      id: 'cctv',
      name: 'CCTV Camera Surveillance',
      icon: 'fa-video-camera',
      description: 'Troubleshoot cameras, NVR recording, night vision, and monitor display faults.',
      symptoms: [
        {
          id: 'cctv_night_fail',
          label: 'Night Vision Failure: Camera screen pitch black or IR LEDs not glowing',
          severity: 'High',
          probableCause: 'Infrared (IR) cut-filter stuck, ambient LED driver failure, or 12V SMPS voltage dropping below 11.5V under night load across long cable runs.',
          recommendedAction: 'Measure DC voltage at the camera pigtail under dark conditions. Verify SMPS capacity and inspect optical lens for spiderweb or dust buildup.',
          preventiveAdvice: 'Upgrade to centralized regulated power supplies with individual channel fuses and seasonal voltage calibration.'
        },
        {
          id: 'cctv_distortion',
          label: 'Video Lines, Rolling Bars or Horizontal Flickering on Live View',
          severity: 'Moderate',
          probableCause: 'Ground loop interference or inductive AC electrical noise caused by running cables parallel to high-voltage elevator power cables without PVC conduit shielding.',
          recommendedAction: 'Install ground loop isolators, re-crimp BNC/RJ45 connectors, or shift cables into separate heavy-duty PVC conduits.',
          preventiveAdvice: 'Always maintain minimum 30cm physical clearance between surveillance Cat6 lines and building 415V three-phase electrical shafts.'
        },
        {
          id: 'cctv_hdd_beep',
          label: 'NVR Beeping Continuously / "No Hard Disk" / HDD Error Displayed',
          severity: 'Critical',
          probableCause: 'Hard drive S.M.A.R.T. bad sector threshold exceeded or disk head failure. Very common when cheap desktop PC drives are used instead of 24/7 WD Purple surveillance drives.',
          recommendedAction: 'Immediate backup of essential incident footage. Replace drive with Western Digital Purple or Seagate SkyHawk 24/7 surveillance-grade HDD.',
          preventiveAdvice: 'Conduct quarterly S.M.A.R.T. diagnostics and connect NVR to an online pure sine-wave UPS to prevent abrupt power loss.'
        },
        {
          id: 'cctv_total_offline',
          label: 'All Cameras Suddenly Offline / Remote App Disconnected',
          severity: 'Critical',
          probableCause: 'Central PoE Switch power supply failure, blown SMPS main fuse, or router local IP conflict preventing cloud P2P streaming.',
          recommendedAction: 'Check rack PDU power strip, inspect PoE switch status LEDs, and verify local NVR monitor output via direct HDMI cable.',
          preventiveAdvice: 'Implement dedicated rack dressing with labelled surge-protected power distribution and static IP reservations on your router.'
        }
      ]
    },
    {
      id: 'intercom',
      name: 'Housing Society Intercom & EPABX',
      icon: 'fa-phone',
      description: 'Troubleshoot humming noise, dead dial tones, cross-talk, and flat-to-gate calling issues.',
      symptoms: [
        {
          id: 'intercom_hum',
          label: 'Persistent Humming / Buzzing Noise on Society Phone Lines',
          severity: 'High',
          probableCause: 'AC electrical induction leakage or moisture seepage bridging multi-pair telephone cables inside building duct shafts and unsealed junction boxes.',
          recommendedAction: 'Perform line loop resistance and insulation testing across duct risers. Re-terminate pairs into moisture-sealed Krone DP distribution boxes with gel crimps.',
          preventiveAdvice: 'Replace old open-joint telephone wires with armoured, jelly-filled multi-pair cables inside sealed ISI PVC conduit pipes.'
        },
        {
          id: 'intercom_dead_all',
          label: 'Complete System Silence: Dial Tone Dead Across All Society Flats',
          severity: 'Critical',
          probableCause: 'Central EPABX power supply unit (SMPS) failure, motherboard lightning surge lockout, or blown primary line fuse.',
          recommendedAction: 'Inspect central EPABX cabinet in society office. Verify LED power indicators. If motherboard is unresponsive, our field engineers supply standby replacement PBX.',
          preventiveAdvice: 'Enroll society into an Annual Maintenance Contract (AMC) with guaranteed emergency breakdown dispatch within 4 to 24 hours.'
        },
        {
          id: 'intercom_dead_single',
          label: 'Single Flat or Wing Dead: Gatekeeper Cannot Call Specific Flats',
          severity: 'Moderate',
          probableCause: 'Severed copper pair in floor distribution box, oxidized telephone instrument cradle hook, or cable cut caused by building drilling/painting work.',
          recommendedAction: 'Trace individual extension pair from main distribution frame (MDF) to floor DP box. Test dial tone with a technician butt-set telephone.',
          preventiveAdvice: 'Ensure floor DP boxes are numbered, locked, and protected against unauthorized third-party cable tampering.'
        },
        {
          id: 'intercom_crosstalk',
          label: 'Cross-Talk: Hearing Other Residents Speaking on the Same Line',
          severity: 'Moderate',
          probableCause: 'Insulation breakdown between adjacent wire pairs inside aging multi-pair cable, or water bridging terminal contacts in wet electrical shafts.',
          recommendedAction: 'Shift affected flats to spare virgin pairs in the multi-pair riser cable or re-cable the affected shaft with fresh Delton copper wiring.',
          preventiveAdvice: 'Avoid running telephone wiring inside plumbing shafts where drain pipe condensation inevitably oxidizes copper.'
        }
      ]
    },
    {
      id: 'biometrics',
      name: 'Biometric Access Control & EM Locks',
      icon: 'fa-lock',
      description: 'Troubleshoot electromagnetic locks, facial scanners, fingerprint readers, and software sync.',
      symptoms: [
        {
          id: 'bio_lock_stuck',
          label: 'Electromagnetic (EM) Door Lock Jammed or Won\'t Release',
          severity: 'Critical',
          probableCause: 'Residual magnetism on armature plate, failed exit push button switch, or welded relay contact in the 12V lock controller power supply.',
          recommendedAction: 'Test exit button microswitch, inspect emergency break-glass unit circuit, and clean armature plate surface with isopropyl alcohol.',
          preventiveAdvice: 'Install fail-safe EM locks with dedicated battery backup controllers and annual relay contact testing.'
        },
        {
          id: 'bio_rejection',
          label: 'High Rejection Rate: Face or Fingerprint Scanner Fails to Recognize Users',
          severity: 'Moderate',
          probableCause: 'Scratched optical glass sensor, direct afternoon sunlight blinding facial recognition infrared cameras, or biometric matching threshold set too strict.',
          recommendedAction: 'Clean optical prism with microfiber cloth, install outdoor sun-shading hood, and recalibrate facial recognition exposure settings.',
          preventiveAdvice: 'Re-enroll staff using 3-angle facial capture and select machines with anti-spoofing dual-lens cameras.'
        }
      ]
    }
  ];

  selectedSystemId = signal<string>('cctv');
  selectedSymptomId = signal<string>('cctv_hdd_beep');
  isSubmittingLead = signal<boolean>(false);
  leadSubmitted = signal<boolean>(false);

  leadForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
    societyOrOrg: [''],
    location: ['Thane West', Validators.required]
  });

  currentSystem = computed(() => {
    return this.diagnosticSystems.find(s => s.id === this.selectedSystemId()) || this.diagnosticSystems[0];
  });

  currentSymptom = computed(() => {
    return this.currentSystem().symptoms.find(sym => sym.id === this.selectedSymptomId()) || this.currentSystem().symptoms[0];
  });

  selectSystem(systemId: string): void {
    this.selectedSystemId.set(systemId);
    const firstSymptom = this.currentSystem().symptoms[0];
    if (firstSymptom) {
      this.selectedSymptomId.set(firstSymptom.id);
    }
  }

  selectSymptom(symptomId: string): void {
    this.selectedSymptomId.set(symptomId);
  }

  getWhatsAppTriageUrl(): string {
    const sys = this.currentSystem().name;
    const sym = this.currentSymptom().label;
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const text = [
      `*DIAGNOSTIC TRIAGE INQUIRY — SUNRISE COMMUNICATION*`,
      `⚙️ *System:* ${sys}`,
      `⚠️ *Symptom:* ${sym}`,
      `📍 *Location:* Thane / Mumbai MMR`,
      `👨‍🔧 *Request:* We need a senior field engineer to inspect our site.`
    ].join('\n');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  async onSubmitDiagnosticLead(): Promise<void> {
    if (this.leadForm.valid) {
      this.isSubmittingLead.set(true);
      const v = this.leadForm.value;
      const sys = this.currentSystem().name;
      const sym = this.currentSymptom().label;

      try {
        await this.inquiryService.submitInquiry({
          inquiry_type: 'contact',
          name: v.name || '',
          phone: v.phone || '',
          organization: v.societyOrOrg || '',
          systems_required: [sys],
          message: `Diagnostic Triage Lead: ${v.name} (${v.phone}) at ${v.societyOrOrg || 'N/A'}, ${v.location}. System: ${sys}. Symptom: ${sym}.`
        });

        this.leadSubmitted.set(true);
        this.leadForm.reset({
          name: '',
          phone: '',
          societyOrOrg: '',
          location: 'Thane West'
        });
      } catch (err) {
        console.error('Diagnostic lead submit error:', err);
      } finally {
        this.isSubmittingLead.set(false);
      }
    } else {
      this.leadForm.markAllAsTouched();
    }
  }
}
