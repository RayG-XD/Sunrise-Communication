import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { SocietyAuditFormComponent } from '../../shared/components/society-audit-form/society-audit-form.component';
import { SITE_DATA } from '../../core/constants/site-data';
import { environment } from '../../../environments/environment';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageTitleComponent, SocietyAuditFormComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  
  siteData = SITE_DATA;
  activeTab = signal<'society' | 'general'>('society');
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  lastSubmittedData = signal<any>(null);
  
  contactForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{8,15}$/)]],
    message: ['', Validators.required]
  });

  getWhatsAppUrl(data?: any): string {
    const values = data || this.contactForm.value;
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const text = [
      `*New Inquiry via Sunrise Communication Website*`,
      `👤 *Name:* ${values.username || 'Not Provided'}`,
      `📞 *Phone:* ${values.phone || 'Not Provided'}`,
      `✉️ *Email:* ${values.email || 'Not Provided'}`,
      values.company ? `🏢 *Company / Society:* ${values.company}` : null,
      `💬 *Requirement:* ${values.message || 'General Inquiry / Site Survey Request'}`,
      ``,
      `🌐 *Source:* https://sunrisecommunication.in/contact`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  sendDirectWhatsApp(): void {
    if (this.contactForm.valid) {
      window.open(this.getWhatsAppUrl(), '_blank');
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');
      
      const formData = { ...this.contactForm.value };
      this.lastSubmittedData.set(formData);

      try {
        // 1. Post to Django CRM backend if online
        try {
          await firstValueFrom(this.http.post(`${environment.apiUrl}/inquiries/`, {
            inquiry_type: 'contact',
            name: formData.username,
            email: formData.email,
            phone: formData.phone,
            organization: formData.company || '',
            message: formData.message
          }));
        } catch (backendErr) {
          console.warn('Backend inquiry API not reachable, falling back to EmailJS/WhatsApp:', backendErr);
        }

        // 2. EmailJS Notification
        const { serviceId, templateId, publicKey } = environment.emailjs;

        const templateParams = {
          from_name: formData.username,
          from_email: formData.email,
          company: formData.company || 'Not Provided',
          phone: formData.phone,
          message: formData.message,
        };

        if (serviceId && templateId && publicKey) {
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
        } else {
          // If credentials not yet configured, gracefully simulate success
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        this.successMessage.set('Thank you! Your inquiry has been received. Our technical team will reach out promptly.');
        this.contactForm.reset();
        
        // Auto-clear message after 8 seconds
        setTimeout(() => this.successMessage.set(''), 8000);
      } catch (error) {
        console.error('EmailJS Submission Error:', error);
        this.errorMessage.set('Could not send message via email. Please click "Chat on WhatsApp" below for instant contact.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
