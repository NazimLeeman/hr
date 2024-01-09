import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  // private apiUrl = 'http://localhost:4000';
  private apiUrl = 'https://hr-server-icl9.onrender.com';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/signup`, userData)
  }

  createEmployee(userData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/employee/create/1`, userData);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/restaurant/1`);
  }

  postPosition( userData:any): Observable<any>{
    const url = `${this.apiUrl}/position/1`
    return this.http.post(url, userData);
  }

  postJob(userData:any): Observable<any> {
    const url = `${this.apiUrl}/job/new/1`
    return this.http.post(url,userData)
  }

  postSchedule(userData:any): Observable<any> {
    const url = `${this.apiUrl}/schedule/1/restaurant`
    return this.http.post(url,userData)
  }

  getAllScheduleForRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule/restaurant/1`)
  }

  getAllScheduleOfEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule/2/restaurant/1`)
  }

  getAllJobForRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/1`)
  }

  getAllJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/all`)
  }

  postPayroll(userData:any): Observable<any> {
    const url = `${this.apiUrl}/payroll/1/`
    return this.http.post(url,userData)
  }

  getPayroll(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payroll/${employeeId}`)
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

  applyJob(userData:any, applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applyJob/${applicantId}`
    return this.http.post(url,userData)
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
