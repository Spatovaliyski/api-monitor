import { CiCircleRemove, CiCircleAlert, CiCircleCheck } from 'react-icons/ci';
import styles from './message-box.module.scss';

import { MessageBoxProps } from './message-box.type';
import Heading from '@organisms/Heading/heading.component';

const MessageBox = ({type, title, text}: MessageBoxProps) => {
  return (
    <div className={`${styles.messageBox} ${type === 'error' ? styles.boxTypeError : type === 'warning' ? styles.boxTypeWarning : styles.boxTypeError}`}>
      <div className={styles.messageBoxIcon}>
        {type === 'error' ? <CiCircleRemove /> : type === 'warning' ? <CiCircleAlert /> : <CiCircleCheck />}
      </div>
      <div className={styles.messageBoxContent}>
        <Heading type={'h4'} text={title} />
        <p>{text}</p>
      </div>
    </div>
  )
};

export default MessageBox;