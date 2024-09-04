import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

// Interface Product avec lien à la place de nomPageInstagram
interface Product {
  id:number,
  nomBoutique: string;
  imageUrl: string;
  nomInstagrammeur: string;
  lien: string; 
}

@Component({
  selector: 'app-gestion-boutique',
  standalone: true,
  imports: [TableModule, CommonModule, FormsModule , DialogModule],
  templateUrl: './gestion-boutique.component.html',
  styleUrls: ['./gestion-boutique.component.css'], 
})
export class GestionBoutiqueComponent {
  @ViewChild('dt') dt!: Table;

  products: Product[] = [];
  initialValue: Product[] = [];
  isSorted: boolean | null = null;
  confirmationDialogVisible = false;
  actionType = '';
  newProduct: Product = {
    id:0,
    nomBoutique: '',
    imageUrl: '',
    nomInstagrammeur: '',
    lien: '', 
  };

  selectedFile: File | null = null;
  isAddFormVisible: boolean = false;
  ajoutDialogue : boolean = false;
  selectedProduct : any ={};
  ngOnInit() {
    this.products = [
      {id:1,nomBoutique: 'Boutique A', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur A', lien: 'https://instagram.com/PageA' },
      {id:2,nomBoutique: 'Boutique B', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur B', lien: 'https://instagram.com/PageB' },
      {id:3,nomBoutique: 'Boutique C', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur C', lien: 'https://instagram.com/PageC' },
      {id:3,nomBoutique: 'Boutique D', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur D', lien: 'https://instagram.com/PageD' },
      {id:4,nomBoutique: 'Boutique E', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur E', lien: 'https://instagram.com/PageE' },
      {id:5,nomBoutique: 'Boutique F', imageUrl: './../../assets/air.jpeg', nomInstagrammeur: 'Instagrammeur F', lien: 'https://instagram.com/PageF' },
    ];
    this.initialValue = [...this.products];
  }

  toggleAddForm(): void {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  




  onSubmit(): void {
    if (this.newProduct.nomBoutique && this.newProduct.nomInstagrammeur && this.newProduct.lien) {
      // Ajout du nouveau produit à la liste des produits
      this.products.push({
        ...this.newProduct,
        imageUrl: this.newProduct.imageUrl || './../../assets/air.jpeg',
        id:this.products.length
      });
  
      // Réinitialiser le formulaire et fermer le dialogue
      this.resetForm();
      this.isAddFormVisible = false;
      this.ajoutDialogue = false;
  
      console.log('Produit ajouté avec succès');
    } else {
      console.error('Tous les champs doivent être remplis et une image doit être sélectionnée.');
    }
  }
  
  onAddClick(): void {
    this.ajoutDialogue = true;  }

    onCancel(): void {
      this.selectedProduct = {}; 
      this.isAddFormVisible = false; 
      console.log('Édition annulée');
    }

  // Méthode pour afficher la boîte de dialogue de confirmation
  showConfirmationDialog(action: string): void {
    this.actionType = action;
    this.confirmationDialogVisible = true;
  }

  // Méthode pour confirmer l'action
  confirmAction(): void {
    if (this.actionType === 'Enregistrer') {
      this.onSave();
    } else if (this.actionType === 'Supprimer') {
      this.confirmDelete();
    }
    this.confirmationDialogVisible = false;
  }

  // Méthode pour annuler l'action
  cancelAction(): void {
    this.confirmationDialogVisible = false;
  }

  // Méthode pour afficher la boîte de dialogue de confirmation pour la suppression
  onDelete(product: Product): void {
    this.selectedProduct = product; // Stocker le produit à supprimer
    this.showConfirmationDialog('Supprimer'); // Afficher la boîte de dialogue de confirmation
  }

  // Méthode pour confirmer la suppression du produit
  confirmDelete(): void {
    if (this.selectedProduct) {
      this.products = this.products.filter((product: Product) => product.id !== this.selectedProduct!.id);
      this.selectedProduct = {};
      console.log('Produit supprimé avec succès');
    } else {
      console.error('Aucun produit sélectionné pour la suppression.');
    }
    this.confirmationDialogVisible = false;
  }

    onSave(): void {
      // Vérifiez si tous les champs sont remplis
      if (this.newProduct.nomBoutique && this.newProduct.nomInstagrammeur && this.newProduct.lien) {
        // Ajout du produit à la liste des produits
        this.products.push({
          ...this.newProduct,
          imageUrl: this.newProduct.imageUrl || '' // Utiliser l'URL de l'image ou une chaîne vide
        });
    
        // Réinitialiser le formulaire
        this.resetForm();
    
        // Fermer le formulaire et le dialogue
        this.isAddFormVisible = false;
        this.ajoutDialogue = false;
        
        console.log('Produit ajouté avec succès');
      } else {
        console.error('Tous les champs doivent être remplis.');
      }
    }
    onCancelADD(): void {
      console.log('Édition annulée');
      this.ajoutDialogue = false;
    }

  private resetForm(): void {
    this.newProduct = {
      id:0,
      nomBoutique: '',
      imageUrl: '',
      nomInstagrammeur: '',
      lien: '', // Réinitialisation du lien
    };
    this.selectedFile = null;
  }

  customSort(event: SortEvent) {
    if (this.isSorted === null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted === true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted === false) {
      this.isSorted = null;
      this.products = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    if (event.data && event.field) {
      event.data.sort((data1, data2) => {
        const value1 = data1[event.field as keyof Product];
        const value2 = data2[event.field as keyof Product];
        let result: number;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        const order = event.order !== undefined ? event.order : 1;

        return order * result;
      });
    }
  }

  onEdit(product:any)
  {
    this.selectedProduct = product;

    this.isAddFormVisible = true;
  }

  saveEdit(): void {
    if (this.selectedProduct) {
      const index = this.products.findIndex((user:any) => user.id === this.selectedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct };
        this.isAddFormVisible = false;

      } else {
        console.error(`Utilisateur avec l'ID ${this.selectedProduct.id} non trouvé.`);
      }
    } else {
      console.error('Aucun utilisateur sélectionné ou ID non défini.');
    }
  }
}


  