import { useForm } from 'react-hook-form';
import { FiAlertOctagon, FiAlertTriangle, FiGlobe } from 'react-icons/fi';
import { Link, useLocation } from 'wouter';

import { getViewerLink } from '../utils';
import styles from './RemoteService.module.css';
import Service from './Service';
import { validateRequiredUrl } from './utils';

export const UNSTABLE_URL_REGEX = /\/(dev|main|master)\//u;

interface FormValues {
  url: string;
}

function RemoteService() {
  const {
    register,
    handleSubmit: createSubmitHandler,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [, navigate] = useLocation();

  function handleValidSubmit(data: FormValues) {
    navigate(getViewerLink(data.url.trim()));
  }

  const url = watch('url');
  const isUnstable = UNSTABLE_URL_REGEX.test(url);

  return (
    <Service icon={FiGlobe}>
      <h2 className={styles.heading}>Open from URL</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="URL of HDF5 file"
            aria-invalid={!!errors.url || undefined}
            placeholder="https://github.com/org/repo/blob/sha/path/to/file.h5"
            {...register('url', { validate: validateRequiredUrl })}
          />
          <button className={styles.openBtn} type="submit">
            Open
          </button>
        </div>
        {errors.url?.message ? (
          <p className={styles.hint} data-error>
            <FiAlertOctagon className={styles.hintIcon} />
            {errors.url.message}
          </p>
        ) : (
          isUnstable && (
            <p className={styles.hint} data-warning>
              <FiAlertTriangle className={styles.hintIcon} />
              If you intend to <Link to="/help#share">share this file</Link>,
              consider using a{' '}
              <a
                href="https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files"
                target="_blank"
                rel="noreferrer"
              >
                permalink
              </a>
              .
            </p>
          )
        )}
        <p className={styles.hint}>
          Paste the URL of a file from a Zenodo record or GitHub repository. For
          more information and advanced uses,{' '}
          <Link to="/help#remote">check out the help page</Link>.
        </p>
      </form>
    </Service>
  );
}

export default RemoteService;
