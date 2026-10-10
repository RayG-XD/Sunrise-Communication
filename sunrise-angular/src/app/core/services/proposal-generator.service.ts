import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE_DATA } from '../constants/site-data';

export interface CctvBoqProposalData {
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

export interface EstimatorBoqProposalData {
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
  generateCctvBoqPdf(data: CctvBoqProposalData): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const refNo = `SC-CCTV-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official CCTV Storage & Hardware Sizing BOQ - ${refNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 24px;
      font-size: 13.5px;
      line-height: 1.5;
    }
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 20px auto;
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
      padding-bottom: 18px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .brand-title span { color: #df0303; }
    .brand-tagline {
      font-size: 11.5px;
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
      line-height: 1.45;
    }
    .doc-banner {
      background: #f1f5f9;
      border-left: 4px solid #df0303;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      border-radius: 0 6px 6px 0;
    }
    .doc-heading {
      font-size: 15px;
      font-weight: 700;
      color: #010c3a;
      text-transform: uppercase;
    }
    .doc-ref {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #010c3a;
      margin: 20px 0 10px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 9px 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12.5px;
    }
    th {
      background: #f8fafc;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.4px;
    }
    .highlight-row { background: #fff5f5; font-weight: 600; }
    .val-highlight { color: #df0303; font-weight: 700; }
    .hero-stat-card {
      background: linear-gradient(135deg, #010c3a 0%, #081a5c 100%);
      color: #ffffff;
      padding: 18px 24px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85; }
    .stat-number { font-size: 32px; font-weight: 800; color: #ffffff; line-height: 1; }
    .stat-unit { font-size: 16px; color: #fca5a5; font-weight: 800; margin-left: 4px; }
    .stat-sub { font-size: 12px; opacity: 0.85; margin-top: 4px; }
    .engineering-notes {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 18px;
      font-size: 11.5px;
      color: #475569;
      margin-bottom: 24px;
    }
    .engineering-notes ul { padding-left: 18px; margin-top: 6px; }
    .engineering-notes li { margin-bottom: 4px; }
    .signoff-section {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
    }
    .sign-box {
      width: 45%;
      border-top: 1px solid #94a3b8;
      padding-top: 8px;
      font-size: 11.5px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong { color: #010c3a; display: block; margin-bottom: 2px; }
    .disclaimer {
      font-size: 10px;
      color: #94a3b8;
      text-align: center;
      margin-top: 24px;
      line-height: 1.4;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .no-print-toolbar { display: none !important; }
      .print-container { box-shadow: none; border: none; padding: 10px 0; max-width: 100%; }
      .hero-stat-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
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
        <div style="font-size: 11.5px; color: #475569;">CCTV Surveillance Storage, Hardware Architecture & Bandwidth Specification</div>
      </div>
      <div class="doc-ref">
        Ref: <strong>${refNo}</strong><br>
        Date: <strong>${currentDate}</strong>
      </div>
    </div>

    <div class="hero-stat-card">
      <div>
        <div class="stat-label">Calculated Storage Capacity Required</div>
        <div class="stat-number">${data.totalStorageTb}<span class="stat-unit">TB</span></div>
        <div class="stat-sub">~${data.totalStorageGb} GB total capacity across ${data.cameraCount} camera(s)</div>
      </div>
      <div style="text-align: right;">
        <div class="stat-label">Retention Period</div>
        <div style="font-size: 20px; font-weight: 700; color: #ffffff;">${data.recordingDays} Days</div>
        <div class="stat-sub">${data.codecName} Compression Standard</div>
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
          <td>${data.cameraCount} Camera(s)</td>
          <td>Surveillance coverage footprint</td>
        </tr>
        <tr>
          <td><strong>Video Resolution</strong></td>
          <td>${data.resolutionName}</td>
          <td>Base bitrate: ~${data.resolutionBaseBitrate} Mbps per camera stream</td>
        </tr>
        <tr>
          <td><strong>Compression Standard</strong></td>
          <td>${data.codecName}</td>
          <td>Smart AI intra-frame encoding (bandwidth & storage optimized)</td>
        </tr>
        <tr>
          <td><strong>Retention History</strong></td>
          <td>${data.recordingDays} Days</td>
          <td>Complies with local police commissioner security directives</td>
        </tr>
        <tr>
          <td><strong>Recording Schedule</strong></td>
          <td>${data.recordingMode === 'continuous' ? '24/7 Continuous Recording' : 'Motion Triggered (~12h/day)'}</td>
          <td>Continuous evidentiary coverage standard</td>
        </tr>
        <tr>
          <td><strong>Frame Rate & Audio</strong></td>
          <td>${data.fps} FPS • ${data.audioRecording ? 'Audio Enabled' : 'Video Only'}</td>
          <td>Fluid visual evidentiary playback</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">2. Recommended Hardware Sizing & Specifications</div>
    <table>
      <thead>
        <tr>
          <th>Hardware Category</th>
          <th>Recommended Model & Specification</th>
          <th>Grade / Architecture Standard</th>
        </tr>
      </thead>
      <tbody>
        <tr class="highlight-row">
          <td><strong>Surveillance Hard Drive (HDD)</strong></td>
          <td class="val-highlight">${data.recommendedHdd.main}</td>
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
          <td><strong>Network Bandwidth Load</strong></td>
          <td><strong>~${data.totalBandwidthMbps} Mbps</strong> (~${data.effectiveBitrateMbps} Mbps / camera)</td>
          <td>Cat6 UTP Gigabit LAN backbone compliant</td>
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
        <li><strong>AMC & Emergency Support:</strong> 1-Year comprehensive warranty with 24-hour priority breakdown dispatch across Thane & Mumbai MMR.</li>
      </ul>
    </div>

    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Authorized Signatory
      </div>
      <div class="sign-box">
        <strong>CLIENT / SOCIETY REPRESENTATIVE</strong>
        Chairman / Secretary / Facility Manager<br>
        Accepted & Approved By
      </div>
    </div>

    ${data.calculationUrl ? `
    <div style="margin-top: 14px; padding: 9px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 8pt; color: #475569;">
      <strong>🔗 Digital Interactive Verification:</strong> Re-verify or adjust this sizing live at:
      <a href="${data.calculationUrl}" target="_blank" style="color: #0284c7; text-decoration: underline; word-break: break-all;">${data.calculationUrl}</a>
    </div>
    ` : ''}

    <div class="disclaimer">
      This document is a technical sizing specification generated by Sunrise Communication's Engineering Sizing Engine.<br>
      Prices, commercial taxes, and cable meterage are determined upon physical site survey and formal Quotation submission.
    </div>
  </div>

  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 500);
    });
  </script>
</body>
</html>
    `;

