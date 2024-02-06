import React from 'react'
import { HeadingProps } from './heading.type';
import styles from './heading.module.scss';

/** 
 * Custom Heading with pre-defined classes for styling
 * 
 * @param {HeadingProps} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
const Heading = ({ type, text, className }: HeadingProps) => {
  return (
    <div className={styles.heading}>
      {type === 'h1' && <h1 className={`${className} ${styles.headingTitle}`}>{text}</h1>}
      {type === 'h2' && <h2 className={`${className} ${styles.headingTitle}`}>{text}</h2>}
      {type === 'h3' && <h3 className={`${className} ${styles.headingTitle}`}>{text}</h3>}
      {type === 'h4' && <h4 className={`${className} ${styles.headingTitle}`}>{text}</h4>}
      {type === 'h5' && <h5 className={`${className} ${styles.headingTitle}`}>{text}</h5>}
      {type === 'h6' && <h6 className={`${className} ${styles.headingTitle}`}>{text}</h6>}
    </div>
  )
};

export default Heading;