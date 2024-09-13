import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

interface Product {
  reference: string;
  instagramName: string;
  productName: string;
  productImage: string;
  supplierName: string;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  methodePaiement?: string;
  telephone?: string; 
  adresseLivraison?: string; 
  quantite?: number;
}

@Component({
  selector: 'app-demande-echantillon',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, DropdownModule, DialogModule,ButtonModule],
  templateUrl: './demande-echantillon.component.html',
  styleUrls: ['./demande-echantillon.component.css']
})
export class DemandeEchantillonComponent {
  @ViewChild('dt') dt!: Table;

  products: Product[] = [];
  initialValue: Product[] = [];
  isSorted: boolean = false;

  deleteDialogVisible: boolean = false;
  addDialogVisible: boolean = false;
  userIdToDelete: string | null = null;
  selectedPayment: string = '';
  selectedProduct: Product | null = null;
  editDialogVisible: boolean = false;
  filteredProducts: Product[] = []; 


  statusOptions: SelectItem[] = [
    { label: 'En attente de validation', value: 'En attente de validation' },
    { label: 'En cours de traitement', value: 'En cours de traitement' },
    { label: 'En cours de livraison', value: 'En cours de livraison' },
    { label: 'Livrée', value: 'Livrée' },
    { label: 'Annulée', value: 'Annulée' }
  ];
  paymentOptions = [
    { label: 'par espèces', value: 'espèces' },
    { label: 'par chèques', value: 'chèques' },
    { label: 'par carte bancaire', value: 'carte_bancaire' },
    { label: 'Virement', value: 'virement' }
  ];
  selectedStatus: string | null = null;
  newEntry: Product = {
    reference: '',
    instagramName: '',
    productName: '',
    productImage: '',
    supplierName: '',
    totalPrice: 0,
    paymentStatus: '',
    status: '',
    methodePaiement: '',
    telephone: '',
    adresseLivraison: '',
    quantite: 0
  };

   // Déclarations des nouveaux filtres
   filterNomInstagrammeur: string = '';
   filterNomFournisseur: string = '';
   filterNomProduit: string = '';
   filterPrixTotal: number | null = null;

  ngOnInit() {
    this.products = [
      {
        reference: 'REF001',
        instagramName: 'InstagramUser1',
        productName: 'Crème Hydratante SVR',
        productImage: 'assets/images/product1.jpg',
        supplierName: 'Fournisseur A',
        totalPrice: 120,
        paymentStatus: 'Payé',
        status: ''
      },
      {
        reference: 'REF002',
        instagramName: 'InstagramUser2',
        productName: 'Shampooing Anti-Chute',
        productImage: 'assets/images/product2.jpg',
        supplierName: 'Fournisseur B',
        totalPrice: 80,
        paymentStatus: 'En attente',
        status: ''
      },
      {
        reference: 'REF003',
        instagramName: 'InstagramUser3',
        productName: 'Lotion Tonique',
        productImage: 'assets/images/product3.jpg',
        supplierName: 'Fournisseur C',
        totalPrice: 60,
        paymentStatus: 'Non payé',
        status: ''
      },
      {
        reference: 'REF004',
        instagramName: 'InstagramUser4',
        productName: 'Sérum Anti-Âge',
        productImage: 'assets/images/product4.jpg',
        supplierName: 'Fournisseur D',
        totalPrice: 150,
        paymentStatus: 'Payé',
        status: ''
      },
      {
        reference: 'REF005',
        instagramName: 'InstagramUser5',
        productName: 'Gel Nettoyant Purifiant',
        productImage: 'assets/images/product5.jpg',
        supplierName: 'Fournisseur E',
        totalPrice: 45,
        paymentStatus: 'En attente',
        status: ''
      },
      {
        reference: 'REF006',
        instagramName: 'InstagramUser6',
        productName: 'Crème Nourrissante',
        productImage: 'assets/images/product6.jpg',
        supplierName: 'Fournisseur F',
        totalPrice: 95,
        paymentStatus: 'Non payé',
        status: ''
      },
      {
        reference: 'REF007',
        instagramName: 'InstagramUser7',
        productName: 'Masque Hydratant',
        productImage: 'assets/images/product7.jpg',
        supplierName: 'Fournisseur G',
        totalPrice: 70,
        paymentStatus: 'Payé',
        status: ''
      },
      {
        reference: 'REF008',
        instagramName: 'InstagramUser8',
        productName: 'Crème Solaire SPF50',
        productImage: 'assets/images/product8.jpg',
        supplierName: 'Fournisseur H',
        totalPrice: 35,
        paymentStatus: 'En attente',
        status: ''
      }
    ];

    this.initialValue = [...this.products];
    this.filteredProducts = this.filterProducts(); 
  }

// Méthode de filtrage adaptée
filterProducts(): Product[] {
  return this.initialValue.filter(product => {
    return (
      (this.filterNomInstagrammeur ? product.instagramName.toUpperCase().includes(this.filterNomInstagrammeur.toUpperCase()) : true) &&
      (this.filterNomFournisseur ? product.supplierName.toUpperCase().includes(this.filterNomFournisseur.toUpperCase()) : true) &&
      (this.filterNomProduit ? product.productName.toUpperCase().includes(this.filterNomProduit.toUpperCase()) : true) &&
      (this.filterPrixTotal != null ? product.totalPrice === this.filterPrixTotal : true)
    );
  });
}

// Appel de la fonction de filtrage pour mettre à jour filteredProducts
applyFilters() {
  this.filteredProducts = this.filterProducts();
}

// Appel de applyFilters lors du changement de valeur de filtre
onFilterChange() {
  this.applyFilters();
}



