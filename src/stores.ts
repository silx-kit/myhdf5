import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface H5File {
  name: string;
  url: string;
}

interface Store {
  opened: H5File[];
  openFiles: (files: H5File[]) => void;
}

export const useStore = create<Store>()(
  immer((set) => ({
    opened: [],

    openFiles: (files) =>
      set((state) => {
        state.opened.push(...files);
      }),
  }))
);
