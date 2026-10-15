import { create } from "zustand";

const TOAST_LIMIT = 3;

export const useToastStore = create((set, get) => ({
  toasts: [],
  toast: ({ title, description, variant = "default", duration = 5000 }) => {
    const id = crypto.randomUUID();
    set((s) => ({
      toasts: [{ id, title, description, variant, open: true }, ...s.toasts].slice(0, TOAST_LIMIT),
    }));
    if (duration > 0) {
      setTimeout(() => get().dismiss(id), duration);
    }
    return id;
  },
  dismiss: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));

export function useToast() {
  const toasts = useToastStore((s) => s.toasts);
  const toast = useToastStore((s) => s.toast);
  const dismiss = useToastStore((s) => s.dismiss);
  return { toasts, toast, dismiss };
}
