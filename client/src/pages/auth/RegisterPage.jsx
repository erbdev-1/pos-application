import { Button, Form, Input, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      if (res.status === 200) {
        message.success("User registered successfully");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Failed to register user");
      console.log(error);
      navigate("/register");
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative ">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Fill in the Username Field!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Password Repeat"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Fill in the Password Repeat Field!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords Must Be the Same!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account?&nbsp;
            <Link to="/login" className="text-blue-600">
              Sign in now!
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden  bg-[#6c63ff] h-full  ">
          <div className="w-full h-full flex items-center ">
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

export default RegisterPage;
