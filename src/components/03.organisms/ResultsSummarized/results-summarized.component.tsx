import { CiCircleRemove, CiCircleCheck, CiWarning} from "react-icons/ci";

import styles from './results-summarized.module.scss';

/** 
 * Summarized results box. Very hardcoded, no translations or any of the sort, this grabs a list of 3 data points from an object to fill up the information.
 * No types defined here
 * 
 * @param {any} data - The data to be displayed
 * @returns {React.ReactElement} - The component
 */
const ResultsSummarized = ({ data }: any) => {
  return (
    <div className={styles.summarizedTable}>
      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiCircleCheck className={styles.colorSuccess} />
          <aside className={styles.summarizedTitleAside}>
            <p>Successes:</p>
            <span>Total amount of successful requests</span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.success}</div>
      </div>

      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiWarning className={styles.colorWarning} />
          <aside className={styles.summarizedTitleAside}>
            <p>Warnings:</p>
            <span>Total amount of warnings</span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.warning}</div>
      </div>

      <div className={styles.summarizedRow}>
        <div className={styles.summarizedTitle}>
          <CiCircleRemove className={styles.colorError} />
          <aside className={styles.summarizedTitleAside}>
            <p>Errors:</p>
            <span>Total amount of fatal errors </span>
          </aside>
        </div>
        <div className={styles.summarizedData}>{data.error}</div>
      </div>
    </div>
  );
};

export default ResultsSummarized;