    this.printHtmlDocument(htmlContent);
  }

  /**
   * Generate an official, branded printable BOQ Proposal for Requirement Estimator (CCTV, Intercom, Biometrics, Cabling, AMC).
   */
  generateEstimatorBoqPdf(data: EstimatorBoqProposalData): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const refNo = `SC-EST-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

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
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 24px;
      font-size: 13.5px;
      line-height: 1.5;
    }
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 20px auto;
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
      padding-bottom: 18px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .brand-title span { color: #df0303; }
    .brand-tagline {
      font-size: 11.5px;
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
      line-height: 1.45;
    }
    .doc-banner {
      background: #f1f5f9;
      border-left: 4px solid #df0303;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      border-radius: 0 6px 6px 0;
    }
    .doc-heading {
      font-size: 15px;
      font-weight: 700;
      color: #010c3a;
      text-transform: uppercase;
    }
    .doc-ref {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #010c3a;
      margin: 20px 0 10px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 9px 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12.5px;
    }
    th {
      background: #f8fafc;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
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
      padding: 14px 18px;
      font-size: 11.5px;
      color: #475569;
      margin-bottom: 24px;
    }
    .engineering-notes ul { padding-left: 18px; margin-top: 6px; }
    .engineering-notes li { margin-bottom: 4px; }
    .signoff-section {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
    }
    .sign-box {
      width: 45%;
      border-top: 1px solid #94a3b8;
      padding-top: 8px;
      font-size: 11.5px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong { color: #010c3a; display: block; margin-bottom: 2px; }
    .disclaimer {
      font-size: 10px;
      color: #94a3b8;
      text-align: center;
      margin-top: 24px;
      line-height: 1.4;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .no-print-toolbar { display: none !important; }
      .print-container { box-shadow: none; border: none; padding: 10px 0; max-width: 100%; }
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
        <div style="font-size: 11.5px; color: #475569;">Target Premise: <strong>${data.premiseTypeName} (${data.location})</strong></div>
      </div>
      <div class="doc-ref">
        Ref: <strong>${refNo}</strong><br>
        Date: <strong>${currentDate}</strong>
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
          <td>${data.location}</td>
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

    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Authorized Signatory
      </div>
      <div class="sign-box">
        <strong>CLIENT / COMMITTEE REPRESENTATIVE</strong>
        Chairman / Secretary / Facility Manager<br>
        Accepted & Approved By
      </div>
    </div>

    ${data.proposalUrl ? `
    <div style="margin-top: 14px; padding: 9px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 8pt; color: #475569;">
      <strong>🔗 Digital Interactive Verification:</strong> Re-verify or adjust this sizing blueprint live at:
      <a href="${data.proposalUrl}" target="_blank" style="color: #0284c7; text-decoration: underline; word-break: break-all;">${data.proposalUrl}</a>
    </div>
    ` : ''}

    <div class="disclaimer">
      This document is a technical architectural sizing proposal generated by Sunrise Communication's Sizing Engine.<br>
      Itemized pricing, taxation, and final cable meterage are confirmed following the on-site technical inspection.
    </div>
  </div>

  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 500);
    });
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
        setTimeout(() => {
          iframe.contentWindow?.print();
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 2000);
        }, 500);
      }
    } catch (e) {
      console.error('Failed to trigger proposal print/pdf dialog:', e);
    }
  }
}
