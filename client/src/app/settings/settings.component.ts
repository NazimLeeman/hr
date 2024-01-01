import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

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
    private apiClientService: ApiClientService
  ) {
    this.applicantId = +this.route.snapshot.params['applicantId'];
  }

  deleteApplicant() {
    this.apiClientService.deleteApplicant(this.applicantId).subscribe(
      () => {
        this.router.navigate(['/signup']);
      },
      (error: any) => {
        console.error('Error deleting applicant', error);
      }
    );
  }
}
