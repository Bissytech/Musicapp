import { NavLink } from "react-router-dom";
import { useState } from "react";
import {RiCloseLine} from 'react-icons/ri';
import { HiOutlineMenu } from "react-icons/hi";
 import {logo} from '../assets'
//import {thelogo} from '../assets'
import {links} from '../assets/constants'

const NavLinks = ({handleClick}) =>(
<div className="mt-10">
{links.map((item)=>(
  <NavLink
  key={item.name}
  to={item.to}
  className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
  onClick={()=>handleClick && handleClick()}
  
  ><item.icon className="w-6 h-6 mr-2"/>
    {item.name}</NavLink>
))}
</div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return(
  <>
  <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
  {/* <img src={require("thelogo.webp")} alt="logo" className="w-full h-14 object-contain"/> */}
<NavLinks/>
  </div>
  <div className="absolute md:hidden block top-6 right-3"> 
{mobileMenuOpen ? (<RiCloseLine/>):<HiOutlineMenu/>}
  </div>
  </>
  )
}
  
;

export default Sidebar;
