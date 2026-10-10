import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE_DATA } from '../constants/site-data';
import QRCode from 'qrcode';

export interface ClientProposalInfo {
  clientName?: string;
  clientOrganization?: string;
  clientDesignation?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientLocation?: string;
}

export interface CctvBoqProposalData extends ClientProposalInfo {
  cameraCount: number;
  resolutionName: string;
  resolutionBaseBitrate: number;
  codecName: string;
  recordingDays: number;
  recordingMode: string;
  fps: number;
  audioRecording: boolean;
  totalStorageTb: string | number;
  totalStorageGb: string | number;
  recommendedHdd: { main: string; detail: string };
  recommendedNvr: { main: string; detail: string };
  recommendedPoE: { main: string; detail: string };
  totalBandwidthMbps: string | number;
  effectiveBitrateMbps: string | number;
  dailyStorageGb: string | number;
  calculationUrl?: string;
}

export interface EstimatorBoqProposalData extends ClientProposalInfo {
  premiseTypeName: string;
  location: string;
  needCctv: boolean;
  cameraCount: number;
  storageDays: number;
  recommendedNvr: string;
  recommendedHdd: string;
  needIntercom: boolean;
  flatCount: number;
  wingCount: number;
  recommendedIntercom: string;
  needBiometrics: boolean;
  doorCount: number;
  employeeCount: number;
  recommendedBiometric: string;
  needNetworking: boolean;
  lanPoints: number;
  needAmc: boolean;
  proposalUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProposalGeneratorService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Generate an official, branded printable BOQ Proposal for CCTV Storage & Hardware Sizing.
   */
  async generateCctvBoqPdf(data: CctvBoqProposalData): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const refNo = `SC-CCTV-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const qrUrl = data.calculationUrl || `${SITE_DATA.contact.website}/tools/cctv-storage-calculator`;
    let qrSvg = '';
    try {
      qrSvg = await QRCode.toString(qrUrl, {
        type: 'svg',
        margin: 1,
        width: 86,
        color: { dark: '#010c3a', light: '#ffffff' }
      });
    } catch {
      qrSvg = '';
    }

    const clientOrg = data.clientOrganization?.trim() || '';
    const clientName = data.clientName?.trim() || '';
    const clientLoc = data.clientLocation?.trim() || 'Thane / Mumbai MMR';

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official CCTV Storage & Hardware Sizing BOQ - ${refNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 24px;
      font-size: 13px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 36px 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #010c3a;
      padding: 12px 20px;
      border-radius: 8px;
      color: #ffffff;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-size: 13px;
    }
    .btn-primary { background: #df0303; color: #ffffff; }
    .btn-primary:hover { background: #b80202; }
    .btn-secondary { background: rgba(255,255,255,0.15); color: #ffffff; margin-left: 8px; }
    .letterhead {
      border-bottom: 2px solid #010c3a;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 23px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .brand-title span { color: #df0303; }
    .brand-tagline {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .company-meta {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }
    .doc-banner {
      background: #f1f5f9;
      border-left: 4px solid #df0303;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-radius: 0 6px 6px 0;
    }
    .doc-heading {
      font-size: 14.5px;
      font-weight: 700;
      color: #010c3a;
      text-transform: uppercase;
    }
    .doc-ref {
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
      text-align: right;
    }

    /* Client Addressing Block */
    .client-meta-banner {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .client-meta-col { width: 48%; }
    .meta-badge-label {
      font-size: 9.5px;
      font-weight: 700;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
      display: block;
    }
    .client-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #010c3a;
      line-height: 1.3;
    }
    .client-sub {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .client-person {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
    }
    .client-contact-row {
      font-size: 11.5px;
      color: #475569;
      margin-top: 2px;
    }

    .hero-stat-card {
      background: linear-gradient(135deg, #010c3a 0%, #081a5c 100%);
      color: #ffffff;
      padding: 14px 20px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      break-inside: avoid;
    }
    .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85; }
    .stat-number { font-size: 28px; font-weight: 800; color: #ffffff; line-height: 1; }
    .stat-unit { font-size: 15px; color: #fca5a5; font-weight: 800; margin-left: 4px; }
    .stat-sub { font-size: 11px; opacity: 0.85; margin-top: 2px; }

    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #010c3a;
      margin: 16px 0 8px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    th, td {
      padding: 7px 10px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12px;
    }
    th {
      background: #f8fafc;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10.5px;
      letter-spacing: 0.4px;
    }
    .highlight-row { background: #fff5f5; font-weight: 600; }
    .val-highlight { color: #df0303; font-weight: 700; }

    .engineering-notes {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 11px;
      color: #475569;
      margin-bottom: 18px;
      break-inside: avoid;
    }
    .engineering-notes ul { padding-left: 16px; margin-top: 4px; }
    .engineering-notes li { margin-bottom: 3px; }

    .qr-verification-strip {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      break-inside: avoid;
    }
    .qr-text-side { width: 80%; }
    .qr-code-side { width: 18%; display: flex; justify-content: flex-end; align-items: center; }

    .signoff-section {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px dashed #cbd5e1;
      break-inside: avoid;
    }
    .sign-box {
      width: 45%;
      border-top: 1px solid #94a3b8;
      padding-top: 6px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong { color: #010c3a; display: block; margin-bottom: 2px; }
    .disclaimer {
      font-size: 9.5px;
      color: #94a3b8;
      text-align: center;
      margin-top: 16px;
      line-height: 1.35;
      break-inside: avoid;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .no-print-toolbar { display: none !important; }
      .print-container { box-shadow: none; border: none; padding: 0; max-width: 100%; }
      .hero-stat-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      table, .hero-stat-card, .engineering-notes, .signoff-section, .qr-verification-strip {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>

  <div class="no-print-toolbar">
    <div><strong>Sunrise Communication — Engineering Document Viewer</strong></div>
    <div>
      <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="btn btn-secondary" onclick="window.close()">Close</button>
    </div>
  </div>

  <div class="print-container">
    <div class="letterhead">
      <div>
        <div class="brand-title">SUNRISE <span>COMMUNICATION</span></div>
        <div class="brand-tagline">Security Surveillance & Telecommunication System Engineers</div>
      </div>
      <div class="company-meta">
        <strong>${SITE_DATA.legalName}</strong><br>
        ${SITE_DATA.contact.address}<br>
        Direct: ${SITE_DATA.contact.primaryPhone} / ${SITE_DATA.contact.secondaryPhone}<br>
        Email: ${SITE_DATA.contact.email} • Web: www.sunrisecommunication.in
      </div>
    </div>

    <div class="doc-banner">
      <div>
        <div class="doc-heading">Official Technical Sizing & Bill of Quantities (BOQ)</div>
        <div style="font-size: 11px; color: #475569;">CCTV Surveillance Storage, Hardware Architecture & Bandwidth Specification</div>
      </div>
      <div class="doc-ref">
        Ref: <strong>${refNo}</strong><br>
        Date: <strong>${currentDate}</strong>
      </div>
    </div>

    <!-- Executive Client Addressing Block -->
    <div class="client-meta-banner">
      <div class="client-meta-col">
        <span class="meta-badge-label">PREPARED FOR:</span>
        <div class="client-title">${clientOrg || 'The Managing Committee / Purchase Dept.'}</div>
        <div class="client-sub">${clientLoc}</div>
      </div>
      <div class="client-meta-col text-end" style="text-align: right;">
        <span class="meta-badge-label">ATTENTION / CONTACT:</span>
        <div class="client-person">${clientName || 'Hon. Secretary / Facility Manager'} ${data.clientDesignation ? `(${data.clientDesignation})` : ''}</div>
        ${data.clientPhone ? `<div class="client-contact-row">Direct Mobile: <strong>${data.clientPhone}</strong></div>` : ''}
        ${data.clientEmail ? `<div class="client-contact-row">${data.clientEmail}</div>` : ''}
      </div>
    </div>

    <div class="hero-stat-card">
      <div>
        <div class="stat-label">Calculated Surveillance Storage Capacity</div>
        <div class="stat-number">${data.totalStorageTb}<span class="stat-unit">TB</span></div>
        <div class="stat-sub">~${data.totalStorageGb} GB total capacity across ${data.cameraCount} camera stream(s)</div>
      </div>
      <div style="text-align: right;">
        <div class="stat-label">Retention Period</div>
        <div style="font-size: 18px; font-weight: 700; color: #ffffff;">${data.recordingDays} Days History</div>
        <div class="stat-sub">${data.codecName} Smart Compression</div>
      </div>
    </div>

    <div class="section-title">1. System Parameters & Configuration Profile</div>
    <table>
      <thead>
        <tr>
          <th>Configuration Parameter</th>
          <th>Configured Value</th>
          <th>Engineering Impact & Compliance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Camera Count</strong></td>
          <td><strong>${data.cameraCount} Camera(s)</strong></td>
          <td>Surveillance coverage footprint & stream count</td>
        </tr>
        <tr>
          <td><strong>Video Resolution</strong></td>
          <td><strong>${data.resolutionName}</strong></td>
          <td>Base stream bitrate: ~${data.resolutionBaseBitrate} Mbps per camera</td>
        </tr>
        <tr>
          <td><strong>Compression Standard</strong></td>
          <td><strong>${data.codecName}</strong></td>
          <td>Smart intra-frame encoding (storage & bandwidth optimized)</td>
        </tr>
        <tr>
          <td><strong>Retention History</strong></td>
          <td><strong>${data.recordingDays} Days</strong></td>
          <td>Complies with local Police Commissioner security directives</td>
        </tr>
        <tr>
          <td><strong>Recording Schedule</strong></td>
          <td><strong>${data.recordingMode === 'continuous' ? '24/7 Continuous Recording' : 'Motion Triggered (~12h/day)'}</strong></td>
          <td>Continuous evidentiary archive standard</td>
        </tr>
        <tr>
          <td><strong>Frame Rate & Audio</strong></td>
          <td><strong>${data.fps} FPS • ${data.audioRecording ? 'Audio Enabled' : 'Video Only'}</strong></td>
          <td>Fluid evidentiary playback standard</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">2. Recommended Hardware Bill of Quantities (BOQ)</div>
    <table>
      <thead>
        <tr>
          <th>Hardware Category</th>
          <th>Recommended Model & Specification</th>
          <th>Engineering Standard & Compliance</th>
        </tr>
      </thead>
      <tbody>
        <tr class="highlight-row">
          <td><strong>Surveillance Cameras (IP)</strong></td>
          <td class="val-highlight">${data.cameraCount}x ${data.resolutionName} IP Surveillance Cameras</td>
          <td>Smart Dual-Light / ColorVu Night Vision • IP67 Metal Housing • PoE (802.3af)</td>
        </tr>
        <tr>
          <td><strong>Surveillance Storage (HDD)</strong></td>
          <td><strong>${data.recommendedHdd.main}</strong></td>
          <td>${data.recommendedHdd.detail}</td>
        </tr>
        <tr>
          <td><strong>Network Video Recorder (NVR)</strong></td>
          <td><strong>${data.recommendedNvr.main}</strong></td>
          <td>${data.recommendedNvr.detail}</td>
        </tr>
        <tr>
          <td><strong>PoE Network Switch</strong></td>
          <td><strong>${data.recommendedPoE.main}</strong></td>
          <td>${data.recommendedPoE.detail}</td>
        </tr>
        <tr>
          <td><strong>Transmission Infrastructure</strong></td>
          <td><strong>100% Solid Bare Copper 23AWG Cat6 UTP</strong></td>
          <td>Heavy-duty rigid PVC conduit casing with saddle clamping</td>
        </tr>
        <tr>
          <td><strong>Central Rack & Power Setup</strong></td>
          <td><strong>Wall-Mount Server Rack + Multi-Point PDU</strong></td>
          <td>Surge-protected industrial power supply & patch panel dressing</td>
        </tr>
        <tr>
          <td><strong>Network Bandwidth Load</strong></td>
          <td><strong>~${data.totalBandwidthMbps} Mbps</strong> (~${data.effectiveBitrateMbps} Mbps / camera)</td>
          <td>Cat6 Gigabit LAN backbone compliant</td>
        </tr>
        <tr>
          <td><strong>Daily Write Load</strong></td>
          <td><strong>~${data.dailyStorageGb} GB / camera / day</strong></td>
          <td>24/7 Continuous write endurance rating</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">3. Engineering Standards & Turnkey Deliverables</div>
    <div class="engineering-notes">
      <strong>Scope of Installation & Quality Compliance by Sunrise Communication:</strong>
      <ul>
        <li><strong>Transmission Infrastructure:</strong> 100% Solid Bare Copper 23AWG Cat6 UTP cabling inside heavy-duty rigid PVC conduits.</li>
        <li><strong>Rack & Power Management:</strong> Server rack termination, patch panel labeling, and surge-protected industrial power supplies.</li>
        <li><strong>Remote Viewing & Mobile Setup:</strong> P2P Cloud mobile app synchronization with encrypted passwords and committee permissions.</li>
        <li><strong>Testing & Acceptance:</strong> Individual camera lens angle optimization, dark-lighting ColorVu calibration, and formal committee handover documentation.</li>
        <li><strong>AMC & Priority Support:</strong> 1-Year comprehensive warranty with 24-hour priority breakdown dispatch across Thane & Mumbai MMR.</li>
      </ul>
    </div>

    <!-- QR Code & Digital Verification Strip -->
    <div class="qr-verification-strip">
      <div class="qr-text-side">
        <strong style="color: #010c3a; font-size: 11.5px; display: block; margin-bottom: 2px;">
          🔗 Digital Verification & Live Recalculation
        </strong>
        <span style="font-size: 10.5px; color: #64748b; line-height: 1.35; display: block;">
          Scan the QR code with any smartphone camera to inspect, adjust, or verify this technical sizing specification live on the Sunrise Communication portal:
        </span>
        <a href="${qrUrl}" target="_blank" style="color: #0284c7; font-size: 10px; text-decoration: underline; word-break: break-all; margin-top: 3px; display: inline-block;">
          ${qrUrl}
        </a>
      </div>
      <div class="qr-code-side">
        ${qrSvg}
      </div>
    </div>

    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Authorized Signatory & Stamp
      </div>
      <div class="sign-box">
        <strong>${clientOrg ? clientOrg.toUpperCase() : 'CLIENT / SOCIETY REPRESENTATIVE'}</strong>
        ${clientName ? `${clientName} (${data.clientDesignation || 'Authorized Representative'})` : 'Chairman / Secretary / Facility Manager'}<br>
        Accepted & Approved By (Sign & Seal)
      </div>
    </div>

    <div class="disclaimer">
      This document is an engineering sizing specification generated by Sunrise Communication's Technical Sizing Engine.<br>
      Commercial taxation (GST), specific brand lines (CP Plus, Hikvision, Dahua), and exact cable meterage are finalized upon physical on-site technical inspection.
    </div>
  </div>

  <script>
    function triggerPrint() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 350);
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      triggerPrint();
    } else {
      window.addEventListener('DOMContentLoaded', triggerPrint);
      window.addEventListener('load', triggerPrint);
    }
  </script>
</body>
</html>
    `;

