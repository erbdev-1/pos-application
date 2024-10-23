/*Cart Page Form and Modal */

import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${serverUrl}/api/bills/add-bill`, {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setIsModalOpen(false);
        message.success("Order created successfully");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Failed to create order");
    }
  };

  return (
    <Modal
      title="Create Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[
            {
              required: true,
              message: "Customer Name is required",
            },
          ]}
        >
          <Input placeholder="Write a Customer Name " />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
          label="Telephone Number"
        >
          <Input placeholder="Write a Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Select a Payment Method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit/Debit Cards">
              Credit/Debit Cards
            </Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>£ {cart.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Tax %{cart.tax}</span>
            <span className="text-red-600">
              +£ {((cart.total * cart.tax) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <b>Total</b>
            <b>£ {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}</b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
