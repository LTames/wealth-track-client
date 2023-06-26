import { Message } from 'primeng/api';

type Severity = 'error' | 'info' | 'warn' | 'success';

export class MessageHelper {
  public static createMessage(
    summary: string,
    severity: Severity,
    detail?: string
  ): Message {
    return {
      life: 3000,
      closable: false,
      summary,
      severity,
      detail,
    };
  }
}
