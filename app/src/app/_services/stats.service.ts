import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/all/stats';

@Injectable({
  providedIn: 'root'
})

export class StatsService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(API_URL);
    }

    leaderboard() {
      return this.http.get(API_URL)
    }

    get(id): Observable<any> {
        return this.http.get(`${API_URL}/${id}`);
    }

    findByUser(user): Observable<any> {
      return this.http.get(`${API_URL}?user=${user}`);
    }

    getAggregate(): Observable<any> {
      return this.http.get('http://localhost:8080/api/test/all/aggregate');
  }

}