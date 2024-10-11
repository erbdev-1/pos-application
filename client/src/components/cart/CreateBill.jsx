/*Cart Page Form and Modal */

import { Button, Card, Form, Input, Modal, Select } from "antd";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          name="Customer Name"
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
          name={"Telephone Number"}
          label="Telephone Number"
        >
          <Input placeholder="Write a Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          rules={[{ required: true }]}
          name={"PaymentMethod"}
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
