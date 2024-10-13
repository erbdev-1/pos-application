import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductItem({ item }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct(item));
  };

  console.log(cart.cartItems);

  return (
    <div
      className="prouct-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>£ {item.price}</span>
      </div>
    </div>
  );
}

export default ProductItem;
