import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://192.168.2.19:8080/api/test/all/stats';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }

  get(id): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  update(id, data): Observable<any> {
    return this.http.put(`http://localhost:8080/api/test/admin/stats/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/test/admin/stats/${id}`);
  }

  findByUser(user): Observable<any> {
    return this.http.get(`${API_URL}?user=${user}`);
  }
}
