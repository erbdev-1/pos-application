import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Header from "../components/Header/Header";
import PrintBill from "../components/bills/PrintBill";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bills/get-all");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Client Name",
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
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>£ {text}</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => setIsModalOpen(true)}
          >
            Print
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Customer Bills</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default BillPage;
