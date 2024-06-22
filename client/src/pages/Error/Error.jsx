import React from 'react';
import styles from './error.component.css';

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 Page Not Found</h1>
    </div>
  )
}

export default React.memo(ErrorPage)