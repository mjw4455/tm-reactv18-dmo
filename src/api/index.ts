import uesAxios from "@/utils/request";
import { ApiParams, IResponse } from "@/types/api";

export default {
  login: (params: ApiParams.ILoginParams) =>
    uesAxios.post("/api/users/login", {
      params,
    }),
  //获取部门信息
  getDept: (params: ApiParams.IDeptSearchParams) =>
    uesAxios.get<IResponse<ApiParams.IDept[]>>("/api/dept/list", {
      params,
    }),
  //获取用户列表
  getUserList: () =>
    uesAxios.get<IResponse<ApiParams.IUserList>>("/api/users/list", {}),
  //新增部门
  createDept: (data: ApiParams.IDept) =>
    uesAxios.post<IResponse<string>>("/api/dept/create", {
      data,
    }),
  //编辑部门
  updateDept: (data: ApiParams.IDept) =>
    uesAxios.post<IResponse<string>>("/api/dept/edit", {
      data,
    }),
  //删除部门
  deleteDept: (id: string) =>
    uesAxios.post<IResponse<string>>("/api/dept/delete", {
      params: {
        _id: id,
      },
    }),
};
