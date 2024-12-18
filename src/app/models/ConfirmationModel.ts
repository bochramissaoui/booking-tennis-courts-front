export interface ConfirmationModel {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmAction: () => void;
  cancelAction: () => void;
}