   // Ajout de la méthode onEdit
   onEdit(productId: string): void {
    this.selectedProduct = this.products.find(product => product.reference === productId) || null;
    console.log('Produit sélectionné:', this.selectedProduct);
    this.editDialogVisible = true;
  }

  // Affiche la boîte de dialogue d'ajout
  showAddDialog(): void {
    this.resetNewEntry();
    this.addDialogVisible = true;
  }
  // Ajoute une nouvelle entrée et ferme la boîte de dialogue
  addEntry(): void {
    const newId = Math.max(...this.products.map((entry) => parseInt(entry.reference.replace('REF', '')))) + 1;
    const newProduct: Product = { ...this.newEntry, reference: `REF${newId}` };
    this.products.push(newProduct);
    this.initialValue = [...this.products];
    this.resetNewEntry();
    this.addDialogVisible = false;
  }
 // Méthode appelée lorsqu'on clique sur l'icône
 onAdd(productId: number): void {
  this.showAddDialog(); // Affiche la boîte de dialogue
}
  // Réinitialise les champs du formulaire
  resetNewEntry(): void {
    this.newEntry = {
      reference: '',
      instagramName: '',
      productName: '',
      productImage: '',
      supplierName: '',
      totalPrice: 0,
      paymentStatus: '',
      status: '',
      methodePaiement: '',
      telephone: '',
      adresseLivraison: '',
      quantite: 0
    };
  }

  // Annule l'ajout d'une nouvelle entrée et ferme la boîte de dialogue
  cancelAdd(): void {
    this.resetNewEntry();
    this.addDialogVisible = false;
  }

  // Affiche la boîte de dialogue de suppression
  showDeleteDialog(productId: string): void {
    this.userIdToDelete = productId;
    this.deleteDialogVisible = true;
  }

  confirmDelete(): void {
    console.log('User ID to delete:', this.userIdToDelete);
    if (this.userIdToDelete !== null) {
      this.products = this.products.filter((product) => product.reference !== this.userIdToDelete);
      this.userIdToDelete = null;
    }
    this.deleteDialogVisible = false;
  }
  

  // Annule l'action de suppression
  cancelDelete(): void {
    this.userIdToDelete = null;
    this.deleteDialogVisible = false;
  }

  // Fonction de tri personnalisée
  customSort(event: SortEvent) {
    if (!this.isSorted) {
      this.isSorted = true;
      this.sortTableData(event);
    } else {
      this.isSorted = false;
      this.products = [...this.initialValue];
      this.dt.reset();
    }
  }

  // Fonction de tri des données
  sortTableData(event: SortEvent) {
    const field = event.field as string;
    const order = event.order !== undefined ? event.order : 1;

    if (!field) {
      console.error('Field is undefined or not a string');
      return;
    }

    this.products.sort((data1:any, data2:any) => {
      const value1 = data1[field];
      const value2 = data2[field];
      let result: number;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = (value1 < value2 ? -1 : (value1 > value2 ? 1 : 0));

      return order * result;
    });
  }

  // Fonction d'application du filtre
  applyFilter(event: any) {
    const selectedStatus = event.value;
    if (selectedStatus) {
      this.products = this.initialValue.filter(product => product.status === selectedStatus);
    } else {
      this.products = [...this.initialValue];
    }
  }

  // Gestion de la suppression après confirmation
  onDelete(productId: string): void {
    this.showDeleteDialog(productId);
  }
 
  applyPaymentFilter(event: any) {
    const selectedPayment = event.value;
    console.log('Mode de paiement sélectionné:', selectedPayment);
    // Ajouter ici la logique pour filtrer ou appliquer l'action en fonction du paiement
  }
  showEditDialog(productId: string): void {
    this.selectedProduct = this.products.find(product => product.reference === productId) || null;
    console.log('Produit sélectionné:', this.selectedProduct); 
    this.editDialogVisible = true;
  }

  saveChanges(): void {
    if (this.selectedProduct) {
      const index = this.products.findIndex(product => product.reference === this.selectedProduct?.reference);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct };
        this.editDialogVisible = false;
      } else {
        console.error(`Produit avec la référence ${this.selectedProduct.reference} non trouvé.`);
      }
    } else {
      console.error('Aucun produit sélectionné pour l\'édition.');
    }
  }
  

  cancelEdit(): void {
    this.selectedProduct = null;
    this.editDialogVisible = false;
  }
}

  

