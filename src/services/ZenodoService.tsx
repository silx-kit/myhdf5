import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TbLetterZ } from 'react-icons/tb';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Service from './Service';
import styles from './ZenodoService.module.css';
import { fetchZenodoFileUrl } from './utils';

export interface FormValues {
  downloadUrl: string;
}

function ZenodoService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
    setError,
  } = useForm<FormValues>({ defaultValues: { downloadUrl: '' } });

  const { errors } = formState;
  const navigate = useNavigate();

  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const url = await fetchZenodoFileUrl(data.downloadUrl);
      const urlParam = createSearchParams({ url });
      navigate(`view?${urlParam.toString()}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          'downloadUrl',
          { type: 'custom', message: error.message },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <Service heading="Zenodo" icon={TbLetterZ}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="Download URL of HDF5 file on Zenodo"
            placeholder="https://zenodo.org/record/1234567/files/file.h5?download=1"
            data-error={!!errors.downloadUrl || undefined}
            {...register('downloadUrl', {
              required: 'Please enter a Zenodo URL',
              pattern: {
                message:
                  'Expected URL of the form: https://zenodo.org/record/<record-id>/files/<path-to-file>?download=1',
                value: /^https?:\/\/zenodo.org\/record\/[0-9]+\/files\/.+/u,
              },
            })}
          />
          <button className={styles.openBtn} type="submit">
            Open from Zenodo
          </button>
        </div>
        {errors.downloadUrl?.message && (
          <p className={styles.hint} data-error>
            {errors.downloadUrl.message}
          </p>
        )}
      </form>
    </Service>
  );
}

export default ZenodoService;
