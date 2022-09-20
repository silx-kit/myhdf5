import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiGithub } from 'react-icons/fi';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

import { toRawGithubUrl } from '../utils';
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

  const { isDirty, errors } = formState;
  const navigate = useNavigate();

  const handleValidSubmit: SubmitHandler<FormValues> = (data) => {
    const urlParam = createSearchParams({ url: toRawGithubUrl(data.url) });
    navigate(`view?${urlParam.toString()}`);
  };

  const url = watch('url');
  const showHint = /\/(main|master|dev)\//u.test(url);

  return (
    <Service heading="GitHub" icon={FiGithub}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="URL of HDF5 file on GitHub"
            placeholder="https://github.com/org/repo/branch_tag_sha/path/file.h5"
            data-error={(isDirty && !!errors.url) || undefined}
            {...register('url', {
              required: true,
              pattern: /^https?:\/\/github.com\/.+/u,
            })}
          />
          <button className={styles.openBtn} type="submit">
            Open from GitHub
          </button>
        </div>
        {showHint && (
          <p className={styles.hint}>
            If you intend to <Link to="/help">share this file</Link>, please
            pinpoint it to a specific commit or tag. Alternatively, use the
            file's permalink provided by GitHub.
          </p>
        )}
      </form>
    </Service>
  );
}

export default GithubService;
