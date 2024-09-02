import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

  

@Component({
  selector: 'app-achats-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './achats-pie-charts.component.html',
  styleUrls: ['./achats-pie-charts.component.css']
})
export class AchatsPieChartComponent {

  public pieChartData: number[] = [30, 50, 20]; 
  public pieChartLabels: string[] = ['Taux de Rebond', 'Taux d\'Abandon de Panier', 'Actes d\'Achat'];
  public pieChartColors = [
    {
      backgroundColor: [ 'rgba(193, 53, 132, 0.2)', 'rgba(255, 45, 85, 0.2)', 'rgba(255, 0, 150, 0.2)'], 
      borderColor: [
        'rgba(193, 53, 132, 1)',  
        'rgba(255, 45, 85, 1)',   
        'rgba(255, 0, 150, 1)'    
      ]  
    },
  ];
  public pieChartType: string = 'pie';
  chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables); 
      this.createDoughnutChart();
    }
  }

   createDoughnutChart(): void {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Taux de Rebond', 'Taux d\'Abandon de Panier', 'Actes d\'Achat'],
          datasets: [{
            label: 'Distribution',
            data: [30, 50, 20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        }
      });
    }
}
}


            