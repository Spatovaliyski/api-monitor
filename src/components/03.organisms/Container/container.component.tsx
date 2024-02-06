import React from 'react'

import styles from './container.module.scss';

/** 
 * A simple container (wrapper) for components. It comes with pre-defined spaces
 * 
 * @param {Object} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
const Container = ({ children, className }: any) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
};

export default Container;