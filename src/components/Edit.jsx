import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productcontext } from "../utils/Context";
import { nanoid } from "nanoid";

function Edit() {
  const [products, setproducts] = useContext(productcontext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const changehandler = (e) => {
    // console.log(e.target.name,e.target.value);
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
    console.log(product);
  }, [id]);

  const Addproducthandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert("Every feild mush have at least 5 characters ");
      return;
    }
    console.log(product);

    const pi = products.findIndex((p) => p.id == id);
    const copydata = [...products];
    copydata[pi] = { ...products[id], ...product };

    setproducts(copydata);

    localStorage.setItem("products", JSON.stringify(copydata));

    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f1f1f1]">
      <Link
        to={`/`}
        className="text-sm bg-[#000] mb-10 px-3 py-2 text-[#fff] rounded-md hover:bg-[#3b3b3b]"
      >
        Back to Home
      </Link>

      <form
        onSubmit={Addproducthandler}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full "
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Edit Product
        </h2>

        <input
          type="text"
          placeholder="Title"
          onChange={changehandler}
          name="title"
          value={product && product.title}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={changehandler}
          name="price"
          value={product && product.price}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <textarea
          placeholder="Description"
          onChange={changehandler}
          name="description"
          value={product && product.description}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          onChange={changehandler}
          name="category"
          value={product && product.category}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={changehandler}
          name="image"
          value={product && product.image}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;
