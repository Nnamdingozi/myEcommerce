'use client'
import Navbar from "../ui/navabar";
import {useState, useEffect } from 'react';
import { useCart} from '@/app/context/cartContext';
import { useUser } from "./userContext";

const NavBarWrapper: React.FC = ()=> {
const { count } = useCart();
const [isHydrated, setIsHydrated] = useState<boolean>(false);
const [cartCount, setCartCount] = useState<number>(count);


useEffect(() => {
  setIsHydrated(true);
 
}, []);

useEffect(() => {

    if (isHydrated) {
      setCartCount(count); // Update the cartCount after hydration and when count changes
      console.log('count in navbarwrapper after update:', count);
    }
  }, [count, isHydrated]);




if(!isHydrated) {
    return null

  }
  




return (
    <Navbar count ={cartCount} />
)
}; 

export default NavBarWrapper
