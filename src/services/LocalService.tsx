import { FiMonitor } from 'react-icons/fi';

import { useDropzoneContext } from '../Dropzone';
import styles from './LocalService.module.css';
import Service from './Service';

function LocalService() {
  const { openFilePicker } = useDropzoneContext();

  return (
    <Service icon={FiMonitor}>
      <button
        className={styles.selectBtn}
        type="button"
        onClick={() => openFilePicker()}
      >
        Select HDF5 files
      </button>
      <p className={styles.hint}>or drop files anywhere at any time</p>
    </Service>
  );
}

export default LocalService;
