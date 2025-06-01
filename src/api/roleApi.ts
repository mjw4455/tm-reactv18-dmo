import uesAxios from "@/utils/request";
import { ApiParams, IResponse, IResponseList } from "@/types/api";

export default {
  //获取角色列表
  getRoleList: (params: ApiParams.IRoleSearchParams) =>
    uesAxios.get<IResponse<IResponseList<ApiParams.IRole>>>("/api/roles/list", {
      params,
    }),
  //添加角色
  createRole: (data: ApiParams.IRoleCreateParams) =>
    uesAxios.post("/api/roles/create", { data }),
  //删除角色
  editRole: (data: ApiParams.IRoleEditParams) =>
    uesAxios.post("/api/roles/edit", { data }),
  //删除角色
  deleteRole: (id: string) =>
    uesAxios.post<IResponse<any>>("/api/roles/delete", { data: { _id: id } }),
  //更新权限
  updatePermission: (data: ApiParams.Permission) =>
    uesAxios.post("/api/roles/update/permission", { data }),
  //获取菜单
  getMenuList: (params: any) =>
    uesAxios.get<IResponse<any>>("/api/menu/list", {
      params,
    }),
  getPermissionList: (params: any) =>
    uesAxios.get<IResponse<any>>("/api/users/getPermissionList", {
      params,
    }),
};
