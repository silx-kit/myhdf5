import type { PropsWithChildren } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSearchParams } from 'react-router-dom';

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
  const [, setSearchParams] = useSearchParams();

  const onDropAccepted = useCallback(
    (files: File[]) => {
      const h5Files = files.map<H5File>((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        service: FileService.Local,
      }));

      openFiles(h5Files);
      setSearchParams({ file: h5Files[0].url });
    },
    [openFiles, setSearchParams]
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
