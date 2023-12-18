import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Persona } from './interfaces/persona';



@Injectable({
  providedIn: 'root'
})
export class ServpersonaService {

  private myAppUrl: string;
  private myApyUrl: string;
  private myAppEliminar: string;
  private myAppPasivos: string;
  private myAppReingreso: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/personas/';
    this.myAppPasivos = 'api/personas/personaPasivos';
    this.myAppEliminar = 'api/personas/eliminar/'
    this.myAppReingreso = 'api/personas/reingreso/'
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.myAppUrl + this.myApyUrl);
  }
  getPersonaNormal(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApyUrl);
  }
  getPersonasPasivos(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myAppPasivos);
  }
  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApyUrl + id)
  }

  addPersona(personaData: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, personaData);
  }

  editPersona(cedula: string, personaData: Persona): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApyUrl}${cedula}`, personaData);
  }

  eliminarPersona(cedula: string): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myAppEliminar}${cedula}`, null);
  }

  reingresoPersona(cedula: string): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myAppReingreso}${cedula}`, null);
  }
  
}
