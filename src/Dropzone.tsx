import type { PropsWithChildren } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createSearchParams, useNavigate } from 'react-router-dom';

import styles from './Dropzone.module.css';
import type { H5File } from './stores';
import { FileService } from './stores';
import { useStore } from './stores';

interface DropzoneContextValue {
  openFilePicker: () => void;
}

const DropzoneContext = createContext({} as DropzoneContextValue);

interface Props {}

function Dropzone(props: PropsWithChildren<Props>) {
  const { children } = props;

  const openFiles = useStore((state) => state.openFiles);
  const navigate = useNavigate();

  const onDropAccepted = useCallback(
    (files: File[]) => {
      const h5Files = files.map<H5File>((file) => {
        const url = URL.createObjectURL(file);
        return {
          name: file.name,
          url,
          service: FileService.Local,
          resolvedUrl: url,
        };
      });

      openFiles(h5Files);

      const params = createSearchParams({ url: h5Files[0].url });
      navigate(`view?${params.toString()}`);
    },
    [openFiles, navigate]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
  });

  return (
    <div {...getRootProps({ className: styles.zone })}>
      <input {...getInputProps()} />
      {isDragActive && (
        <div className={styles.dropIt}>
          <p>Drop it!</p>
        </div>
      )}
      <DropzoneContext.Provider value={{ openFilePicker: open }}>
        {children}
      </DropzoneContext.Provider>
    </div>
  );
}

export function useDropzoneContext() {
  return useContext(DropzoneContext);
}

export default Dropzone;
