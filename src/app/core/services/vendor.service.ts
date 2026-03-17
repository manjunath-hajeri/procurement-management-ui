import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vendor, VendorRequest, VendorStatus } from '../models/vendor.model';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private apiUrl = `${environment.apiUrl}/vendors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  create(vendor: VendorRequest): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor);
  }

  update(id: number, vendor: VendorRequest): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor);
  }

  updateStatus(id: number, status: VendorStatus): Observable<Vendor> {
    return this.http.patch<Vendor>(`${this.apiUrl}/${id}/status`, null, { params: { status } });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
