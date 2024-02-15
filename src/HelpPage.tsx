import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Help.module.css';
import { buildMailto, FEEDBACK_MESSAGE, getViewerLink } from './utils';

function HelpPage() {
  const { hash } = useLocation();

  useEffect(() => {
    const target = !!hash && document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

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
        <h2>Opening local files</h2>
        <p>
          myHDF5 supports opening local HDF5 files either by selecting them via
          a file picker from the{' '}
          <Link to="/">
            <em>Open HDF5</em>
          </Link>{' '}
          page, or by dragging and dropping them anywhere on the interface at
          any time. You can even select/drop multiple files at once.
        </p>
      </section>
      <section id="remote">
        <h2>Opening remote files</h2>
        <p>
          myHDF5 supports opening HDF5 files that are served statically through
          the web. To do so, simply paste the URL of a file in the field located
          on the{' '}
          <Link to="/">
            <em>Open HDF5</em>
          </Link>{' '}
          page. Note that the server must accept{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            target="_blank"
            rel="noreferrer"
          >
            cross-origin requests
          </a>
          .
        </p>
        <p>
          A number of hosting services such as Zenodo and GitHub allow
          downloading raw files. However, it is not always easy to find the
          right URL to use. To make it easier, myHDF5 accepts the following
          user-facing URL formats:
        </p>
        <ul className={styles.listSpaced}>
          <li>
            <strong>Zenodo</strong> download URL (from a{' '}
            <a
              href="https://zenodo.org/record/6497438"
              target="_blank"
              rel="noreferrer"
            >
              record page
            </a>
            , right-click on file, <em>Copy&nbsp;Link</em>)
            <div className={styles.url}>
              e.g.{' '}
              <Link
                to={getViewerLink(
                  'https://zenodo.org/record/6497438/files/xrr_dataset.h5?download=1',
                )}
              >
                https://zenodo.org/record/6497438/files/xrr_dataset.h5?download=1
              </Link>
            </div>
          </li>
          <li>
            <strong>
              GitHub{' '}
              <a
                href="https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files"
                target="_blank"
                rel="noreferrer"
              >
                permalink
              </a>
            </strong>{' '}
            (recommended for sharing)
            <div className={styles.url}>
              e.g.{' '}
              <Link
                title="https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5"
                to={getViewerLink(
                  'https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5',
                )}
              >
                https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5
              </Link>
            </div>
          </li>
          <li>
            GitHub URL with tag, branch or commit sha
            <div className={styles.url}>
              e.g.{' '}
              <Link
                to={getViewerLink(
                  'https://github.com/oasys-esrf-kit/dabam2d/blob/main/data/dabam2d-0001.h5',
                )}
              >
                https://github.com/oasys-esrf-kit/dabam2d/blob/main/data/dabam2d-0001.h5
              </Link>
            </div>
            <div className={styles.url}>
              e.g.{' '}
              <Link
                title="https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5"
                to={getViewerLink(
                  'https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5',
                )}
              >
                https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5
              </Link>
            </div>
          </li>
        </ul>
        <p>
          Note that <strong>GitLab</strong> currently{' '}
          <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/16732">
            does not support
          </a>{' '}
          cross-origin requests. You can still paste a user-facing GitLab URL,
          but myHDF5 won't be able to fetch the file and will show an error.
          When this occurs, myHDF5 lets you download the file manually so you
          can open it as a local file.
          <span className={styles.url}>
            e.g.{' '}
            <Link
              to={getViewerLink(
                'https://gitlab.com/utopia-project/utopia/-/blob/master/test/core/cell_manager_test.h5',
              )}
            >
              https://gitlab.com/utopia-project/utopia/-/blob/master/test/core/cell_manager_test.h5
            </Link>
          </span>
        </p>
      </section>
      <section>
        <h2>
          Sharing a link to myHDF<span>5</span>
        </h2>
        <p>
          When opening a remote file (i.e. a file hosted on Zenodo, GitHub,
          etc.), the URL of myHDF5 shown in the browser's address bar is{' '}
          <strong>shareable as is</strong>.{' '}
          <em>This feature does not work for local files.</em>
        </p>
      </section>
      <section>
        <h2>Supported HDF5 compression plugins</h2>
        <p>
          myHDF5 supports reading datasets compressed with any of the plugins
          available in{' '}
          <a
            href="https://github.com/h5wasm/h5wasm-plugins/tree/v0.0.3?tab=readme-ov-file#included-plugins"
            target="_blank"
            rel="noreferrer"
          >
            h5wasm‑plugins@0.0.3
          </a>
          .
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
            Datasets compressed with external filters (e.g. bitshuffle) can be
            inspected but not visualized.
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

export default HelpPage;
