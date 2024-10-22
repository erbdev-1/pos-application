import { Button, message } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  reset,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Items In The Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto ">
        {cart.cartItems.length > 0
          ? cart.cartItems
              .map((item) => (
                <li key={item._id} className="cart-item flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.img}
                      alt=""
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => {
                        dispatch(deleteProduct(item));
                        message.success("Item deleted successfully");
                      }}
                    />
                    <div className="flex flex-col ml-2">
                      <b>{item.title}</b>
                      <span>
                        £ {item.price} * {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <Button
                      type="primary"
                      size="small"
                      className="w-full  flex items-center justify-center !rounded-full"
                      icon={<PlusCircleOutlined />}
                      onClick={() => dispatch(increaseQuantity(item))}
                    />
                    <span className="font-bold w-6 inline-block text-center">
                      {item.quantity}
                    </span>
                    <Button
                      type="primary"
                      size="small"
                      className="w-full  flex items-center justify-center !rounded-full"
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        if (item.quantity === 1) {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this item?"
                            )
                          ) {
                            dispatch(decreaseQuantity(item));
                            message.success("Item deleted successfully");
                          }
                        } else {
                          dispatch(decreaseQuantity(item));
                        }
                      }}
                    />
                  </div>
                </li>
              ))
              .reverse()
          : "No items in the cart"}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Sub Total</b>
            <span>£ {cart.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax %{cart.tax} </b>
            <span className="text-red-700">
              +£ {((cart.total * cart.tax) / 100).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total</b>
            <span className="text-xl">
              £ {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Create Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<DeleteOutlined />}
            danger
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete all items?")
              ) {
                dispatch(reset());
                message.success("All items deleted successfully");
              }
            }}
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
