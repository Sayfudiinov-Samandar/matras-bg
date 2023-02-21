import React from "react";
import "./TabBar.scss";
import { NavLink, Route, Routes,Link  } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Buyurtmalar } from "../Buyurtmalar/Buyurtmalar";
import { Toifalar } from "../Toifalar/Toifalar";
import { Cust } from "../Cust/Cust";
import {Mahsulotlar} from "../Mahsulotlar/Mahsulotlar"
import { Texnologiyalar } from "../Texnologiyalar/Texnologiyalar";
import { Manzil } from "../Manzil/Manzil";
import BadLogo from "../../assest/images/bed-logo.svg";


export const TabBar = () => {
  return (
    <>


      <div className="admin-tab-bar-father">
        <div className="admin-tabar-box">
          <ul className="admin-tavbar-list">
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/">
                <AiFillHome color="white" />
                Buyurtmalar
              </NavLink>
            </li>
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/customers">
                <BsPersonFill color="white" />
                Сustomers
              </NavLink>
            </li>
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/toifalar">
                <FiMenu className="toifalar-icon" />
                Toifalar
              </NavLink>
            </li>
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/mahsulotlar">
                <MdOutlineShoppingCart />
                Mahsulotlar
              </NavLink>
            </li>
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/texnologiyalar">
                <FaTools />
                Texnologiyalar
              </NavLink>
            </li>
            <li className="admin-tabar-item">
              <NavLink className="admin-tabar-link" to="/manzil">
                <MdLocationOn />
                Manzil
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="admin-body-box">
          <Routes>
            <Route path="/" element={<Buyurtmalar />} />
            <Route path="customers" element={<Cust />} />
            <Route path="toifalar" element={<Toifalar />} />
            <Route path="mahsulotlar" element={<Mahsulotlar />} />
            <Route path="texnologiyalar" element={<Texnologiyalar />} />
            <Route path="manzil" element={<Manzil />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
