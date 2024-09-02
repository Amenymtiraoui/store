import { Component, OnInit } from '@angular/core';
import { MessagerieService } from '../message.service';
import { Message } from '../models/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, DropdownModule],
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  searchQuery: string = '';  
  contactsVisible: boolean = false;
  detailsVisible: boolean = false;  
  messageText: string = '';  
  selectedConatct : any;

  contactTypes = [
    { id: 'all', label: 'Tous' },
    { id: 'fournisseurs', label: 'Fournisseurs Externes' },
    { id: 'instagrammeurs', label: 'Instagrammeurs' },
    { id: 'clients', label: 'Clients' }
  ];

  contacts = [
    { id: 1, name: 'Fournisseur 1', type: 'fournisseurs', imageUrl: './../../assets/user.png', email: 'f1@example.com', phone: '123456789', active: true },
    { id: 2, name: 'Instagrammeur 1', type: 'instagrammeurs', imageUrl: './../../assets/user.png', email: 'i1@example.com', phone: '123456789', active: false },
    { id: 3, name: 'Client 1', type: 'clients', imageUrl: './../../assets/user.png', email: 'c1@example.com', phone: '123456789', active: true },
   
  ];

  filteredContacts = [...this.contacts]; 
  selectedFilter: string | null = null;
  selectedContacts: any[] = [];
  sentMessages: { text: string, senderName: string, senderImage: string, timestamp: Date }[] = []; // Pour stocker les messages envoyés

  ngOnInit(): void {}

  toggleContacts() {
    this.contactsVisible = !this.contactsVisible;
  }

  showDetails(contact: any) {
    this.selectedConatct = contact;
    this.detailsVisible = true; 
    // if (this.selectedFilter === 'all') {
    //     // Trouver et afficher les détails du premier fournisseur uniquement
    //     const fournisseur = this.contacts.find(c => c.type === 'fournisseurs');
    //     if (fournisseur) {
    //         this.selectedContacts = [fournisseur];
    //         this.detailsVisible = true;
    //     } else {
    //         this.detailsVisible = false;
    //     }
    // } else {
    //     // Afficher les détails du contact spécifique sur lequel l'utilisateur a cliqué
    //     this.selectedContacts = [contact];
    //     this.detailsVisible = true;
    // }
}



  filterContacts(type: string) {
    if (this.selectedFilter === type) {
      // Si le même type est sélectionné, on le désélectionne
      this.selectedFilter = null;
      this.filteredContacts = []; // Réinitialiser la liste des contacts (ou restaurer tous les contacts selon la logique souhaitée)
    } else {
      // Sinon, sélectionner ce type et décocher les autres
      this.selectedFilter = type;
  
      if (type === 'all') {
        this.filteredContacts = [...this.contacts]; // Afficher tous les contacts si "Tous" est sélectionné
      } else {
        this.filteredContacts = this.contacts.filter(contact => contact.type === type); // Filtrer les contacts selon le type sélectionné
      }
    }
  }
  

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name; 
      console.log('Fichier sélectionné:', this.selectedFile);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }
  sendMessage() {
    // Vérifier que le message n'est pas vide et qu'un contact est sélectionné
    if (this.messageText.trim() && this.selectedConatct) {
      // Créer un objet message contenant le texte, le nom de l'expéditeur, l'image de l'expéditeur, et l'horodatage actuel
      const message = {
        text: this.messageText,
        senderName: this.selectedConatct.name, // Nom du contact sélectionné
        senderImage: this.selectedConatct.imageUrl, // Image du contact sélectionné
        timestamp: new Date() // Horodatage actuel
      };
      // Ajouter le message à la liste des messages envoyés
      this.sentMessages.push(message);
      // Réinitialiser le texte du message après l'envoi
      this.messageText = '';  
    }
  }
}