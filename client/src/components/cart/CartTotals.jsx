import { Button } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const CartTotals = () => {
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Items In The Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto ">
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP._RroWF4BahiY4ZWXcACHVwHaEo&pid=Api&P=0&h=180"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>£2.80 * 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP._RroWF4BahiY4ZWXcACHVwHaEo&pid=Api&P=0&h=180"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>£2.80 * 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP._RroWF4BahiY4ZWXcACHVwHaEo&pid=Api&P=0&h=180"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>£2.80 * 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP._RroWF4BahiY4ZWXcACHVwHaEo&pid=Api&P=0&h=180"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>£2.80 * 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP._RroWF4BahiY4ZWXcACHVwHaEo&pid=Api&P=0&h=180"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Apple</b>
              <span>£2.80 * 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Sub Total</b>
            <span>£ 55.80</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax </b>
            <span className="text-red-700">+£ 7.80</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total</b>
            <span className="text-xl">£ 55.80</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full">
            Create Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<DeleteOutlined />}
            danger
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
