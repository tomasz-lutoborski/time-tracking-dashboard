import styles from './Tracker.module.css';

function Tracker() {
  return (
    <div className={styles.container}>
      <h1>Tracker</h1>
      <div className={`${styles.background} ${styles.backgroundExercise}`}></div>
    </div>
  )
}

export default Tracker;