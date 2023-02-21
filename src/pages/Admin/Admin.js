import React from "react";
import "./admin.scss";
import { Link, Route, Routes } from "react-router-dom";
import {  TabBar } from "../../commponents/TabBar/TabBar";
import { Buyurtmalar } from "../../commponents/Buyurtmalar/Buyurtmalar";
import BadLogo from "../../assest/images/bed-logo.svg";
import Search from "../../assest/images/search.svg";
import {BsPersonCircle} from "react-icons/bs"

export const Admin = () => {
  return (
    <>
      <div>


      <div className="admin-header">
          <div className="admin-logo-box">
            <Link className="admin-logo-link" to="/">
              <img src={BadLogo} width="30" height="20" alt="Bad logo" />
              Matrassue
            </Link>
          </div>
      
      
      <div className="admin-header-df-box">
            <form className="form-admin">
              <label className="form-label-search d-nonegit " id="search">
                <input
                  className="form-serach-inp d-none"
                  type="text"
                  htmlFor="search"
                  placeholder="User"
                />
                <img src={Search} width="22" height="22" alt="serach" />
              </label>
            </form>

            <div className="d-flex align-items-center gap-2">
                <div className="admin-img">
                <BsPersonCircle/>
                </div>
                <strong className="admin-name">John Doe</strong>
            </div>
      </div>
      </div>

      </div>

      <Routes>
        <Route path="/*" element={<TabBar />} />

      </Routes>
    </>
  );
};
