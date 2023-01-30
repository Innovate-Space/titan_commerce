import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkHelperService {
  BASE_URL = "https://fakestoreapi.com";

  constructor(private readonly http: HttpClient) { }

  post<T, B>(path: string, body: B): Observable<T>{
    const url = this.BASE_URL + path
    return this.http.post<T>(url, body)
  }

  get<T>(path: string): Observable<T>{
    const url = this.BASE_URL + path
    return this.http.get<T>(url)
  }
  
}
