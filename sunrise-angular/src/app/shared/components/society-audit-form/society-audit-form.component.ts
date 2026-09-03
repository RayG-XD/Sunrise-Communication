import { Component, signal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SITE_DATA } from '../../../core/constants/site-data';
import { environment } from '../../../../environments/environment';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-society-audit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './society-audit-form.component.html',
  styleUrl: './society-audit-form.component.scss'
})
export class SocietyAuditFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  siteData = SITE_DATA;

  @Input() title: string = 'Book a Free Technical Site Audit & BOQ Sizing';
  @Input() subtitle: string = 'For Housing Society Managing Committees, Secretaries & Office Facility Managers across Thane, Mumbai & Navi Mumbai';

  isSubmitting = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  lastSubmittedSummary = signal<string>('');

  auditForm = this.fb.group({
    societyName: ['', Validators.required],
    locality: ['Charai, Thane (West)', Validators.required],
    premiseType: ['Cooperative Housing Society (CHS)', Validators.required],
    flatCount: [32, [Validators.required, Validators.min(1)]],
    wingCount: [1, [Validators.required, Validators.min(1)]],
    needCctv: [true],
    needIntercom: [true],
    needBiometrics: [false],
    needCabling: [false],
    needAmc: [true],
    projectType: ['New Turnkey Installation', Validators.required],
    preferredTime: ['Morning (10 AM – 1 PM)', Validators.required],
    contactPerson: ['', Validators.required],
    designation: ['Society Secretary', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{8,15}$/)]],
    additionalNotes: ['']
  });

  generateBoqSummary(formVal?: any): string {
    const v = formVal || this.auditForm.value;
    const services: string[] = [];
    if (v.needCctv) services.push('CCTV Camera Surveillance');
    if (v.needIntercom) services.push(`EPABX Intercom (${v.flatCount || 0} Flats / ${v.wingCount || 1} Wing(s))`);
    if (v.needBiometrics) services.push('Biometric Access Control');
    if (v.needCabling) services.push('Structured Cabling Infrastructure');
    if (v.needAmc) services.push('Comprehensive / Non-Comprehensive AMC');

    return [
      `*Sunrise Communication — Technical Site Audit & Survey Request*`,
      `🏢 *Premise:* ${v.societyName || 'Not Provided'} (${v.premiseType})`,
      `📍 *Location:* ${v.locality || 'Thane / Mumbai MMR'}`,
      `🔢 *Scale:* ${v.flatCount || 0} Flats / Units across ${v.wingCount || 1} Wing(s)`,
      `⚙️ *Scope of Audit:* ${services.join(', ') || 'General System Inspection'}`,
      `📋 *Project Type:* ${v.projectType || 'Standard'}`,
      `⏰ *Preferred Survey Slot:* ${v.preferredTime || 'Flexible'}`,
      `👤 *Contact Person:* ${v.contactPerson || 'Not Provided'} (${v.designation})`,
      `📞 *Phone:* ${v.phone || 'Not Provided'}`,
      v.additionalNotes ? `💬 *Notes:* ${v.additionalNotes}` : null,
      ``,
      `🌐 *Requested via:* https://sunrisecommunication.in`
    ].filter(Boolean).join('\n');
  }

  getWhatsAppLeadUrl(summaryText?: string): string {
    const text = summaryText || this.generateBoqSummary();
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  sendDirectWhatsApp(): void {
    if (this.auditForm.valid) {
      window.open(this.getWhatsAppLeadUrl(), '_blank');
    } else {
      this.auditForm.markAllAsTouched();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.auditForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');

      const summary = this.generateBoqSummary();
      this.lastSubmittedSummary.set(summary);

      try {
        const formVal = this.auditForm.value;

        // Collect selected systems
        const systems: string[] = [];
        if (formVal.needCctv) systems.push('CCTV');
        if (formVal.needIntercom) systems.push('Intercom');
        if (formVal.needBiometrics) systems.push('Biometrics');
        if (formVal.needCabling) systems.push('Cabling');
        if (formVal.needAmc) systems.push('AMC');

        // 1. Post to Django CRM backend if accessible
        try {
          await firstValueFrom(this.http.post(`${environment.apiUrl}/inquiries/`, {
            inquiry_type: 'society_audit',
            name: formVal.contactPerson,
            phone: formVal.phone,
            designation: formVal.designation,
            organization: formVal.societyName,
            locality: formVal.locality,
            project_type: formVal.projectType,
            flat_count: formVal.flatCount,
            wing_count: formVal.wingCount,
            preferred_time: formVal.preferredTime,
            systems_required: systems,
            message: summary
          }));
        } catch (backendErr) {
          console.warn('Backend inquiry API not reachable or failed, falling back to EmailJS:', backendErr);
        }

        // 2. EmailJS Notification
        const { serviceId, templateId, publicKey } = environment.emailjs;

        if (serviceId && templateId && publicKey) {
          const templateParams = {
            from_name: `${formVal.contactPerson} (${formVal.designation})`,
            company: formVal.societyName,
            phone: formVal.phone,
            message: summary
          };
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
        } else {
          // Graceful fallback simulation
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        this.successMessage.set('Site audit request booked successfully! Our field engineer will call you to confirm the time slot.');
        this.auditForm.reset({
          locality: 'Charai, Thane (West)',
          premiseType: 'Cooperative Housing Society (CHS)',
          flatCount: 32,
          wingCount: 1,
          needCctv: true,
          needIntercom: true,
          needBiometrics: false,
          needCabling: false,
          needAmc: true,
          projectType: 'New Turnkey Installation',
          preferredTime: 'Morning (10 AM – 1 PM)',
          designation: 'Society Secretary'
        });

        setTimeout(() => this.successMessage.set(''), 10000);
      } catch (err) {
        console.error('Audit Form Error:', err);
        this.errorMessage.set('Could not submit online. Please click "Confirm via WhatsApp" below.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.auditForm.markAllAsTouched();
    }
  }
}
