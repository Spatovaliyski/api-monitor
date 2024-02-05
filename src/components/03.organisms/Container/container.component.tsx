import React from 'react'

import styles from './container.module.scss';

const Container = ({ children, className }: any) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
};

export default Container;