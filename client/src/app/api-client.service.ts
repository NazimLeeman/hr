import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private apiUrl = 'https://hr-server-icl9.onrender.com';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/signup`, userData)
  }

  createEmployee(userData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/employee/signup`, userData);
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
  
  getApplicantData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.get(url);
  }

  updateApplicantData(applicantId: number, mergedData: any): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.put(url, mergedData);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
