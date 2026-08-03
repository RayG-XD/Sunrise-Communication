import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { SITE_DATA } from '../../core/constants/site-data';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageTitleComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  siteData = SITE_DATA;
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  contactForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: ['', Validators.required],
    message: ['', Validators.required]
  });

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');
      
      try {
        // IMPORTANT: Replace these values with your actual EmailJS credentials
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        const publicKey = 'YOUR_PUBLIC_KEY';

        const templateParams = {
          from_name: this.contactForm.value.username,
          from_email: this.contactForm.value.email,
          company: this.contactForm.value.company || 'Not Provided',
          phone: this.contactForm.value.phone,
          message: this.contactForm.value.message,
        };

        if (serviceID === 'YOUR_SERVICE_ID') {
          // If not configured, simulate success (for demo/development purposes)
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
          await emailjs.send(serviceID, templateID, templateParams, publicKey);
        }

        this.successMessage.set('Thank you for contacting us! We will get back to you soon.');
        this.contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => this.successMessage.set(''), 5000);
      } catch (error) {
        console.error('FAILED...', error);
        this.errorMessage.set('Oops! Something went wrong. Please try again later.');
        setTimeout(() => this.errorMessage.set(''), 5000);
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
