import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

//!Edit Component

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  // State for managing the row currently being edited
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // Function to handle form submission

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("The product has been updated successfully.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          } else {
            return item;
          }
        })
      );
    } catch (error) {
      message.error("Something went wrong.");
      console.log(error);
    }
  };

  // Function to delete a category

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        fetch("http://localhost:5000/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("The category has been deleted successfully.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Something went wrong.");
        console.log(error);
      }
    }
  };

  // Column configuration for the table

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },

    {
      title: "Product Image",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return <img src={record.img} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Product Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true), setEditingItem(record);
              }}
            >
              Edit
            </Button>

            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // Return statement

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Add New Product"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)} // Close the modal
        footer={false} //Delete the bottom part of the modal
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
              {
                required: true,
                message: "Product Image Field Cannot Be Empty!",
              },
            ]}
          >
            <Input placeholder="Please write the product image" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[
              {
                required: true,
                message: "Product Price Field Cannot Be Empty!",
              },
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
