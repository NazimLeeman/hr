import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrl: './navbar-profile.component.css'
})
export class NavbarProfileComponent implements OnInit {
  applicantId: number = 0;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.applicantId = +params['applicantId'] || 0;
      })
  }
  logout(): void {
    this.router.navigate([''])
  }
}
