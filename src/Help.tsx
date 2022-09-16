import styles from './Help.module.css';

function Help() {
  return (
    <div className={styles.root}>
      <section>
        <h2>Sharing a link to myHDF5</h2>
        <p>
          When opening a file from a URL in myHDF5 (i.e. a file hosted on
          GitHub, Zenodo, etc.), the URL shown in the browser's address bar is
          shareable as is. <em>This feature does not work for local files.</em>
        </p>
      </section>
    </div>
  );
}

export default Help;
