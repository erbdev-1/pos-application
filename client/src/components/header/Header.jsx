/*Use Link with homepage,shoppingcart... */
import { Link } from "react-router-dom";
import { Badge, Input } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2x1 font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Search Product"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div className="menu-links flex justify justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-2 px-4 py-1">
          <Link
            to={"/"}
            className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Home</span>
          </Link>

          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className="menu-link flex flex-col hover:text-[#40a9ff] transition-all"
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Shopping Cart</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className="menu-link flex flex-col  hover:text-[#40a9ff] transition-all"
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Invoice</span>
          </Link>
          <Link
            to={"/customers"}
            className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Customers</span>
          </Link>
          <Link
            to={"/statistic"}
            className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all "
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </Link>
          <Link
            to={"/stock"}
            className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all "
          >
            <StockOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Stock</span>
          </Link>
          <Link
            to={"/"}
            className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Log out</span>
          </Link>
        </div>
        <Badge count={5} offset={[0, 0]} className="md:hidden flex">
          <Link
            to={"/"}
            className="menu-link flex flex-col  hover:text-[#40a9ff] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Shopping Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
