import styles from './Loader.module.css';

interface Props {
  message: string;
}

function Loader(props: Props) {
  const { message } = props;

  return (
    <div className={styles.loader}>
      <div className={styles.grid}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Loader;
