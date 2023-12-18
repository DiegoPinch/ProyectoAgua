import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActasService {

  private myAppUrl: string;
  private myApyUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/actas/';
  }

  getActas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApyUrl);
  }

  postActas(actaDatas: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, actaDatas);
  }

  deleteActas(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApyUrl + id)
  }
}
