import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCarousel from "../../components/auth/AuthCarousel";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({ username: user.username, email: user.email })
        );
        message.success("User logged in successfully");
        navigate("/");
      } else if (res.status === 404) {
        message.error("User not found!");
      } else if (res.status === 403) {
        message.error("Invalid password!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Failed to log in user");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Fill in the E-mail Field!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Fill in the Password Field!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account?&nbsp;
            <Link to="/register" className="text-blue-600">
              Register now!
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="images/responsive.svg"
                  title="Responsive"
                  desc="Compatibility on All Devices"
                />
                <AuthCarousel
                  img="images/statistic.svg"
                  title="Statistic"
                  desc="Widely Kept Statistics"
                />
                <AuthCarousel
                  img="images/customer.svg"
                  title="Customer Happiness"
                  desc="Satisfied Customers with the Product Experience"
                />
                <AuthCarousel
                  img="images/admin.svg"
                  title="Control Panel"
                  desc="Manage a Single Panel"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
