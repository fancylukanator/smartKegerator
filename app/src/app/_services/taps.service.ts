import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://192.168.2.21:8080/api/test/admin/taps';

@Injectable({
  providedIn: 'root'
})
export class TapsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }

  get(id): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(API_URL, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }

  findByBeer(beer): Observable<any> {
    return this.http.get(`${API_URL}?beer=${beer}`);
  }
  findAllinUse(): Observable<any> {
    return this.http.get('http://192.168.2.21:8080/api/test/admin/taps/inUse')
  }
  findLeft(): Observable<any> {
    return this.http.get('http://192.168.2.21:8080/api/test/all/left')
  }
  findRight(): Observable<any> {
    return this.http.get('http://192.168.2.21:8080/api/test/all/right')
  }
}
