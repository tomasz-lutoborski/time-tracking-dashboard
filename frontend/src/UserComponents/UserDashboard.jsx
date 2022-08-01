import PeriodSelections from './PeriodSelections';
import UserInfo from './UserInfo';
import styles from './UserDashboard.module.css';

function UserDashboard() {
  return (
    <div className={styles.container}>
      <UserInfo className={styles.userInfo} />
      <PeriodSelections className={styles.periodSelections} />
    </div>
  );
}

export default UserDashboard;