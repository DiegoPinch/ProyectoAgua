import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServeTarifaAguaService } from '../serve/serve-tarifa-agua.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'gst-conf-tarifagua',
  templateUrl: './conf-tarifagua.component.html',
  styleUrls: ['./conf-tarifagua.component.css']
})
export class ConfTarifaguaComponent {
 
  showSpinner: boolean = false;
  dataSource: any[] = [];
  columnas: string[] = ['tip_serv', 'basico', 'exceso','met_cubicos', 'fec_crea', 'fec_upda', 'editar'];

  filaSeleccionada: any | null = null;
  estaEditando = false;
  miFormulario!: FormGroup;
  constructor(private serveTarifaAguaService: ServeTarifaAguaService) {
    this.cargarDatos();
    
  }

  cargarDatos(): void {
    this.showSpinner = true;
    this.serveTarifaAguaService.getTarifasAgua().subscribe(
      (datos) => {
        this.dataSource = datos;
        this.showSpinner = false;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  editarFilaSeleccionada(fila: any): void {
    this.filaSeleccionada = { ...fila }; // Copia los datos de la fila seleccionada para edición
    this.estaEditando = true;
  }

  guardarEdicion(): void {
    this.showSpinner = true;
    if (this.filaSeleccionada) {
      const { id, basico, exceso, met_cubicos } = this.filaSeleccionada;
      this.serveTarifaAguaService.actualizarTarifaAgua(id, basico, exceso, met_cubicos).subscribe(
        (datos) => {
          this.cargarDatos();
          this.cancelarEdicion();
          this.obtenerValorConsumo()
          this.obtenerValorRiego()
          this.showSpinner = false;
        },
        (error) => {
          console.error('Error al actualizar datos:', error);
        }
      );
    } else {
      console.error('No hay fila seleccionada para editar');
    }
  }
  
  obtenerValorConsumo() {
    this.serveTarifaAguaService.getTarifasConsumo().subscribe(
      (tarifas) => {
        localStorage.setItem('tarifaConsumo', JSON.stringify(tarifas));
      },
      (error) => {
        console.error('Error al obtener las tarifas:', error);
      }
    );
  }

  obtenerValorRiego() {
    this.serveTarifaAguaService.getTarifasRiego().subscribe(
      (tarifas) => {
        localStorage.setItem('tarifaRiego', JSON.stringify(tarifas));
      },
      (error) => {
        console.error('Error al obtener las tarifas:', error);
      }
    );
  }

  cancelarEdicion(): void {
    this.filaSeleccionada = null;
    this.estaEditando = false;
  }
  
  formularioValido(): boolean {
    return !!this.filaSeleccionada.tip_serv && !!this.filaSeleccionada.basico && !!this.filaSeleccionada.exceso && !!this.filaSeleccionada.met_cubicos;
  }

  validarInput(event: Event, campo: string) {
    const input = event.target as HTMLInputElement;
    const regex = /^\d+(\.\d+)?$/; // Expresión regular que permite dígitos y un punto decimal opcional
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9.]/g, '');
      this.filaSeleccionada[campo] = input.value;
    }
  }
}
