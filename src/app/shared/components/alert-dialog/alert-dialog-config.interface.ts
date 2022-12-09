import { SafeHtml } from '@angular/platform-browser';

export interface CustomDialogConfig {
  title?: string;
  message?: string;
  action?: string;
  cancelBtnColor?: ThemePalette;
  cancelBtnLabel?: string;
  okBtnColor?: ThemePalette;
  okBtnLabel?: string;
  dialogMsg?: SafeHtml | string;
  dialogTitle: string;
  dialogType?: 'alert' | 'confirm';
}

export declare type ThemePalette = 'primary' | 'accent' | 'warn' | undefined;
