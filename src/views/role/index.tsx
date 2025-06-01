import styles from "./index.module.less";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Table, Form, Input, Spin, Modal, message } from "antd";
import type { TableColumnsType } from "antd";
import { useState, useRef } from "react";
import API from "@/api/roleApi";
import { ApiParams } from "@/types/api";
import moment from "moment";
import CreateRole from "./createRole";
import { useAntdTable } from "ahooks";
import SetPermission from "./setPermission";

const { confirm } = Modal;

export default function Role() {
  const deptRef = useRef<{
    openModal: (data?: ApiParams.IRole | string | undefined) => void;
  }>(null);

  const preRef = useRef<{
    openModal: (data?: any) => void;
  }>(null);

  const [form] = Form.useForm();
  const [loading] = useState(false);
  // const [roleList, setRoleList] = useState<ApiParams.IRole[]>([]);

  const handleCreate = () => {
    let obj: any = { edit: "add" };
    deptRef.current?.openModal(obj);
  };
  const handleEdit = (item: ApiParams.IRole) => {
    let obj: any = { ...{ edit: "edit" }, ...item };
    deptRef.current?.openModal(obj);
  };

  const setPermission = () => {};

  const columns: TableColumnsType<ApiParams.IRole> = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "_id",
      width: "20%",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "_id",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "_id",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "_id",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      dataIndex: "action",
      width: 250,
      render: (_, record) => {
        return (
          <div className={styles.action}>
            <Button type="primary" onClick={() => setPermission()}>
              权限
            </Button>
            <Button type="primary" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const getRoleList = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: ApiParams.IRoleSearchParams
  ) => {
    try {
      const res = await API.getRoleList({
        ...formData,
        ...{
          pageNum: current,
          pageSize: pageSize,
        },
      });
      return {
        total: res.data.data.page.total,
        list: res.data.data.list,
      };
    } catch (error) {
      console.error("获取角色列表失败", error);
      return {
        total: 0,
        list: [],
      };
    }
  };

  const { tableProps, search } = useAntdTable(getRoleList, {
    form: form,
    defaultPageSize: 5,
  });

  const handleDelete = (id: string) => {
    confirm({
      title: "是否执行该操作?",
      icon: <ExclamationCircleFilled />,
      content: "删除该角色将无法恢复，请谨慎操作!",
      okText: "确定",
      cancelText: "取消",
      centered: true,
      async onOk() {
        try {
          const res = await API.deleteRole(id);
          if (res.data.code === 200) {
            message.success({
              content: "删除成功",
            });
            search.submit();
          }
        } catch (error) {}
      },
      onCancel() {},
    });
  };

  return (
    <div className="wrap-table">
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="角色名称" name="roleName">
          <Input placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" onClick={search.submit}>
            查询
          </Button>
          <span style={{ marginLeft: "10px" }}>
            <Button type="primary" htmlType="submit" onClick={search.reset}>
              重置
            </Button>
          </span>
        </Form.Item>
      </Form>
      <div className="header">
        <div className="title">角色列表</div>
        <div className="action">
          <Button type="primary" onClick={() => handleCreate()}>
            新增
          </Button>
        </div>
      </div>
      <Spin tip="加载中..." spinning={loading}>
        <Table<ApiParams.IRole>
          rowKey="_id"
          columns={columns}
          {...tableProps}
        />
      </Spin>
      <CreateRole mref={deptRef} />
      <SetPermission mref={preRef} />
    </div>
  );
}
