import React from 'react'

import styles from '@organisms/Navigation/navigation.module.scss';
import { NavigationItemProps } from './navigation-item.type';

const NavigationItem = ({ className, href, label, icon }: NavigationItemProps) => {
  return (
    <li className={`${className} ${styles.navigationItem}`}>{icon}<a href={href}>{label}</a></li>
  )
};

export default NavigationItem;