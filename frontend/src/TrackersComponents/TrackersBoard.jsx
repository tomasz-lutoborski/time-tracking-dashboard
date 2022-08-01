import Tracker from './Tracker';
import styles from './TrackersBoard.module.css';

function TrackersBoard() {
  return (
    <div className={styles.container}>
      <Tracker />
      <Tracker />
      <Tracker />
      <Tracker />
      <Tracker />
      <Tracker />
    </div>
  );
}

export default TrackersBoard;