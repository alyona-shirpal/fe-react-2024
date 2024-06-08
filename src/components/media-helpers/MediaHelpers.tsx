import type { PropsWithChildren } from 'react';

import styles from './mediaHelpers.module.css';
export const MobileOnly = ({ children }: PropsWithChildren) => <span className={styles.mobileOnly}>{children}</span>;
export const DesktopOnly = ({ children }: PropsWithChildren) => <span className={styles.desktopOnly}>{children}</span>;
