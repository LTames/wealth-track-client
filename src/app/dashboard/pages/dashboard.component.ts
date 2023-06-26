import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import {
  Transaction,
  TransactionType,
} from '../interfaces/transaction.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { MessageHelper } from 'src/app/shared/helper/messageHelper';
import { DialogHelper } from 'src/app/shared/helper/dialogHelper';
import { Stats } from '../interfaces/stats.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class DashboardComponent implements OnInit {
  selectedTransactions: Transaction[] = [];
  transactions: Transaction[] = [];

  transactionFormDialog = false;
  transactionForm!: FormGroup;

  transactionTypes: any[] = [
    { label: 'ENTRADA', value: 'ENTRADA' },
    { label: 'SAIDA', value: 'SAIDA' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly confirmationService: ConfirmationService,
    private readonly dashboardService: DashboardService,
    private readonly messageService: MessageService
  ) {}

  get userName() {
    return this.authService.userDataValue?.username;
  }

  ngOnInit() {
    this.dashboardService.listTransactions().subscribe({
      next: (transactions) => (this.transactions = transactions),
      error: () =>
        this.messageService.add(
          MessageHelper.createMessage(
            'Houve um erro ao listar suas transações',
            'error'
          )
        ),
    });

    this.transactionForm = this.formBuilder.group({
      id: [''],
      value: [0, [Validators.required]],
      category: ['', [Validators.required]],
      transactionType: ['', [Validators.required]],
    });
  }

  public createTransaction() {
    this.transactionFormDialog = true;
  }

  public closeTransactionFormDialog() {
    this.transactionFormDialog = false;
    this.transactionForm.reset();
  }

  public saveTransaction() {
    if (this.transactionForm.get('id')?.value) {
      this.dashboardService
        .updateTransaction(this.transactionForm.value)
        .subscribe({
          next: (updatedTransaction) => {
            this.messageService.add(
              MessageHelper.createMessage(
                'Transação alterada com sucesso',
                'success'
              )
            );

            this.transactions[
              this.transactions.findIndex((t) => t.id === updatedTransaction.id)
            ] = updatedTransaction;

            this.selectedTransactions[
              this.selectedTransactions.findIndex(
                (t) => t.id === updatedTransaction.id
              )
            ] = updatedTransaction;
          },
          error: () => {
            this.messageService.add(
              MessageHelper.createMessage(
                'Houve um erro ao fazer as alterações da sua transação',
                'error'
              )
            );
          },
          complete: () => this.closeTransactionFormDialog(),
        });

      return;
    }

    this.dashboardService
      .createTransaction(this.transactionForm.value)
      .subscribe({
        next: (newTransaction) => {
          this.messageService.add(
            MessageHelper.createMessage(
              'Transação salva com sucesso',
              'success'
            )
          );

          this.transactions.unshift(newTransaction);
        },
        error: () => {
          this.messageService.add(
            MessageHelper.createMessage(
              'Houve um erro ao salvar sua transação',
              'error'
            )
          );
        },
        complete: () => this.closeTransactionFormDialog(),
      });
  }

  public editTransaction({
    id,
    category,
    transactionType,
    value,
  }: Transaction) {
    this.transactionForm.setValue({
      id,
      category,
      transactionType,
      value,
    });
    this.transactionFormDialog = true;
  }

  public deleteTransaction(transaction: Transaction) {
    this.confirmationService.confirm(
      DialogHelper.createConfirmation({
        message: 'Você tem certeza que deseja deletar essa transação?',
        accept: () => {
          this.dashboardService.deleteTransaction(transaction).subscribe({
            next: () => {
              this.messageService.add(
                MessageHelper.createMessage(
                  'Transação deletada com sucesso',
                  'success'
                )
              );

              this.transactions = this.transactions.filter(
                (t) => t !== transaction
              );
            },
            error: () => {
              this.messageService.add(
                MessageHelper.createMessage(
                  'Houve um erro ao deletar sua transação',
                  'error'
                )
              );
            },
          });
        },
      })
    );
  }

  public deleteSelectedTransactions() {
    this.confirmationService.confirm(
      DialogHelper.createConfirmation({
        message:
          'Você tem certeza que deseja deletar todas as transações selecionadas?',
        accept: () => {
          this.dashboardService
            .deleteSelectedTransactions(this.selectedTransactions)
            .subscribe({
              next: () => {
                this.messageService.add(
                  MessageHelper.createMessage(
                    'Transações deletadas com sucesso',
                    'success'
                  )
                );

                this.transactions = this.transactions.filter(
                  (transaction) =>
                    !this.selectedTransactions.includes(transaction)
                );
                this.selectedTransactions = [];
              },
              error: (err) => {
                this.messageService.add(
                  MessageHelper.createMessage(
                    'Houve um erro ao deletar as transações selecionadas',
                    'error'
                  )
                );
              },
            });
        },
      })
    );
  }

  public applyTransactionTypeCSS(tt: TransactionType) {
    switch (tt) {
      case 'ENTRADA':
        return ['bg-green-200', 'text-green-800'];
      case 'SAIDA':
        return ['bg-pink-200', 'text-pink-800'];
    }
  }

  public calculateStats(): Stats {
    const result = this.transactions?.reduce(
      (sum, transaction) => {
        switch (transaction.transactionType) {
          case 'ENTRADA':
            sum.income += transaction.value;
            return sum;
          case 'SAIDA':
            sum.expenses += transaction.value;
            return sum;
        }
      },
      {
        income: 0,
        expenses: 0,
      }
    );

    return {
      balance: result.income - result.expenses,
      ...result,
    };
  }
}
