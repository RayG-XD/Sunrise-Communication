import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface InquiryPayload {
  inquiry_type: 'society_audit' | 'cctv_calculator' | 'estimator' | 'contact' | 'product';
  name: string;
  phone: string;
  email?: string;
  designation?: string;
  organization?: string;
  locality?: string;
  project_type?: string;
  flat_count?: number | null;
  wing_count?: number | null;
  preferred_time?: string;
  systems_required?: string[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private http = inject(HttpClient);

  /**
   * Submit an inquiry or calculation record to the Django CRM backend.
   * Fails gracefully without throwing errors so user experience is never interrupted.
   */
  async submitInquiry(payload: InquiryPayload): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.post(`${environment.apiUrl}/inquiries/`, payload)
      );
      return true;
    } catch (err) {
      console.warn('InquiryService: Backend logging skipped or failed (offline/fallback mode):', err);
      return false;
    }
  }
}
