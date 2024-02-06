import React from 'react'

import styles from './navigation.module.scss';

/** 
 * Navigation / Not really made to be functional, this is just demonstrative
 * 
 * @param {Object} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
const Navigation = ({ children }: any) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationInner}>
        {children}
      </ul>
    </nav>
  )
};

export default Navigation;