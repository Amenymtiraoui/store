import { Component, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService  } from 'primeng/api'; 
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-instagrammeurs',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, DialogModule, ButtonModule, DropdownModule],
  templateUrl: './instagrammeurs.component.html',
  styleUrl: './instagrammeurs.component.css',
  providers: [ConfirmationService]
})
export class InstagrammeursComponent {
  @ViewChild('dt') dt!: Table;
  deleteDialogVisible: boolean = false;
  editDialogVisible: boolean = false;
  addDialogVisible: boolean = false;
  userIdToDelete: number | null = null;
  selectedUser: any = {};
  newUser: any = {
    image: '',
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    instagram: '',
  };
  statuses: SelectItem[] = [
    { label: 'Actif', value: 'actif' },
    { label: 'Inactif', value: 'inactif' },
    { label: 'Suspendu', value: 'suspendu' },
    { label: 'Bloqué', value: 'bloqué' },
    { label: 'En attente de suppression', value: 'en attente de suppression' }
  ];

  selectedStatus: string | null = null; // Valeur sélectionnée pour le filtre
  filterValue: string = ''; // Valeur du filtre de recherche

  // Fonction pour réinitialiser le filtre
  resetFunction(options: any) {
    this.filterValue = '';
    this.selectedStatus = null;
  }

  // Fonction de filtrage personnalisée
  customFilterFunction(event: KeyboardEvent, options: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implémentez ici la logique de filtrage personnalisée si nécessaire
  }
  users : any =[
    {
      id: 1,
      nom: 'Ben Ali',
      prenom: 'Khaled',
      adresse:  '75 Rue des Palmiers, Sousse, Tunisie',
      telephone: '+216 71 234 567',
      instagram: 'https://instagram.com/khaledbenali',
      email:  'khaled.benali@example.com',
      motdepasse: 'password123', 
    },
    {
      id: 2,
      nom: 'Jaziri',
      prenom: 'Amira',
      adresse: '25 Avenue Habib Bourguiba, Sfax, Tunisie',
      telephone: '+216 74 567 890',
      instagram: 'https://instagram.com/amirajaziri',
      email: 'amira.jaziri@example.com',
      motdepasse: 'securePass456'
    },
    {
      id: 3,
      nom: 'Hadad',
      prenom: 'Rami',
      adresse:  '50 Boulevard de la République, Bizerte, Tunisie',
      telephone:  '+216 72 345 678',
      instagram: 'https://instagram.com/ramihaddad',
      email:'rami.haddad@example.com',
      motdepasse: 'password789'
    },
    {
      id: 4,
      nom: 'Sghaier',
      prenom: 'Sofia',
      adresse: '10 Rue de la Liberté, Tunis, Tunisie',
      telephone: '+216 73 456 789',
      instagram:'https://instagram.com/sofiasghaier',
      email: 'sofia.sghaier@example.com',
      motdepasse: 'myPass123'
    },
    {
      id: 5,
      nom: 'Mghirbi',
      prenom: 'Sami',
      adresse: '12 Rue de la Gare, Monastir, Tunisie',
      telephone: '+216 73 567 890',
      instagram: 'https://instagram.com/samimghirbi',
      email: 'sami.mghirbi@example.com',
      motdepasse: 'samiPass789'
    },
    {
      id: 6,
      nom: 'Ghani',
      prenom: 'Yasmine',
      adresse: '85 Avenue de la Liberté, La Marsa, Tunisie',
      telephone: '+216 71 345 678',
      instagram: 'https://instagram.com/yasmineghani',
      email: 'yasmine.ghani@example.com',
      motdepasse: 'yasminePass456'
    },
    {
      id: 7,
      nom: 'Roussi',
      prenom: 'Amir',
      adresse: '22 Rue de l’Indépendance, Gabès, Tunisie',
      telephone: '+216 75 456 789',
      instagram: 'https://instagram.com/amirroussi',
      email: 'amir.roussi@example.com',
      motdepasse: 'amirPass123'
    },
    {
      id: 8,
      nom: 'Fekih',
      prenom: 'Leila',
      adresse: '30 Avenue Bourguiba, Nabeul, Tunisie',
      telephone: '+216 72 567 890',
      instagram: 'https://instagram.com/leilafekih',
      email: 'leila.fekih@example.com',
      motdepasse: 'leilaPass789'
    }
  ];
  initialValue: any[] = [];
  isSorted: boolean = false;

  constructor(private confirmationService: ConfirmationService) {}
  filteredUsers: any[] = [];
  filterValues: { [key: string]: string } = {
    fullName: '',
    adresse: '',
    telephone: '',
    email: ''
  };

  ngOnInit() {
    this.initialValue = [...this.users];
  }


  
  generatePassword(): string {
    const length = 12; // Longueur du mot de passe
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    console.log('Generated Password:', password); // Affiche le mot de passe généré dans la console
    return password;
  }
  showDeleteDialog(userId: number): void {
    this.userIdToDelete = userId;
  
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.confirmDelete(); 
      },
      reject: () => {
        this.cancelDelete();  
      }
    });
  }
  

  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.users = this.users.filter((user: any) => user.id !== this.userIdToDelete);
      this.userIdToDelete = null; // Réinitialise après la suppression
    }
    this.deleteDialogVisible = false;
  }

  cancelDelete(): void {
    this.userIdToDelete = null; // Réinitialise après annulation
    this.deleteDialogVisible = false;
  }
  showAddDialog(): void {
    this.addDialogVisible = true;
  }

  addUser(): void {
    const newId = Math.max(...this.users.map((user: any) => user.id)) + 1;
    const newUserToAdd = { ...this.newUser, id: newId };
    this.users.push(newUserToAdd);
    this.resetNewUser();
    this.addDialogVisible = false;
  }

  cancelAdd(): void {
    this.resetNewUser();
    this.addDialogVisible = false;
  }

  resetNewUser(): void {
    this.newUser = {
      image: '',
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
      instagram: ''
    };
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted === true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted === false) {
      this.isSorted = false;
      this.users = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    const field = event.field as string; // Assurez-vous que `field` est bien une chaîne
    const order = event.order !== undefined ? event.order : 1;
  
    if (!field) {
      console.error('Field is undefined or not a string');
      return;
    }
  
    this.users.sort((data1: any, data2: any) => {
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
 

  onDelete(userId: number): void {
    console.log(`Suppression de l'utilisateur avec l'ID: ${userId}`);
    this.deleteDialogVisible = true;
    this.showDeleteDialog(userId); 
  }

  onEdit(userId: number): void {
    console.log(`Édition de l'utilisateur avec l'ID: ${userId}`);
    const userToEdit = this.users.find((user: any) => user.id === userId);
    this.selectedUser = userToEdit;
    if (userToEdit) {
      console.log('Utilisateur à éditer:', userToEdit);

      this.editDialogVisible = true; 

    } else {
      console.log(`Utilisateur avec l'ID ${userId} non trouvé.`);
    }
  }

  saveEdit(): void {
    if (this.selectedUser && this.selectedUser.id) {
      const index = this.users.findIndex((user:any) => user.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
        this.editDialogVisible = false;

      } else {
        console.error(`Utilisateur avec l'ID ${this.selectedUser.id} non trouvé.`);
      }
    } else {
      console.error('Aucun utilisateur sélectionné ou ID non défini.');
    }
  }
  
  cancelEdit(): void {
    this.selectedUser = {};
    this.editDialogVisible = false;
  }
  
}

