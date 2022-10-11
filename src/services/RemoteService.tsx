import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiGlobe } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { getViewerLink } from '../utils';
import styles from './RemoteService.module.css';
import Service from './Service';
import { validateRequiredUrl } from './utils';

interface FormValues {
  url: string;
}

function RemoteService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
    watch,
  } = useForm<FormValues>({ defaultValues: { url: '' } });

  const { isSubmitted, errors } = formState;
  const navigate = useNavigate();

  const handleValidSubmit: SubmitHandler<FormValues> = (data) => {
    navigate(getViewerLink(data.url));
  };

  const url = watch('url');
  const isUnstable = /\/(main|master|dev)\//u.test(url);

  return (
    <Service icon={FiGlobe}>
      <h2 className={styles.heading}>Open from URL</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="URL of HDF5 file"
            placeholder="https://github.com/org/repo/blob/sha/path/to/file.h5"
            data-error={!!errors.url || undefined}
            {...register('url', { validate: validateRequiredUrl })}
          />
          <button className={styles.openBtn} type="submit">
            Open
          </button>
        </div>
        {errors.url?.message ? (
          <p className={styles.hint} data-error>
            {errors.url?.message}
          </p>
        ) : isUnstable ? (
          <p className={styles.hint}>
            If you intend to <Link to="/help">share this file</Link>, consider
            using a{' '}
            <a
              href="https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files"
              target="_blank"
              rel="noreferrer"
            >
              permalink
            </a>
            .
          </p>
        ) : (
          !isSubmitted && (
            <p className={styles.hint}>
              Paste the URL of a file from a Zenodo record or GitHub repository.
              For more information and advanced uses,{' '}
              <Link to="/help#remote">check out the help page</Link>.
            </p>
          )
        )}
      </form>
    </Service>
  );
}

export default RemoteService;
