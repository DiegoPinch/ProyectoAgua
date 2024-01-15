import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private myAppUrl: string;
  private myApyUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/dashboard/';
  }

  
  getDashboard(estado: string, anio: string, type: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}${estado}/${anio}/${type}`);
  }

  getDashboardGeneral(estado: string, anio: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}${estado}/${anio}`);
  }

}
