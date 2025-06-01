import API from "@/api/roleApi";

//获取菜单路径
function getMenuPath(menuList: any[]): string[] {
  return menuList.reduce((pre: string[], item: any) => {
    return pre.concat(
      Array.isArray(item.children) && !item.buttons
        ? getMenuPath(item.children)
        : item.path
    );
  }, []);
}

export default async function AuthLoader() {
  const res = await API.getPermissionList({});
  const { menuList } = res.data.data;
  //['/home','/user','/role']
  const menuPathList = getMenuPath(menuList);
  return {
    menuList,
    menuPathList,
    buttonList: res.data.data.buttonList,
  };
}
