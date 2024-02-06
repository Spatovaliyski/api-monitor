import React from 'react'

import styles from './header.module.scss';
import Container from '@organisms/Container/container.component';

/** 
 * Header (Site Header) - Not used, 'deprecated' version
 * 
 * @returns {React.ReactElement} - The component
 * @deprecated
*/
const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h1 className={styles.headerTitle}>Martin`s super simple API monitor!</h1>
      </Container>
    </header>
  )
};

export default Header;