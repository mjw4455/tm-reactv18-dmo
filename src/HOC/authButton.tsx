import { useRouteLoaderData } from "react-router-dom";
import { Button } from "antd";
export default function AuthButton(props: any) {
  const { menuList } = useRouteLoaderData("layout");
  if (!props.auth || !menuList.includes(props.auth)) {
    return <></>;
  } else {
    return <Button {...props}>{props.children}</Button>;
  }
}

//使用方法：<AuthButton auth="user@create" type="primary" onClick={handleReset}>管理员</AuthButton>
