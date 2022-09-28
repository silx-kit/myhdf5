import styles from './Help.module.css';
import { buildMailto, FEEDBACK_MESSAGE } from './utils';

function Help() {
  return (
    <div className={styles.root}>
      <section>
        <h2>
          About myHDF<span>5</span>
        </h2>
        <p>
          <em>myHDF5</em> is an online{' '}
          <strong>HDF5 file viewing service</strong> developed and maintained by
          the{' '}
          <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
            European Synchrotron Radiation Facility
          </a>{' '}
          (ESRF) as part of the European{' '}
          <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
            PaNOSC project
          </a>
          . It is based on{' '}
          <a
            href="https://github.com/silx-kit/h5web"
            target="_blank"
            rel="noreferrer"
          >
            <strong>H5Web</strong>
          </a>
          , a React/WebGL viewer for exploring and visualising HDF5 files, as
          well as{' '}
          <a
            href="https://github.com/usnistgov/h5wasm"
            target="_blank"
            rel="noreferrer"
          >
            <strong>h5wasm</strong>
          </a>
          , a WebAssembly port of the HDF5 C library developed by the{' '}
          <a href="https://www.nist.gov/" target="_blank" rel="noreferrer">
            NIST
          </a>{' '}
          that allows reading HDF5 files with JavaScript.
        </p>
      </section>
      <section>
        <h2>
          Sharing a link to myHDF<span>5</span>
        </h2>
        <p>
          When opening a file from a URL in myHDF5 (i.e. a file hosted on
          GitHub, Zenodo, etc.), the URL shown in the browser's address bar is{' '}
          <strong>shareable as is</strong>.{' '}
          <em>This feature does not work for local files.</em>
        </p>
      </section>
      <section>
        <h2>Known limitations</h2>
        <ul>
          <li>
            External links and virtual datasets in HDF5 files are not supported.
            While you should see an explicit error for external links, it won't
            be the case for virtual datasets, which will appear filled with
            zeros.
          </li>
          <li>
            Datasets compressed with external filters (e.g. bitshuffle) are not
            decompressed when visualised and may silently break some
            visualisations.
          </li>
          <li>
            Local files are not persisted. If you leave myHDF5 and come back
            later, or even just reload the page, local files will be removed
            from the list of opened files.
          </li>
        </ul>
      </section>
      <section>
        <h2>Where to find support</h2>
        <ul>
          <li>
            For issues/features related to the H5Web viewer, please use{' '}
            <a
              href="https://github.com/silx-kit/h5web/issues"
              target="_blank"
              rel="noreferrer"
            >
              H5Web's issue tracker
            </a>{' '}
            on GitHub
          </li>
          <li>
            Otherwise, please use{' '}
            <a
              href="https://gitlab.esrf.fr/ui/myhdf5/-/issues"
              target="_blank"
              rel="noreferrer"
            >
              myHDF5's issue tracker
            </a>{' '}
            on GitLab
          </li>
          <li>
            You can also contact us on H5Web's support &amp; feedback mailing
            list:{' '}
            <a href={buildMailto('Support request', FEEDBACK_MESSAGE)}>
              h5web@esrf.fr
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Where to leave feedback</h2>
        <p>
          We'd love to hear what you think of myHDF5 and the H5Web viewer! Here
          are the best ways to get in touch with us:
        </p>
        <ul>
          <li>
            <a
              href="https://github.com/silx-kit/h5web/discussions"
              target="_blank"
              rel="noreferrer"
            >
              Open a discussion thread
            </a>{' '}
            on H5Web's GitHub repository
          </li>
          <li>
            Drop us a line at <a href="mailto:h5web@esrf.fr">h5web@esrf.fr</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Help;
