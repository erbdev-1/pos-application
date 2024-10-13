import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./Add";

const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all"); // Fetch the products from the server
        const data = await res.json(); // Convert the response to JSON
        setProducts(data); // Set the products state to the data
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="products-wrapper grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
      {products.map((item) => (
        <ProductItem key={item._id} item={item} />
      ))}

      <div
        className="prouct-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div className="prouct-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90">
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