    this.printHtmlDocument(htmlContent);
  }

  /**
   * Generate an official, branded printable BOQ Proposal for Requirement Estimator (CCTV, Intercom, Biometrics, Cabling, AMC).
   */
  async generateEstimatorBoqPdf(data: EstimatorBoqProposalData): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const refNo = `SC-EST-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const qrUrl = data.proposalUrl || `${SITE_DATA.contact.website}/`;
    let qrSvg = '';
    try {
      qrSvg = await QRCode.toString(qrUrl, {
        type: 'svg',
        margin: 1,
        width: 86,
        color: { dark: '#010c3a', light: '#ffffff' }
      });
    } catch {
      qrSvg = '';
    }

    const clientOrg = data.clientOrganization?.trim() || '';
    const clientName = data.clientName?.trim() || '';
    const clientLoc = data.clientLocation?.trim() || data.location || 'Thane / Mumbai MMR';

    const servicesList: string[] = [];
    if (data.needCctv) servicesList.push(`CCTV Surveillance (${data.cameraCount} Cams)`);
    if (data.needIntercom) servicesList.push(`EPABX Intercom (${data.flatCount} Flats, ${data.wingCount} Wing(s))`);
    if (data.needBiometrics) servicesList.push(`Biometric Access Control (${data.doorCount} Doors)`);
    if (data.needNetworking) servicesList.push(`Structured Cabling (${data.lanPoints} I/O Ports)`);
    if (data.needAmc) servicesList.push(`Annual Maintenance Contract (AMC)`);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Technical Requirement & System Architecture Proposal - ${refNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 24px;
      font-size: 13px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 36px 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #010c3a;
      padding: 12px 20px;
      border-radius: 8px;
      color: #ffffff;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-size: 13px;
    }
    .btn-primary { background: #df0303; color: #ffffff; }
    .btn-primary:hover { background: #b80202; }
    .btn-secondary { background: rgba(255,255,255,0.15); color: #ffffff; margin-left: 8px; }
    .letterhead {
      border-bottom: 2px solid #010c3a;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 23px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .brand-title span { color: #df0303; }
    .brand-tagline {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .company-meta {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }
    .doc-banner {
      background: #f1f5f9;
      border-left: 4px solid #df0303;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-radius: 0 6px 6px 0;
    }
    .doc-heading {
      font-size: 14.5px;
      font-weight: 700;
      color: #010c3a;
      text-transform: uppercase;
    }
    .doc-ref {
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
      text-align: right;
    }

    /* Client Addressing Block */
    .client-meta-banner {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .client-meta-col { width: 48%; }
    .meta-badge-label {
      font-size: 9.5px;
      font-weight: 700;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
      display: block;
    }
    .client-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #010c3a;
      line-height: 1.3;
    }
    .client-sub {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .client-person {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
    }
    .client-contact-row {
      font-size: 11.5px;
      color: #475569;
      margin-top: 2px;
    }

    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #010c3a;
      margin: 16px 0 8px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    th, td {
      padding: 7px 10px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12px;
    }
    th {
      background: #f8fafc;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10.5px;
      letter-spacing: 0.4px;
    }
    .val-highlight { color: #df0303; font-weight: 700; }
    .service-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      background: #e2e8f0;
      color: #0f172a;
      font-size: 11px;
      font-weight: 600;
      margin: 2px 4px 2px 0;
    }
    .engineering-notes {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 11px;
      color: #475569;
      margin-bottom: 18px;
      break-inside: avoid;
    }
    .engineering-notes ul { padding-left: 16px; margin-top: 4px; }
    .engineering-notes li { margin-bottom: 3px; }

    .qr-verification-strip {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      break-inside: avoid;
    }
    .qr-text-side { width: 80%; }
    .qr-code-side { width: 18%; display: flex; justify-content: flex-end; align-items: center; }

    .signoff-section {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px dashed #cbd5e1;
      break-inside: avoid;
    }
    .sign-box {
      width: 45%;
      border-top: 1px solid #94a3b8;
      padding-top: 6px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong { color: #010c3a; display: block; margin-bottom: 2px; }
    .disclaimer {
      font-size: 9.5px;
      color: #94a3b8;
      text-align: center;
      margin-top: 16px;
      line-height: 1.35;
      break-inside: avoid;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .no-print-toolbar { display: none !important; }
      .print-container { box-shadow: none; border: none; padding: 0; max-width: 100%; }
      table, .engineering-notes, .signoff-section, .qr-verification-strip {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>

  <div class="no-print-toolbar">
    <div><strong>Sunrise Communication — Engineering Document Viewer</strong></div>
    <div>
      <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="btn btn-secondary" onclick="window.close()">Close</button>
    </div>
  </div>

  <div class="print-container">
    <div class="letterhead">
      <div>
        <div class="brand-title">SUNRISE <span>COMMUNICATION</span></div>
        <div class="brand-tagline">Security Surveillance & Telecommunication System Engineers</div>
      </div>
      <div class="company-meta">
        <strong>${SITE_DATA.legalName}</strong><br>
        ${SITE_DATA.contact.address}<br>
        Direct: ${SITE_DATA.contact.primaryPhone} / ${SITE_DATA.contact.secondaryPhone}<br>
        Email: ${SITE_DATA.contact.email} • Web: www.sunrisecommunication.in
      </div>
    </div>

    <div class="doc-banner">
      <div>
        <div class="doc-heading">Security & Telecom System Architecture Proposal</div>
        <div style="font-size: 11px; color: #475569;">Target Premise: <strong>${data.premiseTypeName} (${clientLoc})</strong></div>
      </div>
      <div class="doc-ref">
        Ref: <strong>${refNo}</strong><br>
        Date: <strong>${currentDate}</strong>
      </div>
    </div>

    <!-- Executive Client Addressing Block -->
    <div class="client-meta-banner">
      <div class="client-meta-col">
        <span class="meta-badge-label">PREPARED FOR:</span>
        <div class="client-title">${clientOrg || 'The Managing Committee / Purchase Dept.'}</div>
        <div class="client-sub">${clientLoc}</div>
      </div>
      <div class="client-meta-col text-end" style="text-align: right;">
        <span class="meta-badge-label">ATTENTION / CONTACT:</span>
        <div class="client-person">${clientName || 'Hon. Secretary / Facility Manager'} ${data.clientDesignation ? `(${data.clientDesignation})` : ''}</div>
        ${data.clientPhone ? `<div class="client-contact-row">Direct Mobile: <strong>${data.clientPhone}</strong></div>` : ''}
        ${data.clientEmail ? `<div class="client-contact-row">${data.clientEmail}</div>` : ''}
      </div>
    </div>

    <div class="section-title">1. Premise & Scope of Integration</div>
    <table>
      <tbody>
        <tr>
          <td style="width: 30%;"><strong>Property / Premise Type:</strong></td>
          <td><strong>${data.premiseTypeName}</strong></td>
        </tr>
        <tr>
          <td><strong>Target Location:</strong></td>
          <td>${clientLoc}</td>
        </tr>
        <tr>
          <td><strong>Required Systems:</strong></td>
          <td>
            ${servicesList.map(s => `<span class="service-badge">${s}</span>`).join('')}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">2. Recommended Hardware Sizing & Engineering Architecture</div>
    <table>
      <thead>
        <tr>
          <th>System Track</th>
          <th>Sized Scope & Hardware Models</th>
          <th>Engineering Architecture Specs</th>
        </tr>
      </thead>
      <tbody>
        ${data.needCctv ? `
        <tr>
          <td><strong>CCTV Surveillance</strong></td>
          <td><strong>${data.cameraCount}x IP Cameras + ${data.recommendedNvr}</strong></td>
          <td>Storage: ${data.recommendedHdd} (${data.storageDays} Days Retention) • PoE Switch Backbone</td>
        </tr>
        ` : ''}

        ${data.needIntercom ? `
        <tr>
          <td><strong>Society Intercom</strong></td>
          <td><strong>${data.recommendedIntercom}</strong></td>
          <td>Capacity: ${data.flatCount} Extensions across ${data.wingCount} Wing(s) • Gatekeeper Console & Caller ID</td>
        </tr>
        ` : ''}

        ${data.needBiometrics ? `
        <tr>
          <td><strong>Biometrics & Access</strong></td>
          <td><strong>${data.recommendedBiometric}</strong></td>
          <td>${data.doorCount}x 600lbs Fail-Safe EM Locks, U-Brackets, Exit Switches & Attendance Software</td>
        </tr>
        ` : ''}

        ${data.needNetworking ? `
        <tr>
          <td><strong>Structured Cabling</strong></td>
          <td><strong>${data.lanPoints} Certified Cat6 I/O Points</strong></td>
          <td>Patch Panels, Cable Managers, Server Rack Dressing & Fluke Testing</td>
        </tr>
        ` : ''}

        ${data.needAmc ? `
        <tr>
          <td><strong>Maintenance Contract</strong></td>
          <td><strong>Annual Maintenance Contract (AMC)</strong></td>
          <td>4 Preventive quarterly visits, camera cleaning, voltage tests & 24h breakdown technician support</td>
        </tr>
        ` : ''}
      </tbody>
    </table>

    <div class="section-title">3. Turnkey Execution & Handover Assurance</div>
    <div class="engineering-notes">
      <strong>Engineering Standards Maintained by Sunrise Communication:</strong>
      <ul>
        <li><strong>Standardized Cabling:</strong> ISI-grade conduit casing-capping, multi-pair armoured telephone cables & high-performance Cat6 UTP.</li>
        <li><strong>OEM Authorized Equipment:</strong> Hardware sourced directly from authorized OEM distributors (CP Plus, Hikvision, Dahua, Matrix, Essl).</li>
        <li><strong>Managing Committee Handover:</strong> Comprehensive live demonstration, port mapping diagram, and official committee sign-off certificate.</li>
        <li><strong>25+ Years Proven Track Record:</strong> Trusted across housing societies and commercial hubs throughout Thane, Mumbai & Navi Mumbai.</li>
      </ul>
    </div>

    <!-- QR Code & Digital Verification Strip -->
    <div class="qr-verification-strip">
      <div class="qr-text-side">
        <strong style="color: #010c3a; font-size: 11.5px; display: block; margin-bottom: 2px;">
          🔗 Digital Verification & Live Blueprint
        </strong>
        <span style="font-size: 10.5px; color: #64748b; line-height: 1.35; display: block;">
          Scan the QR code with any smartphone camera to inspect, adjust, or verify this technical specification live on the Sunrise Communication portal:
        </span>
        <a href="${qrUrl}" target="_blank" style="color: #0284c7; font-size: 10px; text-decoration: underline; word-break: break-all; margin-top: 3px; display: inline-block;">
          ${qrUrl}
        </a>
      </div>
      <div class="qr-code-side">
        ${qrSvg}
      </div>
    </div>

    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Authorized Signatory & Stamp
      </div>
      <div class="sign-box">
        <strong>${clientOrg ? clientOrg.toUpperCase() : 'CLIENT / COMMITTEE REPRESENTATIVE'}</strong>
        ${clientName ? `${clientName} (${data.clientDesignation || 'Authorized Representative'})` : 'Chairman / Secretary / Facility Manager'}<br>
        Accepted & Approved By (Sign & Seal)
      </div>
    </div>

    <div class="disclaimer">
      This document is an architectural sizing proposal generated by Sunrise Communication's Sizing Engine.<br>
      Itemized pricing, taxation (GST), and final cable meterage are confirmed following on-site technical inspection.
    </div>
  </div>

  <script>
    function triggerPrint() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 350);
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      triggerPrint();
    } else {
      window.addEventListener('DOMContentLoaded', triggerPrint);
      window.addEventListener('load', triggerPrint);
    }
  </script>
</body>
</html>
    `;

    this.printHtmlDocument(htmlContent);
  }

  private printHtmlDocument(htmlContent: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const printWin = window.open('', '_blank');
      if (printWin && !printWin.closed) {
        printWin.document.open();
        printWin.document.write(htmlContent);
        printWin.document.close();
        return;
      }
    } catch {
      // Continue to fallback if window.open fails
    }

    // Robust fallback: Hidden iframe technique for environments with popup blockers enabled
    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        iframe.contentWindow?.focus();
        const cleanupIframe = () => {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1000);
        };

        iframe.contentWindow?.addEventListener('afterprint', cleanupIframe, { once: true });
        setTimeout(() => {
          iframe.contentWindow?.print();
          // Fallback cleanup after generous delay in case afterprint does not fire
          setTimeout(cleanupIframe, 60000);
        }, 500);
      }
    } catch (e) {
      console.error('Failed to trigger proposal print/pdf dialog:', e);
    }
  }
}
