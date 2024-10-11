import { Button, Form, Input, message, Modal } from "antd";
import React from "react";

//! Add Component
const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  // Form instance creation using Ant Design's useForm hook
  const [form] = Form.useForm();

  // Function to handle form submission

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category added successfully.");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Return statement

  return (
    // Modal component for adding a new category

    <Modal
      title="Add New Category"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)} // Close the modal
      footer={false} //Delete the bottom part of the modal
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Add Category"
          rules={[
            { required: true, message: "Category Field Cannot Be Empty!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
