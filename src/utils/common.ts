export function getMenuMeta(pathName: string, menuList: any[]): any {
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i];
    if (item.path === pathName) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      const result = getMenuMeta(pathName, item.children);
      if (result) return result;
    }
  }
  return null;
}
