import { useState } from "react";
import { Table, Card, Button, message, Popconfirm } from "antd";
import Header from "../components/header/Header";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../redux/cartSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => (
        <img src={text} alt="" className="w-full h-20 object-cover " />
      ),
    },
    {
      title: "Product name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>£ {text}</span>,
    },
    {
      title: "Product quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center ">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increaseQuantity(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (
                    window.confirm("Are you sure you want to delete this item?")
                  ) {
                    dispatch(decreaseQuantity(record));
                    message.success("Item deleted successfully");
                  }
                } else {
                  dispatch(decreaseQuantity(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Total price",
      dataIndex: "total",
      render: (text, record) => (
        <span>£ {(record.quantity * record.price).toFixed(2)}</span>
      ),
    },
    {
      title: "Actions",

      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => {
            dispatch(deleteProduct(record));
            message.success("Item deleted successfully");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4  ">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>£ {cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Tax %{cart.tax}</span>
              <span className="text-red-600">
                {" "}
                +£ {((cart.total * cart.tax) / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>£ {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}</b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
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
