import { create } from 'zustand';

const useChangeRowModal = create((set) => ({
  rowData: {},
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  clearRowData: () => set((rowData) => ({ rowData: {} })),
}));

export default useChangeRowModal;
