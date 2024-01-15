import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ServiciosService } from '../service/servicios.service';

@Component({
  selector: 'gst-dashfacturas',
  templateUrl: './dashfacturas.component.html',
  styleUrls: ['./dashfacturas.component.css']
})
export class DashfacturasComponent implements OnInit, OnDestroy {

  public chart: Chart;
  public chartUno: Chart;
  selectedTipo: string = 'CONSUMO-RIEGO';
  optionsT: string[] = ['CONSUMO-RIEGO', 'CONSUMO', 'RIEGO'];
  selectedEstado: string = 'PAGADO';
  optionsE: string[] = ['PAGADO', 'PENDIENTE'];
  selectedAnio: string = '2024';
  optionsA: string[] = ['2023', '2024', '2025', '2026', '2027', '2028', '2029'];
  showSpinner: boolean = false;

  ngOnInit(): void {
    this.cargarDatos();
    const dataUno = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Creamos la gráfica
    this.chartUno = new Chart("chartUno", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: dataUno // datos 
    })
  }

  constructor(private _servDash: ServiciosService) { }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  cargarDatos() {
    this.showSpinner = true; 
    if (this.selectedTipo === 'CONSUMO-RIEGO'){
        this.dashboardGeneral();
    }else{
      this._servDash.getDashboard(this.selectedEstado, this.selectedAnio, this.selectedTipo).subscribe((data: any) => {
        this.showSpinner = false; 
        const monthOrder = {
          'ENERO': 1, 'FEBRERO': 2, 'MARZO': 3, 'ABRIL': 4, 'MAYO': 5, 'JUNIO': 6, 'JULIO': 7, 'AGOSTO': 8,
          'SEPTIEMBRE': 9, 'OCTUBRE': 10, 'NOVIEMBRE': 11, 'DICIEMBRE': 12
        };
  
        data.sort((a, b) => {
          const monthA = a.mesConsumo.split('-')[1];
          const monthB = b.mesConsumo.split('-')[1];
          return monthOrder[monthA] - monthOrder[monthB];
        });
  
        const labels = data.map(entry => entry.mesConsumo);
        const values = data.map(entry => entry.TotalFacturas);
        const totalFacturas = values.reduce((a, b) => a + b, 0);
  
        this.destroyChart(); // Destruye el gráfico existente antes de crear uno nuevo
  
        const chartData = {
          labels: labels,
          datasets: [{
            label: 'Valor',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            barPercentage: 0.5,
            barThickness: 30,
            categoryPercentage: 0.5,
          }]
        };
  
        this.chart = new Chart('chart', {
          type: 'bar' as ChartType,
          data: chartData,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Valor Total' + totalFacturas + '$',
                font: {
                  size: 15,
                },
                align: 'end',
              }
            }
          }
        });
      });
    }
   
  }

  dashboardGeneral(){
    this.showSpinner = true; 
    this._servDash.getDashboardGeneral(this.selectedEstado, this.selectedAnio).subscribe((data: any) => {
      this.showSpinner = false; 
      const monthOrder = {
        'ENERO': 1, 'FEBRERO': 2, 'MARZO': 3, 'ABRIL': 4, 'MAYO': 5, 'JUNIO': 6, 'JULIO': 7, 'AGOSTO': 8,
        'SEPTIEMBRE': 9, 'OCTUBRE': 10, 'NOVIEMBRE': 11, 'DICIEMBRE': 12
      };

      data.sort((a, b) => {
        const monthA = a.mesConsumo.split('-')[1];
        const monthB = b.mesConsumo.split('-')[1];
        return monthOrder[monthA] - monthOrder[monthB];
      });

      const labels = data.map(entry => entry.mesConsumo);
      const values = data.map(entry => entry.TotalFacturas);
      const totalFacturas = values.reduce((a, b) => a + b, 0);

      this.destroyChart(); // Destruye el gráfico existente antes de crear uno nuevo

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Valor',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          barPercentage: 0.5,
          barThickness: 30,
          categoryPercentage: 0.5,
        }]
      };

      this.chart = new Chart('chart', {
        type: 'bar' as ChartType,
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Valor Total: ' + totalFacturas + '$',
              font: {
                size: 15,
              },
              align: 'end',
            }
          }
        }
      });
    });
  }
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}