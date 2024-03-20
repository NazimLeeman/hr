import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  applicantId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClientService: ApiClientService,
    private authService: AuthService
  ) {
    this.applicantId = Number(this.route.snapshot.params['applicantId'])
  }

  deleteApplicant() {
    this.apiClientService.deleteApplicant(this.applicantId).subscribe(
      () => {
        this.router.navigate(['/signup']);
        this.logout()
      },
      (error: any) => {
        console.error('Error deleting applicant', error);
      }
    );
  }

  logout(): void {
    this.authService.removeToken();
  }
}
