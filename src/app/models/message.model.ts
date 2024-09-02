export interface Message {
    id: number;
    type: 'interne' | 'externe' | 'client';
    content: string;
    sender: string;
    date: Date;
  }
  