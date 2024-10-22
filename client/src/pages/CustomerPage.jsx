import { Table } from "antd";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bills/get-all");
        const data = await response.json();
        setBillItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 16)}</span>;
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
    </>
  );
};

export default CustomerPage;
