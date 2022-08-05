import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface H5File {
  name: string;
  url: string;
}

interface Store {
  opened: H5File[];
  openFiles: (files: H5File[]) => void;
  removeFileAt: (index: number) => void;

  sidebarMayCollapse: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<Store>()(
  immer(
    persist(
      (set) => ({
        opened: [],

        openFiles: (files) => {
          set((state) => {
            state.opened.push(...files);
          });
        },

        removeFileAt: (index) => {
          set((state) => {
            state.opened.splice(index, 1);
          });
        },

        sidebarMayCollapse: false,
        toggleSidebar: () => {
          set((state) => {
            state.sidebarMayCollapse = !state.sidebarMayCollapse;
          });
        },
      }),
      {
        name: 'myhdf5',
        partialize: ({ sidebarMayCollapse }) => ({ sidebarMayCollapse }),
        version: 1,
      }
    )
  )
);
