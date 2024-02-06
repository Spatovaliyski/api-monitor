import React from 'react'

import styles from './container.module.scss';

/** 
 * A simple container (wrapper) for the page(s). It comes with pre-defined spaces
 * 
 * @param {Object} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
const SiteContainer = ({ children, className }: any) => {
  return (
    <div className={`${styles.siteContainer} ${className}`}>
      {children}
    </div>
  )
};

export default SiteContainer;