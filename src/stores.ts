import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum FileService {
  Local = 'local',
  Url = 'url',
}

export interface H5File {
  service: FileService;
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
        partialize: ({ opened, sidebarMayCollapse }) => ({
          opened: opened.filter(({ service }) => service !== FileService.Local), // filter out local files, since they can't be re-opened
          sidebarMayCollapse,
        }),
        version: 1,
      }
    )
  )
);
