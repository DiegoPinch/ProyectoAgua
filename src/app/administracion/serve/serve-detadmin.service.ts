import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServeDetadminService {

  private myAppUrl: string;
  private myApyUrl: string;
  private phpUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/detalledirectivas/';
    this.phpUrl ='http://localhost:8085/servicio/buscar.php'
  }

  getAdministracion(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApyUrl);
  }
  getAdministracionPhp(): Observable<any> {
    return this.http.get(this.phpUrl);
  }
  postAdministracion(directivaDatas: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApyUrl}`, directivaDatas);
  }

  deleteAdminstracion(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApyUrl + id)
  }
}
