import React, { useState } from "react";
import { Table, Card, Button } from "antd";
import Header from "../components/Header/Header";
import CreateBill from "../components/cart/CreateBill";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4  ">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>£ 55.80</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Tax</span>
              <span className="text-red-600">+£ 7.80</span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>£ 55.80</b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Create Order
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
