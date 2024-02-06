import { CiCircleRemove, CiCircleAlert, CiCircleCheck } from 'react-icons/ci';
import styles from './message-box.module.scss';

import { MessageBoxProps } from './message-box.type';
import Heading from '@organisms/Heading/heading.component';

/** 
 * A Customized MessageBox component, it's meant to display certain messages to the user with levels of severity
 * 
 * @param {MessageBoxProps} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
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