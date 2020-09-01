import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { model } from '../leaderboard/model';

const API_URL = 'http://192.168.2.19:8080/api/test/all/stats';

@Injectable({
  providedIn: 'root'
})

export class StatsService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(API_URL);
    }

    public leaderboard(): Observable<model[]> {
      return this.http.get<model[]>(API_URL)
    }

    get(id): Observable<any> {
        return this.http.get(`${API_URL}/${id}`);
    }

    findByUser(user): Observable<any> {
      return this.http.get(`${API_URL}?user=${user}`);
    }

    getAggregate(): Observable<any> {
      return this.http.get('http://192.168.2.19:8080/api/test/all/aggregate');
  }

}