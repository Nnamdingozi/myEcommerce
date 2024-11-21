
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductDetails } from "@/app/lib/definition";
import { useProduct } from "@/app/context/productContext";
import { useCart } from "@/app/context/cartContext";
import { useUser } from "../context/userContext";
import Image from "next/image";

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const { products } = useProduct() as { products: ProductDetails[] };
  const [searchResults, setSearchResults] = useState<ProductDetails[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const { token } = useUser();
  const { addToCart, cart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchQuery, products]);

  // useEffect(() => {
  //   const fetchCartIfEmpty = async () => {
  //     if (token && cart.length === 0) {
  //       try {
  //         await getUserCart(token);
  //       } catch (error) {
  //         console.error("Error fetching user cart:", error);
  //       }
  //     }
  //   };

  //   fetchCartIfEmpty();
  // }, [token, cart.length]); // Check cart length to avoid unnecessary API calls

  const handleAddToCart = async (token: string, productId: number) => {
    if (!token) {
      setSuccessMessage("Please register or log in to add items to your cart.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return;
    }

    try {
      // Use current cart state instead of fetching again
      const productAlreadyInCart = cart.some((item) => item.id === productId);
      if (!productAlreadyInCart) {
        await addToCart(token, productId); // Add product to the cart
      }

      const product = searchResults.find((p) => p.id === productId);
      if (product) {
        setSuccessMessage(`${product.name} added to cart successfully!`);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16">
      {searchResults.map((product) => (
        <div
          key={product.id}
          className="bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden border border-gray-200 h-[420px] flex flex-col"
        >
          <Image
            src={
              product.image_url
                ? product.image_url.startsWith("http")
                  ? product.image_url
                  : `${baseUrl}${product.image_url}`
                : "/images/default-placeholder.jpg"
            }
            alt={product.name}
            className="w-full h-1/2 object-cover rounded-t-lg"
            width={500}
            height={500}
          />
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex flex-col items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
            </div>
            <button
              className="bg-red-700 text-white w-full py-2 mt-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              onClick={() => handleAddToCart(token!, product.id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {successMessage && (
        <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;

