import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080"; // Ensure correct URL

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // 👈 Use stored token
      'Content-Type': 'application/json'
    });

    // ✅ Return the HTTP GET request
    return this.http.get(BASIC_URL + "/api/customer/cars", { headers });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}

