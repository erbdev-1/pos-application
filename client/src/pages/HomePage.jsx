import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetching all categories from the database and setting the state
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();

        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            }) // Adding a value property to each category object
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

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
    <>
      <Header />
      {/* HomePage */}
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] md:pb-64">
          <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
          />
        </div>
        <div className="cart-wrapper min-w-[300px]  md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
