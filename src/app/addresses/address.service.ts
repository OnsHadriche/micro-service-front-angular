import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'http://localhost:8085/api/address';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getAddressById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createAddress(address: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, address);
  }

  updateAddress(id: number, address: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
