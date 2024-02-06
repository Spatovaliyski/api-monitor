import React from 'react'

import styles from '@organisms/Navigation/navigation.module.scss';
import { NavigationItemProps } from './navigation-item.type';

/** 
 * The NavigationItem component
 * 
 * @param {NavigationItemProps} props - The props of the component
 * @returns {React.ReactElement} - The component
 */
const NavigationItem = ({ className, href, label, icon }: NavigationItemProps) => {
  return (
    <li className={`${className} ${styles.navigationItem}`}>{icon}<a href={href}>{label}</a></li>
  )
};

export default NavigationItem;