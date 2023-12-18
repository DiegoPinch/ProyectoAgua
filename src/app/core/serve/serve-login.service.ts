import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServeLoginService {
  private myAppUrl: string;
  private myApyUrl: string;
  private myApyUrlusaurios: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApyUrl = 'api/loginadministracion/'; 
    this.myApyUrlusaurios = 'api/loginusuarios/';
  }
  
  async obtenerAdministracion(cedula: string, contra: string): Promise<any> {
    try {
      const response = await this.http.get(`${this.myAppUrl}${this.myApyUrl}${cedula}/${contra}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener administración', error);
      throw error; 
    }
  }

  async obtenerCliente(cedula: string, contra: string): Promise<any> {
    try {
      const response = await this.http.get(`${this.myAppUrl}${this.myApyUrlusaurios}/${cedula}/${contra}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener cliente login', error);
      throw error; 
    }
  }
 
}
