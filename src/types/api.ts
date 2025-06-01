export interface IResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface IResponseList<T> {
  list: T[];
  page: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
}

export declare namespace ApiParams {
  //登录模块
  interface ILoginParams {
    username: string;
    password: string;
  }

  //部门模块
  interface IDeptSearchParams {
    deptName?: string;
  }

  interface IDept {
    _id: string;
    createTime: string;
    updateTime: string;
    deptName: string;
    parentId: string;
    userName: string;
    children: IDept[];
  }

  interface IUser {
    userImg: string;
    createTime: string;
    userId: number;
    userName: string;
    userEmail: string;
    mobile: string;
    sex: number;
    deptId: string;
    deptName: string;
    job: string;
    state: number;
    role: number;
    createId: number;
    lastLoginTime: string;
    roleList: string;
  }

  interface IUserList {
    list: IUser[];
    page: {
      pageNum: number;
      pageSize: number;
      total: number;
    };
  }

  interface IpageParams {
    pageNum: number;
    pageSize: number;
  }

  interface IRole {
    _id: string;
    roleName: string;
    remark: string;
    permissions: {
      checkedKeys: string[];
      halfCheckedKeys: string[];
    };
    createTime: string;
    updateTime: string;
  }

  interface IRoleSearchParams extends IpageParams {
    roleName?: string;
  }

  interface IRoleCreateParams {
    roleName: string;
    remark: string;
  }

  interface IRoleEditParams extends IRoleCreateParams {
    _id: string;
  }

  interface Permission {
    _id: string;
    permissions: {
      checkedKeys: string[];
      halfCheckedKeys: string[];
    };
  }
}
