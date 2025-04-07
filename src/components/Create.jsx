import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productcontext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();
    const[products,setproducts] = useContext(productcontext);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

   

    const Addproducthandler =
        (e) => {
            e.preventDefault();

            if(title.trim().length <5 ||description.trim().length <5 ||category.trim().length <5 ||image.trim().length <5||price.trim().length <1){
                alert("Every feild mush have at least 5 characters ");
                return;
            }

            const product = {
                id : nanoid(),
                title,
                price,
                description,
                category,
                image
            };
            setproducts([...products,product])

            localStorage.setItem("products", JSON.stringify([...products,product]));

            toast.success("Product added");
            navigate('/');
            
        }

        console.log(products);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f1f1f1]">

            <Link to={`/`} className="text-sm bg-[#000] mb-10 px-3 py-2 text-[#fff] rounded-md hover:bg-[#3b3b3b]">Back to Home</Link>

            <form onSubmit={Addproducthandler}  className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full ">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Create Product</h2>
                
                <input
                    type='text'
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <input
                    type='number'
                    placeholder='Price'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <textarea
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                ></textarea>
                <input
                    type='text'
                    placeholder='Category'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <input
                    type='text'
                    placeholder='Image URL'
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    className="w-full p-2 mb-4 border border-gray-400 rounded-md bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition">Submit</button>
            </form>
        </div>
    );
}

export default Create;
