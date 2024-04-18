import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
      },
    ),
  ),
);
