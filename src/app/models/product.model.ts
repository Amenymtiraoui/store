export interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    stock: number;
    status: string; // 'En stock', 'Rupture de stock', 'Stock bas'
    totalSales: number; // Chiffre d'affaires total
  }