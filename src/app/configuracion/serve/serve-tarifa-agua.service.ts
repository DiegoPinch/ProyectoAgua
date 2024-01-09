import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServeTarifaAguaService {

  private myAppUrl: string;
  private myApiUrlTarifasAgua: string;
  private myApiUrlTarifasAguaConsumo: string;
  private myApiUrlTarifasAguaRiego: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrlTarifasAgua = 'api/tarifaagua'; // Ruta de las tarifas de agua en tu backend
    this.myApiUrlTarifasAguaConsumo = 'api/tarifaagua/consumo';
    this.myApiUrlTarifasAguaRiego = 'api/tarifaagua/riego';
  }

  getTarifasAgua(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAgua}`);
  }

  getTarifasRiego(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAguaRiego}`);
  }

  getTarifasConsumo(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAguaConsumo}`);
  }

  getTarifaAgua(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAgua}${id}`);
  }

  crearTarifaAgua(tarifa: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrlTarifasAgua}`, tarifa);
  }

  actualizarTarifaAgua(id: number, basico: number, exceso: number, met_cubicos: number): Observable<any> {
    const body = { basico, exceso, met_cubicos }; 
    return this.http.put(`${this.myAppUrl}${this.myApiUrlTarifasAgua}/${id}`, body);
  }

  eliminarTarifaAgua(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrlTarifasAgua}${id}`);
  }

}
