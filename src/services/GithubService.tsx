import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiGithub } from 'react-icons/fi';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

import styles from './GithubService.module.css';
import Service from './Service';

interface FormValues {
  url: string;
}

function GithubService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
    watch,
  } = useForm<FormValues>({ defaultValues: { url: '' } });

  const { errors } = formState;
  const navigate = useNavigate();

  const handleValidSubmit: SubmitHandler<FormValues> = (data) => {
    const urlParam = createSearchParams({ url: data.url });
    navigate(`view?${urlParam.toString()}`);
  };

  const url = watch('url');
  const isUnstable = /\/(main|master|dev)\//u.test(url);

  return (
    <Service heading="GitHub" icon={FiGithub}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="URL of HDF5 file on GitHub"
            placeholder="https://github.com/org/repo/branch_tag_sha/path/file.h5"
            data-error={!!errors.url || undefined}
            {...register('url', {
              required: 'Please enter a GitHub URL',
              pattern: {
                message:
                  'Expected URL of the form: https://github.com/<org>/<repo>/<branch|tag|sha>/<path-to-file>',
                value: /^https?:\/\/github.com\/.+/u,
              },
            })}
          />
          <button className={styles.openBtn} type="submit">
            Open from GitHub
          </button>
        </div>
        {isUnstable ? (
          <p className={styles.hint}>
            If you intend to <Link to="/help">share this file</Link>, please use
            the file's{' '}
            <a
              href="https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files"
              target="_blank"
              rel="noreferrer"
            >
              permalink
            </a>{' '}
            provided by GitHub.
          </p>
        ) : (
          errors.url?.message && (
            <p className={styles.hint} data-error>
              {errors.url?.message}
            </p>
          )
        )}
      </form>
    </Service>
  );
}

export default GithubService;
