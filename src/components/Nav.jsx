import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { FaBox } from "react-icons/fa";
import { useContext } from 'react';
import { productcontext } from '../utils/Context';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

function Nav() {
  const [products]=useContext(productcontext);
  let uniquecategory = products && products.reduce((acc,cv)=>[...acc,cv.category],[]);
  uniquecategory =[...new Set(uniquecategory)];

  const {search,pathname} = useLocation();
  
 
  
  return (
    <nav className="fixed  w-[20%] inset-y-0 left-0 bg-[#fff] text-white  p-5 md:relative">
        
        {(pathname != "/" || search.length >0)
        &&
        <Link to="/">
        <button className="w-full  py-2 px-4 bg-[#000] text-[#fff] rounded-lg font-semibold hover:bg-[#505050] flex items-center gap-2">
          <IoHomeOutline size={20} /> Go to home
        </button>
        </Link>
        }
        
        <Link to="/create">
        <button className="w-full mt-5 py-2 px-4 bg-[#000] text-[#fff] rounded-lg font-semibold hover:bg-[#505050] flex items-center gap-2">
          <FiPlusCircle size={20} /> Add new products
        </button>
        </Link>

        
        <h1 className="mt-6 text-lg font-bold text-[#000000]">Category Filter</h1>
        <div className="mt-4 space-y-2">
          {uniquecategory.map((c,i)=>(
            <Link to={`/?category=${c}`} key={i} className="flex items-center gap-2 p-3 rounded-lg text-[#000000] hover:text-[#ffffff] hover:bg-[#000000]">
            <FaBox size={20} /> {c}
          </Link>
          ))}
          
        </div>
    </nav>
  )
}

export default Nav