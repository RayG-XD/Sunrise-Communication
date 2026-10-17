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
  <title>Official CCTV Storage & Hardware Sizing BOQ - ${refNo} | Sunrise Communication</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page {
      size: A4 portrait;
      margin: 8mm 10mm 10mm 10mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #eef2f6;
      padding: 24px 16px 40px 16px;
      font-size: 12.5px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    /* Screen View Toolbar */
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #090e24;
      padding: 12px 20px;
      border-radius: 10px;
      color: #ffffff;
      box-shadow: 0 4px 16px rgba(9, 14, 36, 0.25);
      position: sticky;
      top: 12px;
      z-index: 1000;
    }
    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toolbar-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(223, 3, 3, 0.2);
      border: 1px solid rgba(223, 3, 3, 0.4);
      color: #fca5a5;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .toolbar-title {
      font-size: 13px;
      font-weight: 600;
      color: #e2e8f0;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toolbar-hint {
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 6px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-size: 12.5px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #df0303 0%, #b80202 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(223, 3, 3, 0.35);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #f01414 0%, #c90303 100%);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Print Paper Container */
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 34px 40px;
      border-radius: 12px;
      box-shadow: 0 12px 35px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8);
      position: relative;
    }

    /* Header Letterhead */
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 16px;
      margin-bottom: 14px;
    }
    .brand-left {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .brand-emblem {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #010c3a 0%, #0a1b52 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(1, 12, 58, 0.2);
      flex-shrink: 0;
    }
    .brand-title {
      font-size: 23px;
      font-weight: 900;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .brand-title span {
      color: #df0303;
    }
    .brand-tagline {
      font-size: 10.5px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 3px;
    }
    .brand-badges {
      display: flex;
      gap: 6px;
      margin-top: 6px;
    }
    .pill-badge {
      font-size: 9px;
      font-weight: 700;
      background: #f1f5f9;
      color: #334155;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .company-meta-card {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      max-width: 380px;
    }
    .company-meta-card strong {
      color: #010c3a;
      font-size: 11.5px;
    }

    .brand-divider {
      height: 3px;
      background: linear-gradient(90deg, #010c3a 0%, #010c3a 70%, #df0303 70%, #df0303 100%);
      border-radius: 2px;
      margin-bottom: 14px;
    }

    /* Document Title & Reference Banner */
    .doc-banner {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #df0303;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      border-radius: 0 8px 8px 0;
    }
    .doc-type-pill {
      font-size: 9px;
      font-weight: 800;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 2px;
    }
    .doc-heading {
      font-size: 14.5px;
      font-weight: 800;
      color: #010c3a;
      text-transform: uppercase;
      letter-spacing: -0.2px;
    }
    .doc-subheading {
      font-size: 11px;
      color: #64748b;
      margin-top: 1px;
    }
    .doc-ref-box {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.35;
    }
    .ref-code {
      font-size: 12.5px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: 0.3px;
    }

    /* Client Addressing Block */
    .client-meta-banner {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .client-meta-col { width: 50%; }
    .meta-badge-label {
      font-size: 9.5px;
      font-weight: 800;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
      display: block;
    }
    .client-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #010c3a;
      line-height: 1.3;
    }
    .client-sub {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .client-project-tag {
      font-size: 10px;
      color: #0284c7;
      font-weight: 600;
      margin-top: 3px;
    }
    .client-person {
      font-size: 13px;
      font-weight: 800;
      color: #1e293b;
    }
    .client-contact-row {
      font-size: 11.5px;
      color: #475569;
      margin-top: 2px;
    }

    /* Key Metrics Hero Banner */
    .hero-stat-card {
      background: linear-gradient(135deg, #020b2b 0%, #0a1b52 50%, #06133d 100%);
      color: #ffffff;
      padding: 14px 20px;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 16px;
      align-items: center;
      margin-bottom: 16px;
      box-shadow: 0 4px 14px rgba(2, 11, 43, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      break-inside: avoid;
    }
    .stat-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #93c5fd;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .stat-main {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .stat-number {
      font-size: 28px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.5px;
    }
    .stat-unit {
      font-size: 15px;
      color: #f87171;
      font-weight: 800;
    }
    .stat-sub {
      font-size: 10.5px;
      color: #cbd5e1;
      margin-top: 3px;
    }
    .stat-divider {
      border-left: 1px solid rgba(255, 255, 255, 0.12);
      padding-left: 14px;
    }
    .stat-pill-val {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
    }

    /* Section Headings */
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #010c3a;
      margin: 16px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #e2e8f0;
    }
    .section-num {
      background: #010c3a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Engineering Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      break-inside: avoid;
    }
    th, td {
      padding: 7px 12px;
      text-align: left;
      font-size: 11.5px;
      vertical-align: middle;
    }
    th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #cbd5e1;
    }
    td {
      border-bottom: 1px solid #f1f5f9;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:nth-child(even) td {
      background: #fafafa;
    }
    .highlight-row td {
      background: #fff5f5 !important;
    }
    .category-cell {
      font-weight: 700;
      color: #010c3a;
      width: 28%;
    }
    .value-cell {
      font-weight: 700;
      color: #1e293b;
      width: 36%;
    }
    .detail-cell {
      color: #475569;
      font-size: 11px;
      width: 36%;
    }
    .val-highlight {
      color: #df0303;
      font-weight: 800;
    }
    .badge-tag {
      font-size: 9px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      display: inline-block;
      margin-right: 4px;
    }
    .tag-cam { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
    .tag-hdd { background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; }
    .tag-nvr { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .tag-poe { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .tag-cab { background: #f3e8ff; color: #6b21a8; border: 1px solid #e9d5ff; }

    /* Engineering Quality Deliverables Grid */
    .engineering-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    .quality-pillar-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11px;
      line-height: 1.35;
      color: #334155;
    }
    .pillar-icon {
      color: #16a34a;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .quality-pillar-card strong {
      color: #010c3a;
      display: block;
      font-size: 11.5px;
      margin-bottom: 1px;
    }

    /* Digital Verification Strip */
    .qr-verification-strip {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    .qr-text-side { width: 80%; }
    .qr-badge-title {
      color: #010c3a;
      font-size: 11.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 2px;
    }
    .qr-desc {
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.35;
    }
    .qr-url-link {
      color: #0284c7;
      font-size: 10px;
      font-weight: 600;
      text-decoration: underline;
      word-break: break-all;
      margin-top: 3px;
      display: inline-block;
    }
    .qr-code-box {
      width: 76px;
      height: 76px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .qr-code-box svg {
      width: 100%;
      height: 100%;
    }

    /* Official Sign-off Block */
    .signoff-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px dashed #cbd5e1;
      break-inside: avoid;
    }
    .sign-box {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #fafafa;
      font-size: 10.5px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong {
      color: #010c3a;
      font-size: 11.5px;
      display: block;
      margin-bottom: 2px;
    }
    .sign-signature-line {
      margin-top: 24px;
      border-top: 1px dashed #94a3b8;
      padding-top: 4px;
      font-size: 10px;
      font-weight: 600;
      color: #475569;
    }

    /* Document Disclaimer */
    .disclaimer {
      font-size: 9px;
      color: #94a3b8;
      text-align: center;
      margin-top: 14px;
      line-height: 1.35;
      break-inside: avoid;
    }

    /* Print Optimization Rules */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
        color: #000000 !important;
      }
      .no-print-toolbar {
        display: none !important;
      }
      .print-container {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .hero-stat-card {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      table, .hero-stat-card, .engineering-grid, .signoff-section, .qr-verification-strip {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Floating Toolbar -->
  <div class="no-print-toolbar">
    <div class="toolbar-brand">
      <div class="toolbar-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>DOCUMENT VIEWER</span>
      </div>
      <span class="toolbar-title">Sunrise Communication • Official Technical BOQ Proposal</span>
    </div>
    <div class="toolbar-actions">
      <span class="toolbar-hint">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Tip: Enable "Background Graphics" in Print dialog
      </span>
      <button class="btn btn-primary" onclick="window.print()" title="Print this document or save as PDF">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Print / Save as PDF
      </button>
      <button class="btn btn-secondary" onclick="window.close()" title="Close document viewer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        Close
      </button>
    </div>
  </div>

  <!-- A4 Document Sheet -->
  <div class="print-container">
    
    <!-- Letterhead -->
    <div class="letterhead">
      <div class="brand-left">
        <div class="brand-emblem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <circle cx="12" cy="11" r="3" stroke="#df0303" stroke-width="2.5" fill="#ffffff"/>
          </svg>
        </div>
        <div>
          <div class="brand-title">SUNRISE <span>COMMUNICATION</span></div>
          <div class="brand-tagline">Security Surveillance & Telecommunication System Engineers</div>
          <div class="brand-pills">
            <span class="pill-badge">Govt. Registered</span>
            <span class="pill-badge">25+ Yrs Industry Leadership</span>
            <span class="pill-badge">Thane & Mumbai MMR</span>
          </div>
        </div>
      </div>
      <div class="company-meta-card">
        <strong>${SITE_DATA.legalName}</strong><br>
        Room No. 10, Amar Bldg, Near Jyoti Book Center, Charai, Thane (W) 400601<br>
        Direct: +91 93238 48622 / +91 99875 55399<br>
        Email: ${SITE_DATA.contact.email} • Web: www.sunrisecommunication.in
      </div>
    </div>

    <!-- Dual Tone Gradient Divider -->
    <div class="brand-divider"></div>

    <!-- Document Identification Banner -->
    <div class="doc-banner">
      <div>
        <div class="doc-type-pill">SYSTEM ARCHITECTURE & SIZING SPECIFICATION</div>
        <div class="doc-heading">Official Technical Sizing & Bill of Quantities (BOQ)</div>
        <div class="doc-subheading">CCTV Surveillance Storage, Hardware Architecture & Bandwidth Specification</div>
      </div>
      <div class="doc-ref-box">
        Ref: <span class="ref-code">${refNo}</span><br>
        Date: <strong>${currentDate}</strong><br>
        <span style="font-size: 10px; color: #64748b;">Validity: 30 Days (Subject to Site Survey)</span>
      </div>
    </div>

    <!-- Client / Society Addressing Block -->
    <div class="client-meta-banner">
      <div class="client-meta-col">
        <span class="meta-badge-label">PREPARED FOR (CLIENT / PREMISE):</span>
        <div class="client-title">${clientOrg || 'The Managing Committee / Purchase Dept.'}</div>
        <div class="client-sub">Location: ${clientLoc}</div>
        <div class="client-project-tag">Project: Turnkey IP CCTV Surveillance Architecture</div>
      </div>
      <div class="client-meta-col" style="text-align: right;">
        <span class="meta-badge-label">ATTENTION / ENGAGEMENT LEAD:</span>
        <div class="client-person">${clientName || 'Hon. Secretary / Facility Manager'} ${data.clientDesignation ? `(${data.clientDesignation})` : ''}</div>
        ${data.clientPhone ? `<div class="client-contact-row">Direct Mobile: <strong>${data.clientPhone}</strong></div>` : ''}
        ${data.clientEmail ? `<div class="client-contact-row">${data.clientEmail}</div>` : ''}
      </div>
    </div>

    <!-- High-Impact Storage & Retention Hero Banner -->
    <div class="hero-stat-card">
      <div>
        <div class="stat-label">Calculated Surveillance Storage Capacity</div>
        <div class="stat-main">
          <span class="stat-number">${data.totalStorageTb}</span>
          <span class="stat-unit">TB</span>
        </div>
        <div class="stat-sub">~${data.totalStorageGb} GB total capacity across ${data.cameraCount} camera stream(s)</div>
      </div>
      <div class="stat-divider">
        <div class="stat-label">Retention Archive Period</div>
        <div class="stat-pill-val">${data.recordingDays} Days History</div>
        <div class="stat-sub">Police Security Directives Compliant</div>
      </div>
      <div class="stat-divider">
        <div class="stat-label">Compression Efficiency</div>
        <div class="stat-pill-val">${data.codecName}</div>
        <div class="stat-sub">Up to 75% Storage & Bandwidth Saved</div>
      </div>
    </div>

    <!-- 1. System Parameters Profile -->
    <div class="section-title">
      <span class="section-num">1</span>
      <span>System Parameters & Configuration Profile</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Configuration Parameter</th>
          <th>Configured Value</th>
          <th>Engineering Impact & Compliance Standard</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="category-cell">Camera Count</td>
          <td class="value-cell"><strong>${data.cameraCount} Camera Stream(s)</strong></td>
          <td class="detail-cell">Total surveillance coverage footprint & stream density</td>
        </tr>
        <tr>
          <td class="category-cell">Video Resolution</td>
          <td class="value-cell"><strong>${data.resolutionName}</strong></td>
          <td class="detail-cell">Base stream bitrate: ~${data.resolutionBaseBitrate} Mbps per camera</td>
        </tr>
        <tr>
          <td class="category-cell">Compression Standard</td>
          <td class="value-cell"><strong>${data.codecName}</strong></td>
          <td class="detail-cell">Smart intra-frame encoding (dynamic background subtraction)</td>
        </tr>
        <tr>
          <td class="category-cell">Retention History</td>
          <td class="value-cell"><strong class="val-highlight">${data.recordingDays} Days Continuous</strong></td>
          <td class="detail-cell">Complies with local Police Commissioner security directives</td>
        </tr>
        <tr>
          <td class="category-cell">Recording Schedule</td>
          <td class="value-cell"><strong>${data.recordingMode === 'continuous' ? '24/7 Continuous Recording' : 'Motion Triggered (~12h Active)'}</strong></td>
          <td class="detail-cell">Continuous evidentiary archive standard</td>
        </tr>
        <tr>
          <td class="category-cell">Frame Rate & Audio</td>
          <td class="value-cell"><strong>${data.fps} FPS • ${data.audioRecording ? 'Audio Mic Enabled' : 'Video Only'}</strong></td>
          <td class="detail-cell">Fluid evidentiary playback • 64 kbps G.711 PCM standard</td>
        </tr>
      </tbody>
    </table>

    <!-- 2. Recommended Hardware BOQ -->
    <div class="section-title">
      <span class="section-num">2</span>
      <span>Recommended Hardware Bill of Quantities (BOQ)</span>
    </div>
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
          <td class="category-cell"><span class="badge-tag tag-cam">Cameras</span>IP Surveillance Cameras</td>
          <td class="value-cell val-highlight">${data.cameraCount}x ${data.resolutionName} IP Cameras</td>
          <td class="detail-cell">Smart Dual-Light / ColorVu Night Vision • IP67 Metal Housing • PoE (802.3af)</td>
        </tr>
        <tr>
          <td class="category-cell"><span class="badge-tag tag-hdd">Storage</span>Surveillance Hard Drive (HDD)</td>
          <td class="value-cell"><strong>${data.recommendedHdd.main}</strong></td>
          <td class="detail-cell">${data.recommendedHdd.detail}</td>
        </tr>
        <tr>
          <td class="category-cell"><span class="badge-tag tag-nvr">Recorder</span>Network Video Recorder (NVR)</td>
          <td class="value-cell"><strong>${data.recommendedNvr.main}</strong></td>
          <td class="detail-cell">${data.recommendedNvr.detail}</td>
        </tr>
        <tr>
          <td class="category-cell"><span class="badge-tag tag-poe">Switch</span>PoE Network Distribution</td>
          <td class="value-cell"><strong>${data.recommendedPoE.main}</strong></td>
          <td class="detail-cell">${data.recommendedPoE.detail}</td>
        </tr>
        <tr>
          <td class="category-cell"><span class="badge-tag tag-cab">Cabling</span>Transmission Infrastructure</td>
          <td class="value-cell"><strong>100% Solid Bare Copper 23AWG Cat6 UTP</strong></td>
          <td class="detail-cell">Heavy-duty rigid PVC conduit casing with saddle clamping</td>
        </tr>
        <tr>
          <td class="category-cell"><span class="badge-tag tag-cab">Rack/PDU</span>Central Rack & Power Setup</td>
          <td class="value-cell"><strong>Wall-Mount Server Rack + Multi-Point PDU</strong></td>
          <td class="detail-cell">Surge-protected industrial power supply & patch panel dressing</td>
        </tr>
        <tr>
          <td class="category-cell">Network Bandwidth Load</td>
          <td class="value-cell"><strong>~${data.totalBandwidthMbps} Mbps</strong> (~${data.effectiveBitrateMbps} Mbps / cam)</td>
          <td class="detail-cell">Cat6 Gigabit LAN backbone compliant (ample headroom)</td>
        </tr>
        <tr>
          <td class="category-cell">Daily Write Load</td>
          <td class="value-cell"><strong>~${data.dailyStorageGb} GB / camera / day</strong></td>
          <td class="detail-cell">24/7 Continuous write endurance rating (AllFrame AI)</td>
        </tr>
      </tbody>
    </table>

    <!-- 3. Turnkey Standards & Deliverables Grid -->
    <div class="section-title">
      <span class="section-num">3</span>
      <span>Engineering Standards & Turnkey Deliverables</span>
    </div>
    <div class="engineering-grid">
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Transmission Infrastructure</strong>
          100% Solid Bare Copper 23AWG Cat6 UTP cabling inside heavy-duty rigid PVC conduits.
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Server Rack & Power Dressing</strong>
          Wall-mount rack termination, patch panel numbering, and surge-protected industrial power.
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Encrypted Remote Viewing Setup</strong>
          P2P Cloud mobile app synchronization with encrypted passwords and committee role permissions.
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Acceptance Testing & Commissioning</strong>
          Individual camera lens angle calibration, ColorVu night-light tuning, and handover documentation.
        </div>
      </div>
    </div>

    <!-- Digital Verification & Live Recalculation Strip -->
    <div class="qr-verification-strip">
      <div class="qr-text-side">
        <div class="qr-badge-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>DIGITAL VERIFICATION & LIVE RE-CALCULATION AUDIT</span>
        </div>
        <div class="qr-desc">
          Scan the QR code with any smartphone camera to inspect, adjust, or verify this technical sizing specification live on the Sunrise Communication portal:
        </div>
        <a href="${qrUrl}" target="_blank" class="qr-url-link">
          ${qrUrl}
        </a>
      </div>
      <div class="qr-code-box">
        ${qrSvg}
      </div>
    </div>

    <!-- Official Two-Party Sign-off Block -->
    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Thane / Mumbai MMR Operations
        <div class="sign-signature-line">Authorized Signatory & Stamp</div>
      </div>
      <div class="sign-box">
        <strong>${clientOrg ? clientOrg.toUpperCase() : 'CLIENT / SOCIETY REPRESENTATIVE'}</strong>
        ${clientName ? `${clientName} (${data.clientDesignation || 'Authorized Representative'})` : 'Chairman / Hon. Secretary / Facility Manager'}<br>
        Thane / Mumbai MMR
        <div class="sign-signature-line">Accepted & Approved By (Signature & Society Seal)</div>
      </div>
    </div>

    <!-- Legal & Technical Disclaimer -->
    <div class="disclaimer">
      This document is an engineering sizing specification generated by Sunrise Communication's Technical Sizing Engine.<br>
      Commercial taxation (GST), specific brand line selections (CP Plus, Hikvision, Dahua), and exact cable meterage are finalized upon physical on-site technical inspection.
    </div>
  </div>

  <script>
    function triggerPrint() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 400);
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
  <title>Official Technical Requirement & System Architecture Proposal - ${refNo} | Sunrise Communication</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page {
      size: A4 portrait;
      margin: 8mm 10mm 10mm 10mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #eef2f6;
      padding: 24px 16px 40px 16px;
      font-size: 12.5px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    /* Screen View Toolbar */
    .no-print-toolbar {
      max-width: 860px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #090e24;
      padding: 12px 20px;
      border-radius: 10px;
      color: #ffffff;
      box-shadow: 0 4px 16px rgba(9, 14, 36, 0.25);
      position: sticky;
      top: 12px;
      z-index: 1000;
    }
    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toolbar-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(223, 3, 3, 0.2);
      border: 1px solid rgba(223, 3, 3, 0.4);
      color: #fca5a5;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .toolbar-title {
      font-size: 13px;
      font-weight: 600;
      color: #e2e8f0;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toolbar-hint {
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 6px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-size: 12.5px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #df0303 0%, #b80202 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(223, 3, 3, 0.35);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #f01414 0%, #c90303 100%);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Print Paper Container */
    .print-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 34px 40px;
      border-radius: 12px;
      box-shadow: 0 12px 35px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8);
      position: relative;
    }

    /* Header Letterhead */
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 16px;
      margin-bottom: 14px;
    }
    .brand-left {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .brand-emblem {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #010c3a 0%, #0a1b52 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(1, 12, 58, 0.2);
      flex-shrink: 0;
    }
    .brand-title {
      font-size: 23px;
      font-weight: 900;
      color: #010c3a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .brand-title span {
      color: #df0303;
    }
    .brand-tagline {
      font-size: 10.5px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 3px;
    }
    .brand-badges {
      display: flex;
      gap: 6px;
      margin-top: 6px;
    }
    .pill-badge {
      font-size: 9px;
      font-weight: 700;
      background: #f1f5f9;
      color: #334155;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .company-meta-card {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      max-width: 380px;
    }
    .company-meta-card strong {
      color: #010c3a;
      font-size: 11.5px;
    }

    .brand-divider {
      height: 3px;
      background: linear-gradient(90deg, #010c3a 0%, #010c3a 70%, #df0303 70%, #df0303 100%);
      border-radius: 2px;
      margin-bottom: 14px;
    }

    /* Document Identification Banner */
    .doc-banner {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #df0303;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      border-radius: 0 8px 8px 0;
    }
    .doc-type-pill {
      font-size: 9px;
      font-weight: 800;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 2px;
    }
    .doc-heading {
      font-size: 14.5px;
      font-weight: 800;
      color: #010c3a;
      text-transform: uppercase;
      letter-spacing: -0.2px;
    }
    .doc-subheading {
      font-size: 11px;
      color: #64748b;
      margin-top: 1px;
    }
    .doc-ref-box {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.35;
    }
    .ref-code {
      font-size: 12.5px;
      font-weight: 800;
      color: #010c3a;
      letter-spacing: 0.3px;
    }

    /* Client Addressing Block */
    .client-meta-banner {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .client-meta-col { width: 50%; }
    .meta-badge-label {
      font-size: 9.5px;
      font-weight: 800;
      color: #df0303;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
      display: block;
    }
    .client-title {
      font-size: 13.5px;
      font-weight: 800;
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
      font-weight: 800;
      color: #1e293b;
    }
    .client-contact-row {
      font-size: 11.5px;
      color: #475569;
      margin-top: 2px;
    }

    /* Section Headings */
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #010c3a;
      margin: 16px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #e2e8f0;
    }
    .section-num {
      background: #010c3a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Engineering Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      break-inside: avoid;
    }
    th, td {
      padding: 8px 12px;
      text-align: left;
      font-size: 11.5px;
      vertical-align: middle;
    }
    th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #cbd5e1;
    }
    td {
      border-bottom: 1px solid #f1f5f9;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:nth-child(even) td {
      background: #fafafa;
    }
    .service-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      background: #e0e7ff;
      color: #3730a3;
      border: 1px solid #c7d2fe;
      font-size: 10.5px;
      font-weight: 700;
      margin: 2px 4px 2px 0;
    }
    .badge-tag {
      font-size: 9px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      display: inline-block;
      margin-right: 4px;
    }
    .tag-cam { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
    .tag-ic { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .tag-bio { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .tag-net { background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; }
    .tag-amc { background: #f3e8ff; color: #6b21a8; border: 1px solid #e9d5ff; }

    /* Engineering Quality Deliverables Grid */
    .engineering-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    .quality-pillar-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11px;
      line-height: 1.35;
      color: #334155;
    }
    .pillar-icon {
      color: #16a34a;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .quality-pillar-card strong {
      color: #010c3a;
      display: block;
      font-size: 11.5px;
      margin-bottom: 1px;
    }

    /* Digital Verification Strip */
    .qr-verification-strip {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      break-inside: avoid;
    }
    .qr-text-side { width: 80%; }
    .qr-badge-title {
      color: #010c3a;
      font-size: 11.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 2px;
    }
    .qr-desc {
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.35;
    }
    .qr-url-link {
      color: #0284c7;
      font-size: 10px;
      font-weight: 600;
      text-decoration: underline;
      word-break: break-all;
      margin-top: 3px;
      display: inline-block;
    }
    .qr-code-box {
      width: 76px;
      height: 76px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .qr-code-box svg {
      width: 100%;
      height: 100%;
    }

    /* Official Sign-off Block */
    .signoff-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px dashed #cbd5e1;
      break-inside: avoid;
    }
    .sign-box {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #fafafa;
      font-size: 10.5px;
      color: #64748b;
      text-align: center;
    }
    .sign-box strong {
      color: #010c3a;
      font-size: 11.5px;
      display: block;
      margin-bottom: 2px;
    }
    .sign-signature-line {
      margin-top: 24px;
      border-top: 1px dashed #94a3b8;
      padding-top: 4px;
      font-size: 10px;
      font-weight: 600;
      color: #475569;
    }

    /* Document Disclaimer */
    .disclaimer {
      font-size: 9px;
      color: #94a3b8;
      text-align: center;
      margin-top: 14px;
      line-height: 1.35;
      break-inside: avoid;
    }

    /* Print Optimization Rules */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
        color: #000000 !important;
      }
      .no-print-toolbar {
        display: none !important;
      }
      .print-container {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      table, .engineering-grid, .signoff-section, .qr-verification-strip {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Floating Toolbar -->
  <div class="no-print-toolbar">
    <div class="toolbar-brand">
      <div class="toolbar-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>DOCUMENT VIEWER</span>
      </div>
      <span class="toolbar-title">Sunrise Communication • Official Technical Sizing Proposal</span>
    </div>
    <div class="toolbar-actions">
      <span class="toolbar-hint">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Tip: Enable "Background Graphics" in Print dialog
      </span>
      <button class="btn btn-primary" onclick="window.print()" title="Print this document or save as PDF">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Print / Save as PDF
      </button>
      <button class="btn btn-secondary" onclick="window.close()" title="Close document viewer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        Close
      </button>
    </div>
  </div>

  <!-- A4 Document Sheet -->
  <div class="print-container">
    
    <!-- Letterhead -->
    <div class="letterhead">
      <div class="brand-left">
        <div class="brand-emblem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <circle cx="12" cy="11" r="3" stroke="#df0303" stroke-width="2.5" fill="#ffffff"/>
          </svg>
        </div>
        <div>
          <div class="brand-title">SUNRISE <span>COMMUNICATION</span></div>
          <div class="brand-tagline">Security Surveillance & Telecommunication System Engineers</div>
          <div class="brand-pills">
            <span class="pill-badge">Govt. Registered</span>
            <span class="pill-badge">25+ Yrs Industry Leadership</span>
            <span class="pill-badge">Thane & Mumbai MMR</span>
          </div>
        </div>
      </div>
      <div class="company-meta-card">
        <strong>${SITE_DATA.legalName}</strong><br>
        Room No. 10, Amar Bldg, Near Jyoti Book Center, Charai, Thane (W) 400601<br>
        Direct: +91 93238 48622 / +91 99875 55399<br>
        Email: ${SITE_DATA.contact.email} • Web: www.sunrisecommunication.in
      </div>
    </div>

    <!-- Dual Tone Gradient Divider -->
    <div class="brand-divider"></div>

    <!-- Document Identification Banner -->
    <div class="doc-banner">
      <div>
        <div class="doc-type-pill">SYSTEM ARCHITECTURE SPECIFICATION</div>
        <div class="doc-heading">Security & Telecom System Architecture Proposal</div>
        <div class="doc-subheading">Target Premise: <strong>${data.premiseTypeName} (${clientLoc})</strong></div>
      </div>
      <div class="doc-ref-box">
        Ref: <span class="ref-code">${refNo}</span><br>
        Date: <strong>${currentDate}</strong><br>
        <span style="font-size: 10px; color: #64748b;">Validity: 30 Days (Subject to Site Survey)</span>
      </div>
    </div>

    <!-- Client / Society Addressing Block -->
    <div class="client-meta-banner">
      <div class="client-meta-col">
        <span class="meta-badge-label">PREPARED FOR (CLIENT / PREMISE):</span>
        <div class="client-title">${clientOrg || 'The Managing Committee / Purchase Dept.'}</div>
        <div class="client-sub">Location: ${clientLoc}</div>
        <div class="client-project-tag">Premise Type: ${data.premiseTypeName}</div>
      </div>
      <div class="client-meta-col" style="text-align: right;">
        <span class="meta-badge-label">ATTENTION / ENGAGEMENT LEAD:</span>
        <div class="client-person">${clientName || 'Hon. Secretary / Facility Manager'} ${data.clientDesignation ? `(${data.clientDesignation})` : ''}</div>
        ${data.clientPhone ? `<div class="client-contact-row">Direct Mobile: <strong>${data.clientPhone}</strong></div>` : ''}
        ${data.clientEmail ? `<div class="client-contact-row">${data.clientEmail}</div>` : ''}
      </div>
    </div>

    <!-- 1. Premise & Scope of Integration -->
    <div class="section-title">
      <span class="section-num">1</span>
      <span>Premise Scope & Integration Blueprint</span>
    </div>
    <table>
      <tbody>
        <tr>
          <td style="width: 30%; font-weight: 700; color: #010c3a;">Property / Premise Profile:</td>
          <td><strong>${data.premiseTypeName}</strong> (${clientLoc})</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #010c3a;">Required Integration Scope:</td>
          <td>
            ${servicesList.map(s => `<span class="service-badge">${s}</span>`).join('')}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 2. Recommended Sizing & BOQ -->
    <div class="section-title">
      <span class="section-num">2</span>
      <span>Recommended Hardware Sizing & Engineering Architecture</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">System Track</th>
          <th style="width: 38%;">Sized Scope & Hardware Models</th>
          <th style="width: 37%;">Engineering Architecture Specs</th>
        </tr>
      </thead>
      <tbody>
        ${data.needCctv ? `
        <tr>
          <td><span class="badge-tag tag-cam">CCTV</span><strong>Surveillance Track</strong></td>
          <td><strong>${data.cameraCount}x IP Cameras + ${data.recommendedNvr}</strong></td>
          <td>Storage: ${data.recommendedHdd} (${data.storageDays} Days Retention) • PoE Switch Backbone</td>
        </tr>
        ` : ''}

        ${data.needIntercom ? `
        <tr>
          <td><span class="badge-tag tag-ic">Intercom</span><strong>EPABX / IP PBX</strong></td>
          <td><strong>${data.recommendedIntercom}</strong></td>
          <td>Capacity: ${data.flatCount} Extensions across ${data.wingCount} Wing(s) • Gatekeeper Console & Caller ID</td>
        </tr>
        ` : ''}

        ${data.needBiometrics ? `
        <tr>
          <td><span class="badge-tag tag-bio">Biometrics</span><strong>Access Control</strong></td>
          <td><strong>${data.recommendedBiometric}</strong></td>
          <td>${data.doorCount}x 600lbs Fail-Safe EM Locks, U-Brackets, Exit Switches & Attendance Software</td>
        </tr>
        ` : ''}

        ${data.needNetworking ? `
        <tr>
          <td><span class="badge-tag tag-net">Networking</span><strong>Structured Cabling</strong></td>
          <td><strong>${data.lanPoints} Certified Cat6 I/O Points</strong></td>
          <td>Patch Panels, Cable Managers, Server Rack Dressing & Fluke Testing</td>
        </tr>
        ` : ''}

        ${data.needAmc ? `
        <tr>
          <td><span class="badge-tag tag-amc">AMC</span><strong>Annual Maintenance</strong></td>
          <td><strong>Annual Maintenance Contract (AMC)</strong></td>
          <td>4 Preventive quarterly visits, camera cleaning, voltage tests & 24h breakdown technician support</td>
        </tr>
        ` : ''}
      </tbody>
    </table>

    <!-- 3. Turnkey Execution Standards Grid -->
    <div class="section-title">
      <span class="section-num">3</span>
      <span>Turnkey Execution & Handover Assurance</span>
    </div>
    <div class="engineering-grid">
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Standardized Cabling Standards</strong>
          ISI-grade conduit casing-capping, multi-pair armoured telephone cables & high-performance Cat6 UTP.
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>OEM Authorized Equipment</strong>
          Hardware sourced directly from authorized OEM distributors (CP Plus, Hikvision, Dahua, Matrix, Essl).
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Managing Committee Handover</strong>
          Comprehensive live demonstration, port mapping diagram, and official committee sign-off certificate.
        </div>
      </div>
      <div class="quality-pillar-card">
        <svg class="pillar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>25+ Years Proven Track Record</strong>
          Trusted across housing societies and commercial hubs throughout Thane, Mumbai & Navi Mumbai.
        </div>
      </div>
    </div>

    <!-- Digital Verification & Live Blueprint Strip -->
    <div class="qr-verification-strip">
      <div class="qr-text-side">
        <div class="qr-badge-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>DIGITAL VERIFICATION & LIVE BLUEPRINT</span>
        </div>
        <div class="qr-desc">
          Scan the QR code with any smartphone camera to inspect, adjust, or verify this technical specification live on the Sunrise Communication portal:
        </div>
        <a href="${qrUrl}" target="_blank" class="qr-url-link">
          ${qrUrl}
        </a>
      </div>
      <div class="qr-code-box">
        ${qrSvg}
      </div>
    </div>

    <!-- Official Two-Party Sign-off Block -->
    <div class="signoff-section">
      <div class="sign-box">
        <strong>SUNRISE COMMUNICATION</strong>
        Technical Solutions & System Engineering Dept.<br>
        Thane / Mumbai MMR Operations
        <div class="sign-signature-line">Authorized Signatory & Stamp</div>
      </div>
      <div class="sign-box">
        <strong>${clientOrg ? clientOrg.toUpperCase() : 'CLIENT / COMMITTEE REPRESENTATIVE'}</strong>
        ${clientName ? `${clientName} (${data.clientDesignation || 'Authorized Representative'})` : 'Chairman / Hon. Secretary / Facility Manager'}<br>
        Thane / Mumbai MMR
        <div class="sign-signature-line">Accepted & Approved By (Signature & Seal)</div>
      </div>
    </div>

    <!-- Legal & Technical Disclaimer -->
    <div class="disclaimer">
      This document is an architectural sizing proposal generated by Sunrise Communication's Sizing Engine.<br>
      Itemized pricing, commercial taxation (GST), and final cable meterage are confirmed following on-site technical inspection.
    </div>
  </div>

  <script>
    function triggerPrint() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 400);
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
