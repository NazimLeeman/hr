import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent {
  isCollapsed = false;
  applicantId: number = 0;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.applicantId = +params['applicantId'] || 0;
      })
  }
  logout(): void {
    this.authService.removeToken();
    localStorage.clear();
    this.router.navigate([''])
  }
}
