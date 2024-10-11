import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
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
        <div
          key={item._id}
          className="prouct-item border hover:shadow-lg cursor-pointer transition-all select-none"
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
      ))}
    </div>
  );
};

export default Products;
