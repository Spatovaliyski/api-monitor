import { CiCircleRemove, CiCircleCheck, CiWarning} from "react-icons/ci";

import styles from './results-summarized.module.scss';

const ResultsSummarized = ({ data }: any) => {
  return (
    <div className={styles.summarizedTable}>
      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiCircleCheck className={styles.colorSuccess} />
          <aside className={styles.summarizedTitleAside}>
            <p>Successes:</p>
            <span>Amount of successful requests</span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.success}</div>
      </div>

      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiWarning className={styles.colorWarning} />
          <aside className={styles.summarizedTitleAside}>
            <p>Warnings:</p>
            <span>Amount of warnings in our requests</span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.warning}</div>
      </div>

      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiCircleRemove className={styles.colorError} />
          <aside className={styles.summarizedTitleAside}>
            <p>Errors:</p>
            <span>Amount of fatal errors </span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.error}</div>
      </div>
    </div>
  );
};

export default ResultsSummarized;