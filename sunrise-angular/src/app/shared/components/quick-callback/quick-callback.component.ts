import { Component, signal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InquiryService } from '../../../core/services/inquiry.service';
import { SITE_DATA } from '../../../core/constants/site-data';
import { environment } from '../../../../environments/environment';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-quick-callback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quick-callback.component.html',
  styleUrl: './quick-callback.component.scss'
})
export class QuickCallbackComponent {
  private fb = inject(FormBuilder);
  private inquiryService = inject(InquiryService);
  siteData = SITE_DATA;

  @Input() heading: string = 'Request a 10-Minute Technical Callback';
  @Input() subheading: string = 'Speak directly with our senior field engineers in Charai, Thane West for immediate guidance.';
  @Input() defaultService: string = 'CCTV Surveillance Systems';

  isSubmitting = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  lastSubmittedPhone = signal<string>('');

  readonly serviceOptions = [
    'CCTV Surveillance Systems',
    'Housing Society Intercom & EPABX',
    'Security System AMC Contracts',
    'Biometric Access & EM Door Locks',
    'Structured Network & Telecom Cabling',
    'Urgent Breakdown / Service Repair'
  ];

  callbackForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
    serviceNeeded: [this.defaultService, Validators.required]
  });

  getWhatsAppDirectUrl(): string {
    const v = this.callbackForm.value;
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const text = [
      `*Quick Callback Request via Sunrise Communication Website*`,
      `👤 *Name:* ${v.name || 'Not Provided'}`,
      `📞 *Phone:* ${v.phone || 'Not Provided'}`,
      `⚙️ *Requirement:* ${v.serviceNeeded || this.defaultService}`,
      ``,
      `🌐 *Source:* https://sunrisecommunication.in`
    ].join('\n');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  async onSubmit(): Promise<void> {
    if (this.callbackForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');

      const formVal = this.callbackForm.value;
      this.lastSubmittedPhone.set(formVal.phone || '');

      const messageSummary = `Quick Callback Request: ${formVal.name} (${formVal.phone}) requires ${formVal.serviceNeeded}.`;

      try {
        // 1. Submit to Django CRM Backend via unified InquiryService
        await this.inquiryService.submitInquiry({
          inquiry_type: 'contact',
          name: formVal.name || '',
          phone: formVal.phone || '',
          systems_required: [formVal.serviceNeeded || 'General Inquiry'],
          message: messageSummary
        });

        // 2. EmailJS Notification
        const { serviceId, templateId, publicKey } = environment.emailjs;
        if (serviceId && templateId && publicKey) {
          try {
            await emailjs.send(
              serviceId,
              templateId,
              {
                from_name: formVal.name,
                phone: formVal.phone,
                message: messageSummary
              },
              publicKey
            );
          } catch (e) {
            console.warn('EmailJS notification skipped:', e);
          }
        }

        this.successMessage.set('Request received! Our senior engineer will call you shortly.');
        this.callbackForm.reset({
          name: '',
          phone: '',
          serviceNeeded: this.defaultService
        });

        setTimeout(() => this.successMessage.set(''), 10000);
      } catch (err) {
        console.error('Quick callback submission error:', err);
        this.errorMessage.set('Could not submit online. Click below to message us directly on WhatsApp.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.callbackForm.markAllAsTouched();
    }
  }
}
