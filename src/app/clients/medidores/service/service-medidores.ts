import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiceMedidores {
  private fecha!: string;
  private myAppUrl: string;
  private myApyUrl: string;
  private myApiEliminar: string;
  private myApiEditar: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/medidores/';
    this.myApiEliminar = 'api/medidores/delete';
    this.myApiEditar = 'api/medidores/update';
  }
  
  getMedidores(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}`);
  }

  getVerificarMedidor(id: number, tipo: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}/${id}/${tipo}`);
  }

  eliminarMedidor(id: number): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiEliminar}/${id}`, null);
  }

  editarMedidor(id: number, datosMedidor: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiEditar}/${id}`, datosMedidor);
  }

  ingresarMedidor(datosMedidor: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, datosMedidor);
  }
  
}
