import styles from "./index.module.less";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Table, Form, Input, Spin, Modal,message } from "antd";
import type { TableColumnsType } from "antd";
import { useState, useEffect, useRef } from "react";
import API from "@/api";
import { ApiParams } from "@/types/api";
import moment from "moment";
import CreateDept from "./createDept.tsx";

const { confirm } = Modal;

export default function Dept() {
  const deptRef = useRef<{
    openModal: (data?: ApiParams.IDept | string | undefined) => void;
  }>(null);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deptList, setDeptList] = useState<ApiParams.IDept[]>([]);

  const handleCreate = (item?: ApiParams.IDept) => {
    let obj: any = { ...{ edit: "add" }, ...item };
    deptRef.current?.openModal(obj);
  };
  const handleEdit = (item: ApiParams.IDept) => {
    let obj: any = { ...{ edit: "edit" }, ...item };
    deptRef.current?.openModal(obj);
  };
  const handleDelete = (id: string) => {
    confirm({
      title: "是否执行该操作?",
      icon: <ExclamationCircleFilled />,
      content: "删除该部门将无法恢复，请谨慎操作!",
      okText: "确定",
      cancelText: "取消",
      centered: true,
      async onOk() {
        setLoading(true);
        try {
          const res = await API.deleteDept(id);
          if (res.data.code == 200) {
            message.success({
              content: "删除成功",
            });
            getDeptList();
          }
        } catch (error) {}
        setLoading(false);
      },
      onCancel() {},
    });
  };

  const columns: TableColumnsType<ApiParams.IDept> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "_id",
      width: "20%",
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
      title: "负责人",
      dataIndex: "userName",
      key: "_id",
    },
    {
      title: "操作",
      dataIndex: "action",
      width: 250,
      render: (_, record) => {
        return (
          <div className={styles.action}>
            <Button type="primary" onClick={() => handleCreate(record)}>
              新增
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

  const getDeptList = async () => {
    try {
      setLoading(true);
      const res = await API.getDept({
        deptName: form.getFieldValue("deptName"),
      });
      // console.log(res)
      setDeptList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    getDeptList();
  }, []);

  return (
    <div className="wrap-table">
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="部门名称" name="deptName">
          <Input placeholder="请输入部门名称" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" onClick={getDeptList}>
            查询
          </Button>
          <span style={{ marginLeft: "10px" }}>
            <Button type="primary" htmlType="submit" onClick={handleReset}>
              重置
            </Button>
          </span>
        </Form.Item>
      </Form>
      <div className="header">
        <div className="title">部门列表</div>
        <div className="action">
          <Button type="primary" onClick={() => handleCreate()}>
            新增
          </Button>
        </div>
      </div>
      <Spin tip="加载中..." spinning={loading}>
        <Table<ApiParams.IDept>
          rowKey="_id"
          columns={columns}
          dataSource={deptList}
        />
      </Spin>
      <CreateDept
        mref={deptRef}
        deptList={deptList}
        getDeptList={getDeptList}
      />
    </div>
  );
}
