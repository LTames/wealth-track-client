import { Injectable } from '@angular/core';
import { Transaction } from './interfaces/transaction.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  public updateTransaction(transaction: Transaction) {
    return this.http
      .put<Transaction>(
        `${environment.serverUrl}/transactions/${transaction.id}`,
        transaction
      )
      .pipe(
        take(1),
        map((transaction) => this.mapTransactionDate(transaction))
      );
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${environment.serverUrl}/transactions`, transaction)
      .pipe(
        take(1),
        map((transaction) => this.mapTransactionDate(transaction))
      );
  }

  public deleteTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .delete<Transaction>(
        `${environment.serverUrl}/transactions/${transaction.id}`
      )
      .pipe(take(1));
  }

  public deleteSelectedTransactions(
    selectedTransactions: Transaction[]
  ): Observable<Transaction[]> {
    return this.http
      .delete<Transaction[]>(`${environment.serverUrl}/transactions`, {
        body: {
          ids: selectedTransactions.map((transaction) => transaction.id),
        },
      })
      .pipe(take(1));
  }

  public listTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${environment.serverUrl}/transactions`)
      .pipe(
        take(1),
        map((transactions) =>
          transactions.map((t) => this.mapTransactionDate(t))
        )
      );
  }

  private mapTransactionDate(transaction: Transaction): Transaction {
    return {
      ...transaction,
      createdAt: new Date(transaction.createdAt!),
      updatedAt: new Date(transaction.updatedAt!),
    };
  }
}
