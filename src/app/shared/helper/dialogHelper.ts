import { Confirmation } from 'primeng/api';

interface ConfirmationConfig {
  message: string;
  accept: Function;
  reject?: Function;
}

export class DialogHelper {
  public static createConfirmation(
    confirmationConfig: ConfirmationConfig
  ): Confirmation {
    return {
      icon: 'pi pi-exclamation-triangle mr-3 text-4xl',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      defaultFocus: 'close',
      ...confirmationConfig,
    };
  }
}
