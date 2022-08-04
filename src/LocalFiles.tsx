import { FiMonitor } from 'react-icons/fi';

import { useDropzoneContext } from './Dropzone';
import styles from './LocalFiles.module.css';

function LocalFiles() {
  const { openFilePicker } = useDropzoneContext();
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <FiMonitor className={styles.icon} />
        <div className={styles.content}>
          <button
            className={styles.selectBtn}
            type="button"
            onClick={() => openFilePicker()}
          >
            Select HDF5 files
          </button>
          <p className={styles.hint}>or drop files anywhere at any time</p>
        </div>
      </div>
    </div>
  );
}

export default LocalFiles;
