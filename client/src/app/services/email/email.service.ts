import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://bento-hr.fly.dev';
  constructor(private http: HttpClient) { }
  sendPayrollEmail(to: string, subject: string, content: string): Observable<any> {
    const emailPayload = { to, subject, content };
    return this.http.post(`${this.apiUrl}/payroll/send`, emailPayload);
  }
}
