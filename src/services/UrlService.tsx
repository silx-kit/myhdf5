import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FiGlobe } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import Service from './Service';
import styles from './UrlService.module.css';

interface FormValues {
  file: string;
}

function UrlService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
  } = useForm<FormValues>({ defaultValues: { file: '' } });

  const { isDirty, errors } = formState;
  const [, setSearchParams] = useSearchParams();

  const handleValidSubmit: SubmitHandler<FormValues> = (data) => {
    setSearchParams({ file: data.file });
  };

  return (
    <Service icon={FiGlobe}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            id="file"
            className={styles.input}
            aria-label="HDF5 file URL"
            placeholder="https://some.url/file.h5"
            data-error={(isDirty && !!errors.file) || undefined}
            {...register('file', {
              required: true,
              pattern: /^https?:\/\/.+/u,
            })}
          />
          <button className={styles.openBtn} type="submit">
            Open from URL
          </button>
        </div>
        <p className={styles.hint}>
          The server must allow{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            target="_blank"
            rel="noreferrer"
          >
            cross-origin requests
          </a>{' '}
          (CORS) with the <code>Access-Control-*</code> HTTP response headers.
        </p>
      </form>
    </Service>
  );
}

export default UrlService;
