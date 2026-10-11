import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { SITE_DATA } from '../../core/constants/site-data';
import { InquiryService } from '../../core/services/inquiry.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageTitleComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private inquiryService = inject(InquiryService);
  siteData = SITE_DATA;

  googleReviewUrl = SITE_DATA.gbp.reviewUrl;
  googleMapsUrl = SITE_DATA.gbp.mapsUrl;

  isCopied = signal<boolean>(false);
  isSubmittingFeedback = signal<boolean>(false);
  feedbackSent = signal<boolean>(false);

  feedbackForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
    societyOrOrg: [''],
    feedback: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    // Component initialization
  }

  copyReviewLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://sunrisecommunication.in/review');
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 3000);
    }
  }

  async onSubmitFeedback(): Promise<void> {
    if (this.feedbackForm.valid) {
      this.isSubmittingFeedback.set(true);
      const v = this.feedbackForm.value;

      try {
        await this.inquiryService.submitInquiry({
          inquiry_type: 'contact',
          name: v.name || '',
          phone: v.phone || '',
          organization: v.societyOrOrg || '',
          message: `Direct Customer Feedback: ${v.feedback} (Society/Org: ${v.societyOrOrg || 'N/A'})`
        });

        this.feedbackSent.set(true);
        this.feedbackForm.reset();
      } catch (err) {
        console.error('Feedback submit error:', err);
      } finally {
        this.isSubmittingFeedback.set(false);
      }
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }
}
