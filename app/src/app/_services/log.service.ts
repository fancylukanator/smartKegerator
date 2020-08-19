import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/all/logs';

@Injectable({
  providedIn: 'root'
})

export class LogService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(API_URL);
    }

    get(id): Observable<any> {
        return this.http.get(`${API_URL}/${id}`);
    }

    findByUser(user): Observable<any> {
      return this.http.get(`${API_URL}?user=${user}`);
    }

}