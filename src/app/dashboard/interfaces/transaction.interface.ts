export interface Transaction {
  id?: string;
  value: number;
  category: string;
  transactionType: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TransactionType = 'SAIDA' | 'ENTRADA';
