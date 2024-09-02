import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart , registerables} from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../models/product.model';
import { AchatsPieChartComponent } from '../../achats-pie-charts/achats-pie-charts.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,AchatsPieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards = [
    { 
      title: 'Nombre de téléchargements',
      image: './../../../assets/download.png',
      description: '1.2K téléchargements' // Exemple de valeur pour les téléchargements
    },
    { 
      title: 'Chiffre d\'affaire',
      image: './../../../assets/images.png',
      description: '60 000 Dinars' // Exemple de valeur pour le chiffre d'affaire
    },
    { 
      title: 'Nombre de visites',
      image: './../../../assets/visit.png',
      description: '4000 visites (+500 ce mois-ci)' // Exemple de valeur pour les visites
    },
    { 
      title: 'Nombre de commandes',
      image: './../../../assets/commande.png',
      description: '250 commandes (+30 par rapport au mois dernier)'
       // Exemple de valeur pour les commandes
    }
  ];
  products: Product[] = [
     { id: 1, image: './../../../assets/parfum.jpeg', name: 'Parfum d\'ambiance', price: 64, stock: 10, status: 'En stock',totalSales : 7936 },
    { id: 2, image: './../../../assets/espa.jpeg', name: 'Espadrille', price: 80, stock: 0, status: 'Rupture de stock', totalSales: 980 },
    { id: 3, image: './../../../assets/séche.jpeg', name: 'Séche cheveux', price: 25, stock: 5, status: 'En stock', totalSales: 1850 },
    { id: 4, image: './../../../assets/écran.png', name: 'Ecran solaire', price: 32, stock: 3, status: 'Stock bas', totalSales: 2000 },
    { id: 5, image: './../../../assets/air.jpeg', name: 'Airpods Pro', price: 79, stock: 8, status: 'En stock', totalSales: 3239 }
  ];

  private currentFilter: string = 'Aujourd\'hui';

  

  private chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables); 
      this.createChart();
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Orders per Month',
              data: [10, 12, 15, 22, 28, 35, 40, 45, 50, 55, 60, 70],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.1
            }
          ]
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
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Month'
              },
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Orders'
              },
              grid: {
                display: true
              }
            }
          }
        }
      });
    }
  }
}


