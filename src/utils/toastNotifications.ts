// src/utils/toastNotifications.ts
import toast from "react-hot-toast";

export const showToastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "var(--bg-card)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      padding: "16px",
    },
    icon: '✅',
  });
};

export const showToastError = (message: string) => {
  toast.error(message, {
    style: {
      background: "var(--bg-card)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      padding: "16px",
    },
    icon: '❌',
  });
};

export const showToastInfo = (message: string) => {
  toast(message, {
    style: {
      background: "var(--bg-card)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      padding: "16px",
    },
    icon: 'ℹ️',
  });
};
