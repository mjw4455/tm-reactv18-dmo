import { Breadcrumb } from "antd";
import { useState, useEffect, ReactNode } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";

const findTreeNode = (
  tree: any,
  pathname: string,
  path: string[]
): string[] => {
  if (!tree) return [];
  for (const item of tree) {
    path.push(item.menuName);
    if (item.path === pathname) {
      return path;
    }
    if (item.children) {
      const list = findTreeNode(item.children, pathname, path);
      if (list.length) return list;
    }
    path.pop();
  }
  return [];
};

export default function BreadTab() {
  const { pathname } = useLocation();
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([]);
  const { menuList } = useRouteLoaderData("layout");

  useEffect(() => {
    const list = findTreeNode(menuList, pathname, []);
    setBreadList([<a href="/welcome">首页</a>, ...list]);
  }, [pathname]);

  return (
    <div className="breadcrumb">
      <Breadcrumb items={breadList.map((item) => ({ title: item }))} />
    </div>
  );
}
