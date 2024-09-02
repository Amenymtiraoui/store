import { Injectable } from '@angular/core';
import { Contact } from './models/contact.model';
import { Message } from './models/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private messages: Message[] = [];
  private contacts: Contact[] = [];

  constructor() {
    
  }

  getMessages(type: 'interne' | 'externe' | 'client'): Message[] {
    return this.messages.filter(message => message.type === type);
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  blockContact(contactId: number): void {
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.isBlocked = true;
    }
  }

  unblockContact(contactId: number): void {
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.isBlocked = false;
    }
  }

  sendMessage(message: Message): void {
    this.messages.push(message);
  }
}




