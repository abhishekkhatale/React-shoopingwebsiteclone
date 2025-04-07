import axios from "../utils/Axios";
import { FaStar } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useContext } from "react";
import { productcontext } from "../utils/Context";

export default function Details() {
  const [products, setproducts] = useContext(productcontext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  //  const getsingleproduct= async ()=>{
  //     try{
  //         const{data}= await axios.get(`/products/${id}`);

  //         setProduct(data);

  //     }catch{
  //         console.log(error)
  //     }
  //  }

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }

    // getsingleproduct();
  }, []);

  const productdeletehandler = (id) => {
    const filtreredproduct = products.filter((p) => p.id !== id);
    setproducts(filtreredproduct);
    localStorage.setItem("products", JSON.stringify(filtreredproduct));
    navigate(`/`);
  };

  return product ? (
    <div className="w-full h-screen flex-col flex justify-center gap-10 items-center">
      <Link
        to={`/`}
        className="text-sm bg-[#000] px-3 py-2 text-[#fff] rounded-md hover:bg-[#3b3b3b]"
      >
        Back to Home
      </Link>
      {
        <div
          key={product.id}
          className="max-w-4xl h-fit justify-center items-center mx-auto p-6 bg-white text-black rounded-lg shadow-md flex flex-col md:flex-row"
        >
          <img
            className={"w-full md:w-1/3 h-80 object-cover rounded-lg"}
            src={product.image}
            alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
          />
          <div className="md:ml-6 flex-1">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.category}</p>

            <p className="mt-4 text-lg font-semibold">${product.price}</p>
            <p className="mt-2 text-gray-700 text-sm">{product.description}</p>
            <div className="mt-4 flex space-x-4">
              <Link
                to={`/edit/${product.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700"
              >
                <FiEdit className="mr-2" /> Edit
              </Link>
              <button
                onClick={() => productdeletehandler(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700"
              >
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  ) : (
    <Loading />
  );
}
