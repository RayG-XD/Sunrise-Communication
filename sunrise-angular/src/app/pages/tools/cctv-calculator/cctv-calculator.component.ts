import { Component, OnInit, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { SITE_DATA } from '../../../core/constants/site-data';

export type ResolutionOption = '1080p' | '3mp' | '4mp' | '5mp' | '8mp';
export type CodecOption = 'h264' | 'h265' | 'h265plus';
export type RecordingMode = 'continuous' | 'motion';

@Component({
  selector: 'app-cctv-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cctv-calculator.component.html',
  styleUrl: './cctv-calculator.component.scss',
})
export class CctvCalculatorComponent implements OnInit {
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  siteData = SITE_DATA;
  copiedToast = signal<boolean>(false);
  activeFaqIndex = signal<number | null>(0);
  activePreset = signal<string>('society');

  // Input Signals
  cameraCount = signal<number>(16);
  resolution = signal<ResolutionOption>('4mp');
  codec = signal<CodecOption>('h265plus');
  recordingDays = signal<number>(30);
  recordingHoursPerDay = signal<number>(24);
  recordingMode = signal<RecordingMode>('continuous');
  fps = signal<number>(15);
  audioRecording = signal<boolean>(true);

  // Resolution Metadata
  readonly resolutions: {
    id: ResolutionOption;
    name: string;
    tag: string;
    baseBitrateMbps: number;
  }[] = [
    {
      id: '1080p',
      name: '2 MP (1080p Full HD)',
      tag: 'Standard Residential',
      baseBitrateMbps: 2.0,
    },
    { id: '3mp', name: '3 MP (1296p HD+)', tag: 'Entry Commercial', baseBitrateMbps: 3.0 },
    { id: '4mp', name: '4 MP (2K Quad HD)', tag: 'Recommended for CHS', baseBitrateMbps: 4.0 },
    { id: '5mp', name: '5 MP (Super HD)', tag: 'High-Risk Perimeter', baseBitrateMbps: 5.0 },
    { id: '8mp', name: '8 MP (4K Ultra HD)', tag: 'Bank & Gate ANPR', baseBitrateMbps: 8.0 },
  ];

  // Codec Compression Multipliers
  readonly codecs: { id: CodecOption; name: string; savings: string; factor: number }[] = [
    { id: 'h264', name: 'H.264 (Legacy)', savings: 'Baseline (High storage)', factor: 1.0 },
    {
      id: 'h265',
      name: 'H.265 (Standard HEVC)',
      savings: '50% Bandwidth & Storage Saved',
      factor: 0.5,
    },
    {
      id: 'h265plus',
      name: 'H.265+ / Ultra H.265 (Smart AI)',
      savings: 'Up to 75% Storage Saved',
      factor: 0.25,
    },
  ];

  // Calculations
  effectiveBitratePerCameraMbps = computed(() => {
    const res = this.resolutions.find((r) => r.id === this.resolution()) || this.resolutions[2];
    const cod = this.codecs.find((c) => c.id === this.codec()) || this.codecs[2];

    // FPS multiplier relative to 15fps baseline
    const fpsMultiplier = this.fps() / 15;
    // Audio overhead ~0.064 Mbps
    const audioOverhead = this.audioRecording() ? 0.064 : 0;

    const calculated = res.baseBitrateMbps * cod.factor * fpsMultiplier + audioOverhead;
    return Math.max(0.15, Number(calculated.toFixed(2)));
  });

  totalBandwidthMbps = computed(() => {
    return Number((this.effectiveBitratePerCameraMbps() * this.cameraCount()).toFixed(1));
  });

  dailyStoragePerCameraGb = computed(() => {
    const bitrate = this.effectiveBitratePerCameraMbps();
    const hours =
      this.recordingMode() === 'motion'
        ? Math.min(12, this.recordingHoursPerDay())
        : this.recordingHoursPerDay();
    // Formula: (Bitrate in Mbps * 3600 seconds * hours) / (8 bits/byte * 1024 MB/GB)
    const gb = (bitrate * 3600 * hours) / (8 * 1024);
    return Number(gb.toFixed(2));
  });

  totalStorageRequiredGb = computed(() => {
    return Math.ceil(this.dailyStoragePerCameraGb() * this.cameraCount() * this.recordingDays());
  });

  totalStorageRequiredTb = computed(() => {
    return Number((this.totalStorageRequiredGb() / 1000).toFixed(2));
  });

  recommendedHddConfig = computed(() => {
    const reqTb = this.totalStorageRequiredTb();

    if (reqTb <= 1.8) {
      return {
        label: '1x 2TB Surveillance Drive (WD Purple / Seagate SkyHawk)',
        main: '1x 2TB Surveillance Drive',
        detail: 'WD Purple / Seagate SkyHawk (24/7 AllFrame)',
        rawTb: 2,
      };
    }
    if (reqTb <= 3.8) {
      return {
        label: '1x 4TB Surveillance Drive (WD Purple / Seagate SkyHawk)',
        main: '1x 4TB Surveillance Drive',
        detail: 'WD Purple / Seagate SkyHawk (24/7 AllFrame)',
        rawTb: 4,
      };
    }
    if (reqTb <= 5.8) {
      return {
        label: '1x 6TB Surveillance Drive (WD Purple / Seagate SkyHawk)',
        main: '1x 6TB Surveillance Drive',
        detail: 'WD Purple / Seagate SkyHawk (24/7 AllFrame)',
        rawTb: 6,
      };
    }
    if (reqTb <= 7.8) {
      return {
        label: '1x 8TB Surveillance Drive (WD Purple / Seagate SkyHawk)',
        main: '1x 8TB Surveillance Drive',
        detail: 'WD Purple / Seagate SkyHawk (24/7 AllFrame)',
        rawTb: 8,
      };
    }
    if (reqTb <= 11.5) {
      return {
        label: '2x 6TB or 1x 12TB Surveillance HDD Setup',
        main: '2x 6TB or 1x 12TB Surveillance HDD',
        detail: 'WD Purple / Seagate SkyHawk Multi-Bay Setup',
        rawTb: 12,
      };
    }
    if (reqTb <= 15.5) {
      return {
        label: '2x 8TB or 1x 16TB Enterprise Surveillance Setup',
        main: '2x 8TB or 1x 16TB Enterprise Storage',
        detail: 'WD Purple Pro / SkyHawk AI Enterprise Array',
        rawTb: 16,
      };
    }
    if (reqTb <= 23.5) {
      return {
        label: '3x 8TB or 2x 12TB Multi-SATA Surveillance Setup',
        main: '3x 8TB or 2x 12TB Storage Array',
        detail: 'Multi-SATA NVR Array with RAID-ready Tolerance',
        rawTb: 24,
      };
    }
    return {
      label: `4x 8TB or 2x 16TB High-Capacity Array (${Math.ceil(reqTb)} TB required)`,
      main: `4x 8TB or 2x 16TB High-Capacity Array`,
      detail: `Heavy Enterprise Setup (~${Math.ceil(reqTb)} TB Total Required)`,
      rawTb: Math.ceil(reqTb),
    };
  });

  recommendedNvr = computed(() => {
    const cams = this.cameraCount();
    if (cams <= 4) {
      return {
        model: '4-Channel 4K PoE NVR (1 SATA Bay)',
        main: '4-Channel 4K PoE NVR',
        detail: '1 SATA Bay up to 8TB • 40–80 Mbps Bandwidth',
        bandwidth: '40–80 Mbps',
      };
    }
    if (cams <= 8) {
      return {
        model: '8-Channel 4K H.265+ NVR (1–2 SATA Bays)',
        main: '8-Channel 4K H.265+ NVR',
        detail: '1–2 SATA Bays up to 16TB • 80–160 Mbps Bandwidth',
        bandwidth: '80–160 Mbps',
      };
    }
    if (cams <= 16) {
      return {
        model: '16-Channel 4K H.265+ NVR (2 SATA Bays up to 16TB)',
        main: '16-Channel 4K H.265+ NVR',
        detail: '2 SATA Bays up to 16TB • 160–256 Mbps Bandwidth',
        bandwidth: '160–256 Mbps',
      };
    }
    if (cams <= 32) {
      return {
        model: '32-Channel 4K Enterprise NVR (4 SATA Bays up to 32TB)',
        main: '32-Channel 4K Enterprise NVR',
        detail: '4 SATA Bays up to 32TB • 256–384 Mbps Bandwidth',
        bandwidth: '256–384 Mbps',
      };
    }
    return {
      model: '64-Channel Multi-Drive High-Capacity NVR (8 SATA Bays / RAID)',
      main: '64-Channel Multi-Drive NVR',
      detail: '8 SATA Bays / Hardware RAID • 384+ Mbps Bandwidth',
      bandwidth: '384+ Mbps',
    };
  });

  recommendedPoESwitch = computed(() => {
    const cams = this.cameraCount();
    if (cams <= 4) {
      return {
        label: '4-Port 10/100M PoE Switch + 2 Uplink Ports (65W)',
        main: '4-Port 10/100M PoE Switch',
        detail: '2 Uplink Ports • 65W Power Budget',
      };
    }
    if (cams <= 8) {
      return {
        label: '8-Port 10/100M PoE Switch + 2 Gigabit Uplink (120W)',
        main: '8-Port Fast Ethernet PoE Switch',
        detail: '2 Gigabit Uplink Ports • 120W Power Budget',
      };
    }
    if (cams <= 16) {
      return {
        label: '16-Port Gigabit PoE Switch + 2 SFP Optical Uplink (250W)',
        main: '16-Port Gigabit PoE Switch',
        detail: '2 SFP Optical Fiber Uplinks • 250W Budget',
      };
    }
    if (cams <= 24) {
      return {
        label: '24-Port Managed Gigabit PoE Switch + 4 SFP (370W)',
        main: '24-Port Managed Gigabit PoE Switch',
        detail: '4 SFP Optical Uplinks • 370W Budget',
      };
    }
    return {
      label: 'Multiple Cascaded 24-Port Gigabit Managed PoE Switches with Fiber Uplink',
      main: 'Dual 24-Port Managed Gigabit PoE Setup',
      detail: 'Cascaded Optical Uplinks • 500W+ Redundant Budget',
    };
  });

  retentionProgressPercent = computed(() => {
    return Math.min(100, Math.round((this.recordingDays() / 90) * 100));
  });

  incrementCameras() {
    this.cameraCount.update((c) => Math.min(64, c + 1));
  }

  decrementCameras() {
    this.cameraCount.update((c) => Math.max(1, c - 1));
  }

  setCameras(count: number) {
    this.cameraCount.set(Math.max(1, Math.min(64, count)));
  }

  setRetentionDays(days: number) {
    this.recordingDays.set(days);
  }

  formattedSummary = computed(() => {
    const resObj = this.resolutions.find((r) => r.id === this.resolution());
    const codecObj = this.codecs.find((c) => c.id === this.codec());

    return [
      `*Sunrise Communication — CCTV Storage & Hard Disk Sizing Report*`,
      `📹 *Camera Configuration:* ${this.cameraCount()} Cameras @ ${resObj?.name}`,
      `⚙️ *Video Codec:* ${codecObj?.name}`,
      `⏱️ *Recording Schedule:* ${this.recordingDays()} Days (${this.recordingMode() === 'continuous' ? '24/7 Continuous' : 'Motion Triggered ~12h/day'}) @ ${this.fps()} FPS`,
      `📊 *Calculated Storage Required:* ~${this.totalStorageRequiredTb()} TB (${this.totalStorageRequiredGb()} GB)`,
      `💽 *Recommended Hard Drive:* ${this.recommendedHddConfig().label}`,
      `🖥️ *Recommended Recorder:* ${this.recommendedNvr().model}`,
      `🔌 *Recommended Network Switch:* ${this.recommendedPoESwitch().label}`,
      `📈 *Network Bandwidth Load:* ~${this.totalBandwidthMbps()} Mbps`,
      ``,
      `📍 *Turnkey Supply, Installation & AMC by:*`,
      `Sunrise Communication — Room No. 10, Amar Bldg, Charai, Thane (West)`,
      `📞 *Call / WhatsApp:* +91 93238 48622 / +91 99875 55399`,
      `🌐 *Online Tool:* https://sunrisecommunication.in/tools/cctv-storage-calculator`,
    ].join('\n');
  });

  whatsappQuoteUrl = computed(() => {
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const msg = `Hi Sunrise Communication, I used your CCTV Storage Calculator tool and calculated my requirement:\n\n${this.formattedSummary()}\n\nPlease provide an itemized quote & schedule a technical site survey.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  });

  constructor() {
    effect(() => {
      let pageUrl = `${this.siteData.contact.website}/tools/cctv-storage-calculator`;
      if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
        pageUrl = this.document.location.href;
      }
      this.seoService.updateForCctvCalculator(pageUrl);
    });
  }

  ngOnInit(): void {
    // Initialized
  }

  setPreset(type: 'society' | 'office' | 'warehouse' | 'retail') {
    this.activePreset.set(type);
    if (type === 'society') {
      this.cameraCount.set(16);
      this.resolution.set('4mp');
      this.codec.set('h265plus');
      this.recordingDays.set(30);
      this.recordingMode.set('continuous');
      this.fps.set(15);
    } else if (type === 'office') {
      this.cameraCount.set(8);
      this.resolution.set('4mp');
      this.codec.set('h265plus');
      this.recordingDays.set(30);
      this.recordingMode.set('continuous');
      this.fps.set(15);
    } else if (type === 'warehouse') {
      this.cameraCount.set(24);
      this.resolution.set('4mp');
      this.codec.set('h265plus');
      this.recordingDays.set(45);
      this.recordingMode.set('continuous');
      this.fps.set(15);
    } else {
      this.cameraCount.set(4);
      this.resolution.set('1080p');
      this.codec.set('h265plus');
      this.recordingDays.set(15);
      this.recordingMode.set('continuous');
      this.fps.set(15);
    }
  }

  copyToClipboard() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.formattedSummary()).then(() => {
        this.copiedToast.set(true);
        setTimeout(() => this.copiedToast.set(false), 3500);
      });
    }
  }

  toggleFaq(index: number) {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }
}
