import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private apiUrl = 'https://hr-server-icl9.onrender.com';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/signup`, userData)
  }

  loginUser(loginData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/login`, loginData)
  }

  deleteApplicant(applicantId: number) {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.delete<void>(url);
  }

  getRegisterData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/loginData/${applicantId}`
    return this.http.get(url);
  }
}
