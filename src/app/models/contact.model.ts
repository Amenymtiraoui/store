export interface Contact {
    id: number;
    name: string;
    type: 'interne' | 'externe' | 'client';
    isBlocked: boolean;
  }
  