/*Use Link with homepage,shoppingcart... */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Input, message } from "antd";
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
import "./index.css";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation(); // get current path name to set active class for menu item
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Do you want to log out?")) {
      localStorage.removeItem("userInfo");
      navigate("/login");
      message.success("Log out successfully");
    }
  };
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2x1 font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Search Product"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links ">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" ? "active" : ""} `}
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
              className={`menu-link ${pathname === "/cart" ? "active" : ""}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Shopping Cart</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link ${pathname === "/bills" ? "active" : ""}`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Invoice</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${pathname === "/customers" ? "active" : ""}`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Customers</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link ${pathname === "/statistic" ? "active" : ""}`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </Link>
          {/* <Link
            to={"/stock"}
            className={`menu-link ${pathname === "/stock" ? "active" : ""}`}
          >
            <StockOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Stock</span>
          </Link> */}
          <div onClick={logOut}>
            <Link className={`menu-link `}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Log out</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/cart" ? "active" : ""}`}
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
