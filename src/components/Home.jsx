import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { productcontext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

function Home() {
  const [products] = useContext(productcontext);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredproduct, setfilteredproduct] = useState(null);

  const getproductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredproduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredproduct || category == "undefined")
      setfilteredproduct(products);

    if (category != "undefined") {
      // getproductcategory();
      setfilteredproduct(products.filter((p)=> p.category == category))
    }
  }, [category, products]);

  console.log(products);

  return products ? (
    <>
      <Nav />
      <div className="p-10 w-[100%] flex flex-wrap overflow-x-hidden overflow-y-auto gap-7 ">
        {filteredproduct &&
          filteredproduct.map((p, i) => (
            <Link
              key={i}
              to={`/details/${p.id}`}
              className="w-[270px] mb-10 h-fit p-2 bg-white text-black rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-40 object-cover"
                src={p.image}
                alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
              />
              <div className="p-3">
                <h2 className="text-md font-bold">{p.title}</h2>
                <p className="text-gray-600 text-xs">{p.category}</p>
                <p className="mt-2 text-sm font-semibold">{p.price}</p>
                <p className="mt-2 text-xs text-gray-700">{p.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
