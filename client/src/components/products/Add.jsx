import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

//! Add Component
const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  // Form instance creation using Ant Design's useForm hook
  const [form] = Form.useForm();

  console.log(categories);

  // Function to handle form submission

  const onFinish = (values) => {
    // console.log(values);
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product added successfully.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Return statement

  return (
    // Modal component for adding a new category

    <Modal
      title="Add New Product"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)} // Close the modal
      footer={false} //Delete the bottom part of the modal
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Add Product"
          rules={[
            { required: true, message: "Product Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Please write the product name." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product Image"
          rules={[
            { required: true, message: "Product Image Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Please write the product image" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            { required: true, message: "Product Price Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Please write the product price" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select Category"
          rules={[
            { required: true, message: "Category Field Cannot Be Empty!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
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
