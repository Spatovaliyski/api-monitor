import React from 'react'

import styles from './header.module.scss';
import Container from '@organisms/Container/container.component';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h1 className={styles.headerTitle}>Martin`s super <strike>advanced</strike>&nbsp;simple API monitor!</h1>
      </Container>
    </header>
  )
};

export default Header;