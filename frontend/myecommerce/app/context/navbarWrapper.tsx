'use client'
import Navbar from "../ui/navbar";
import {useState, useEffect } from 'react';
import { useCart} from '@/app/context/cartContext';

const NavBarWrapper: React.FC = ()=> {
const { count } = useCart();
const [isHydrated, setIsHydrated] = useState<boolean>(false);
// const [cartCount, setCartCount] = useState<number>(count);


useEffect(() => {
  setIsHydrated(true);
 
}, []);



if(!isHydrated) {
    return null

  }
  




return (
    <Navbar
     count ={count} />
)
}; 

export default NavBarWrapper
