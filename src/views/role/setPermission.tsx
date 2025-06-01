import React, { useState, useImperativeHandle, useEffect } from "react";
import { Tree, Modal, Form } from "antd";
import type { TreeProps } from "antd";
import API from "@/api/roleApi";

interface CreateRoleProps {
  mref: React.RefObject<{
    openModal: (data?: any) => void;
  } | null>;
}

export default function SetPermission(props: CreateRoleProps) {
  const [form] = Form.useForm();
  const [action, setAction] = useState<string>("");
  const [menuList, searchMenuList] = useState<any[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMenuList = async () => {
    try {
      const res = await API.getMenuList({});
      console.log("res===", res);
      //   searchMenuList(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      // let res = null;
      try {
        if (action === "add") {
        } else {
        }
      } catch (error) {
        console.error(error);
      }
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = (item?: any) => {
    setAction(item?.edit);
    setIsModalOpen(true);
    form.resetFields();
    setCheckedKeys(item?.permissionList.checkedKeys || []);
    // if (typeof item === "object") {
    //   item.edit == "edit" &&
    //     form.setFieldsValue({
    //       _id: item._id,
    //       roleName: item.roleName,
    //       remark: item.remark,
    //     });
    //   item.edit == "add" &&
    //     form.setFieldsValue({
    //       _id: item._id,
    //     });
    // }
  };

  useImperativeHandle(props.mref, () => ({
    openModal,
  }));

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <>
      <Modal
        title={action === "add" ? "新增角色" : "编辑角色"}
        width={600}
        cancelText="取消"
        okText="确定"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelAlign="right" labelCol={{ span: 4 }} form={form}>
          <Form.Item label="角色名称"></Form.Item>
          <Form.Item label="权限">
            <Tree
              checkable
              defaultExpandAll
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              fieldNames={{
                key: "_id",
                title: "menuName",
                children: "children",
              }}
              treeData={menuList}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
