import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServlecturasService {

  private myAppUrl: string;
  private myApyUrl: string;
  private myAppiget: string;
  private myappVerificarLectura: string;
  private lastLecture: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/lecturas/';
    this.myAppiget = 'api/lecturas/ingresolectura';
    this.myappVerificarLectura = 'api/lecturas/verificarlectura';
    this.lastLecture = 'api/lecturas/ultimalectura'
  }

  //OBTENER LAS LECTURAS ANTERIOR QUE VENDRIA A SER LEC ACT
  getLecturaActual(cedula: string, tipo: string, mes: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}/${cedula}/${tipo}/${mes}`);
  }
  //obtener todas las lecturas
  getLecturas(tipo: string, mes: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}/${tipo}/${mes}`);
  }
  //obtener todas las lecturas
  getultimaLecturaInsertada(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.lastLecture}/${id}`);
  }
  //para obtener los datos de las personas con tipos de medidores (CONSUMO RIEGO)
  getPersonaMedidor(tipo: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}${tipo}`);
  }
  //obtener lectura del ingreso del medidor
  getLecturaIngresoMedidor(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myAppiget}/${id}`);
  }
  verificarLecturaExistente(mes: string, id: number,): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myappVerificarLectura}/${mes}/${id}`);
  }
  //INESERTAR LECTURAS
  postLecturas(lecturaAnterior: number, lecturaActual: number, fecha: string, mes: string, medidor: number): Observable<any> {
    const body = {
      LEC_ANT: lecturaAnterior,
      LEC_ACT: lecturaActual,
      FEC_ING_LEC: fecha,
      MES_CON: mes,
      ID_MED_LEC: medidor
    };
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, body);
  }
  putLectura(lectura: number, id: number): Observable<any> {
    const body = { LEC_ACT: lectura };
    return this.http.put(`${this.myAppUrl}${this.myApyUrl}/${lectura}/${id}`, body);
  }
}
