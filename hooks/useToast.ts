import { toast as sonnerToast } from 'sonner';


export function useToast() {
  return {
    /**
     * Show success toast
     */
    success: (message: string, options?: { duration?: number }) => {
      return sonnerToast.success(message, options);
    },

    /**
     * Show error toast
     */
    error: (message: string, options?: { duration?: number }) => {
      return sonnerToast.error(message, options);
    },

    /**
     * Show loading toast (returns ID for dismissal)
     */
    loading: (message: string) => {
      return sonnerToast.loading(message);
    },

    /**
     * Show info toast
     */
    info: (message: string, options?: { duration?: number }) => {
      return sonnerToast.info(message, options);
    },

    /**
     * Dismiss toast by ID
     */
    dismiss: (toastId?: string | number) => {
      return sonnerToast.dismiss(toastId);
    },

    /**
     * Promise toast - shows loading, then success/error based on promise result
     */
    promise: <T,>(
      promise: Promise<T>,
      {
        loading,
        success,
        error,
      }: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      }
    ) => {
      return sonnerToast.promise(promise, { loading, success, error });
    },

    // Custom methods for specific use cases

    /**
     * Show order created success toast
     */
    orderCreated: (orderNumber: string) => {
      return sonnerToast.success(`Zamówienie ${orderNumber} zostało utworzone!`, {
        duration: 5000,
      });
    },

    /**
     * Show payment failed error toast
     */
    paymentFailed: (reason?: string) => {
      const message = reason
        ? `Płatność nie powiodła się: ${reason}`
        : 'Płatność nie powiodła się. Spróbuj ponownie.';

      return sonnerToast.error(message, {
        duration: 6000,
      });
    },

    /**
     * Show product saved success toast
     */
    productSaved: (productName: string) => {
      return sonnerToast.success(`Produkt "${productName}" został zapisany`, {
        duration: 4000,
      });
    },

    /**
     * Show product deleted success toast
     */
    productDeleted: () => {
      return sonnerToast.success('Produkt został usunięty', {
        duration: 3000,
      });
    },
  };
}
