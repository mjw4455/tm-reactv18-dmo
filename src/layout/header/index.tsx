import styles from "./index.module.less";
import storage from "@/utils/storage";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Switch } from "antd";
import { useStore } from "@/store";

export default function NavHeader() {
  const { collapsed, updateCollapsed, isDark, updateIsDark } = useStore();
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "邮箱",
    },
    {
      key: "logout",
      label: "退出",
    },
  ];
  const menuItemClick = ({ key }: { key: string }) => {
    console.log(key);
    if (key === "email") {
    } else if (key === "logout") {
      storage.remove("token");
      window.location.href = "/login";
    }
  };
  const handleSwitch = (checked: boolean) => {
    if (checked) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.remove("dark");
    }
    updateIsDark(checked);
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => updateCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className={styles.right}>
        <span className={styles.spanSwitch}>
          <Switch
            checkedChildren="暗黑"
            unCheckedChildren="默认"
            checked={isDark}
            onChange={handleSwitch}
          />
        </span>
        <Dropdown menu={{ items, onClick: menuItemClick }} placement="bottom">
          <div>
            <span className={styles.nickname}>李星云</span>
            <CaretDownOutlined style={{ marginLeft: "3px" }} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
