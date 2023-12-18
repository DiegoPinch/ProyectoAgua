import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiceObtenerFacService {
  private fecha!: string;
  private myAppUrl: string;
  private myApyUrl: string;
  private myApyActFacturaporlectura: string;
  private myApyUrlImprimir: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyActFacturaporlectura = 'api/facturas/update'
    this.myApyUrl = 'api/facturas/';
    this.myApyUrlImprimir = 'api/imp/generar-factura';
  }
  
  getFacturas(cedula: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrl}/${cedula}`);
  }
  
  putFacturas( id: number): Observable<any> {
    this.fecha= '2023-11-09';
    const body = { FEC_PAGO: this.fecha };
    return this.http.put(`${this.myAppUrl}${this.myApyUrl}/${this.fecha}/${id}`, body);
  }

  putFacturasForlecture( exceso:number,total: number, id: number): Observable<any> {
    const body = { EXC_LECTURA: exceso,
                  SUM_TOTAL: total};
    return this.http.put(`${this.myAppUrl}${this.myApyActFacturaporlectura}/${exceso}/${total}/${id}`, body);
  }

  postFacturas(facturaDatas: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, facturaDatas);
  }

  getImprimirFacturas(cedula: string, mes: string, tipo:string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApyUrlImprimir}/${cedula}/${mes}/${tipo}`,{ responseType: 'blob' });
  }
}
