
import styles from "./index.module.less";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles["welcome-title"]}>Welcome</div>
    </div>
  );
}

export default Welcome;
