import React from 'react'

import styles from './TaskBar.module.css'

export default function TaskBar() {
  return (
    <div className={styles.container}>
        <div className={styles.spacer}>

        </div>
        <div className={styles.taskbar}>

        </div>
        <div className={styles.clock}>
            {Date.now().toLocaleString()}
        </div>
    </div>
  )
}
