import './App.css';
import styles from './App.module.css';
import UserDashboard from './UserComponents/UserDashboard';
import TrackersBoard from './TrackersComponents/TrackersBoard';

function App() {
  return (
    <div className={styles.container}>
      <UserDashboard />
      <TrackersBoard />
    </div>
  );
}

export default App;
