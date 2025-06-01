import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, message } from "antd";
import { ApiParams } from "@/types/api";
import API from "@/api";

interface CreateRoleProps {
  mref: React.RefObject<{
    openModal: (data?: ApiParams.IRole | string | undefined) => void;
  } | null>;
}

export default function CreateRole(props: CreateRoleProps) {
  const [form] = Form.useForm();
  const [action, setAction] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      let res = null;
      try {
        if (action === "add") {
          res = await API.createDept(values);
          message.success({
            content: "添加成功",
          });
        } else {
          res = await API.updateDept(values);
          res.data.code == 200 &&
            message.success({
              content: "修改成功",
            });
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
    if (typeof item === "object") {
      item.edit == "edit" &&
        form.setFieldsValue({
          _id: item._id,
          roleName: item.roleName,
          remark: item.remark,
        });
      item.edit == "add" &&
        form.setFieldsValue({
          _id: item._id,
        });
    }
  };

  useImperativeHandle(props.mref, () => ({
    openModal,
  }));

  return (
    <>
      <Modal
        title={action === "add" ? "新增角色" : "编辑角色"}
        width={800}
        cancelText="取消"
        okText="确定"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelAlign="right" labelCol={{ span: 4 }} form={form}>
          <Form.Item hidden label="_id" name="_id">
            <Input disabled></Input>
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="请输入角色名称"></Input>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

// let resuts: any = [];
// function limitRequest(taskArray: any[], maxCount: number) {
//   return new Promise((resolve) => {
//     let taskQueue: any = taskArray;

//     let finished = 0;
//     let flagIndex = maxCount - 1;

//     async function handleTask(task: any, index: number) {
//       const res = await task();
//       ++finished;
//       resuts[index] = res;
//       taskQueue.splice(taskQueue.indexOf(task), 1, "true");
//       if (flagIndex < taskQueue.length - 1) {
//         ++flagIndex;
//         handleTask(taskQueue[flagIndex], flagIndex);
//       }
//       if (finished === taskQueue.length) {
//         resolve(resuts);
//       }
//     }

//     for (let i = 0; i < maxCount; i++) {
//       handleTask(taskQueue[i], i);
//     }
//   });
// }

// async function maxRequest(taskArray: any[], maxCount: number) {
//   let taskQueue: any = [];
//   let results: any = Array(taskArray.length);

//   for (let i = 0; i < taskArray.length; i++) {
//     const task = taskArray[i];

//     const p = Promise.resolve()
//       .then(() => task())
//       .then((res) => {
//         results[i] = res;
//         taskQueue.splice(taskQueue.indexOf(p), 1);
//       });

//     taskQueue.push(p);

//     if (taskQueue.length >= maxCount) {
//       await Promise.race(taskQueue);
//     }
//   }

//   await Promise.all(taskQueue);
//   return results;
// }

// async function main() {
//   // 模拟请求任务
//   const createTask = (id: number, delay: number) => {
//     return () => {
//       return new Promise((resolve) => {
//         console.log(`任务 ${id} 开始执行`);
//         setTimeout(() => {
//           console.log(`任务 ${id} 在 ${delay}ms 后完成`);
//           resolve({ id, delay });
//         }, delay);
//       });
//     };
//   };

//   // 创建10个请求任务
//   const tasks = [
//     createTask(1, 1000),
//     createTask(2, 2000),
//     createTask(3, 1500),
//     createTask(4, 800),
//     createTask(5, 3000),
//     createTask(6, 1200),
//     createTask(7, 2500),
//     createTask(8, 900),
//     createTask(9, 1700),
//     createTask(10, 1300),
//   ];

//   console.log("开始执行任务...");
//   // await limitRequest(tasks, 3);
//   const resuts = await maxRequest(tasks, 3);
//   console.log("任务完成...", resuts);
// }

// main();
