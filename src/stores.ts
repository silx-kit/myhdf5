import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum FileService {
  Local = 'Local',
  Url = 'URL',
  GitHub = 'GitHub',
  GitLab = 'GitLab',
  Zenodo = 'Zenodo',
}

interface BaseFile {
  url: string; // unique amongst opened files
  name: string;
  service: FileService;
  resolvedUrl: string;
}

export interface LocalFile extends BaseFile {
  service: FileService.Local;
  file: File;
}

export interface RemoteFile extends BaseFile {
  service: Exclude<FileService, FileService.Local>;
}

export type H5File = LocalFile | RemoteFile;

interface Store {
  opened: H5File[];
  openFiles: (files: H5File[]) => void;
  removeFileAt: (index: number) => void;

  sidebarMayCollapse: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      opened: [],

      openFiles: (files) => {
        set((state) => ({ opened: [...state.opened, ...files] }));
      },

      removeFileAt: (index) => {
        set((state) => ({
          opened: [
            ...state.opened.slice(0, index),
            ...state.opened.slice(index + 1),
          ],
        }));
      },

      sidebarMayCollapse: false,

      toggleSidebar: () => {
        set((state) => ({ sidebarMayCollapse: !state.sidebarMayCollapse }));
      },
    }),
    {
      name: 'myhdf5',
      partialize: ({ opened, sidebarMayCollapse }) => ({
        opened: opened.filter(({ service }) => service !== FileService.Local), // filter out local files, since they can't be re-opened
        sidebarMayCollapse,
      }),
      version: 1,
    },
  ),
);
