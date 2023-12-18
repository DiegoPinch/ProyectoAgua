import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechahoraService {

  private apiUrl = 'http://worldtimeapi.org/api/ip'; // Esta URL proporciona la hora basada en la IP del cliente

  constructor(private http: HttpClient) {}

  obtenerFechaHoraActual(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
