import React from 'react'

import styles from './navigation.module.scss';

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