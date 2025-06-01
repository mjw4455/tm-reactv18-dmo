
import styles from "./index.module.less";

function NotFound403() {
  return (
    <div className={styles.welcome}>
      <div className={styles["welcome-title"]}>403,无权限访问该页面</div>
    </div>
  );
}

export default NotFound403;
