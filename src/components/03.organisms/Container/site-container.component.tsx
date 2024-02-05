import React from 'react'

import styles from './container.module.scss';

const SiteContainer = ({ children, className }: any) => {
  return (
    <div className={`${styles.siteContainer} ${className}`}>
      {children}
    </div>
  )
};

export default SiteContainer;