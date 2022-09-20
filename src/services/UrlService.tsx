import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiGlobe } from 'react-icons/fi';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Service from './Service';
import styles from './UrlService.module.css';

interface FormValues {
  url: string;
}

function UrlService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
    watch,
  } = useForm<FormValues>({ defaultValues: { url: '' } });

  const { errors } = formState;
  const url = watch('url');
  const navigate = useNavigate();

  const handleValidSubmit: SubmitHandler<FormValues> = (data) => {
    const urlParam = createSearchParams({ url: data.url });
    navigate(`view?${urlParam.toString()}`);
  };

  return (
    <Service heading="Direct URL" icon={FiGlobe}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="HDF5 file URL"
            placeholder="https://some.url/file.h5"
            data-error={!!errors.url || undefined}
            {...register('url', {
              required: 'Please enter a URL',
              pattern: {
                message: 'Expected a valid HTTP(S) URL',
                value: /^https?:\/\/.+/u,
              },
            })}
          />
          <button className={styles.openBtn} type="submit">
            Open from URL
          </button>
        </div>
        {errors.url?.message ? (
          <p className={styles.hint} data-error>
            {errors.url.message}
          </p>
        ) : (
          !url && (
            <p className={styles.hint}>
              The server must allow{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                target="_blank"
                rel="noreferrer"
              >
                cross-origin requests
              </a>{' '}
              (CORS) with the <code>Access-Control-*</code> HTTP response
              headers.
            </p>
          )
        )}
      </form>
    </Service>
  );
}

export default UrlService;
