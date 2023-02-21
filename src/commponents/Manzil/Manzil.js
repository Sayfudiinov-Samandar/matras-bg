import React, { useEffect, useState } from "react";
import "./manzil.scss";
import "../Buyurtmalar/buyurtmalar.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactModal from "react-modal";
import { BsCardImage } from "react-icons/bs";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdDelete,
  MdModeEdit,
  MdLocationOn,
  MdOutlineClose,
} from "react-icons/md";
import axios from "axios";

export const Manzil = () => {
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [modalEdite, setModalEdite] = useState(false);
  const [editeID, setEditeId] = useState(null);
  const [render, setRender] = useState(false);
  const [rows, setRows] = useState([]);
  const schema = Yup.object({
    manzilValue: Yup.string().required(""),
    locationValue: Yup.string().required(""),
    mantValue: Yup.string().required(""),
    holatValue: Yup.boolean(),
    img1File: Yup.mixed().required(""),
    img2File: Yup.mixed().required(""),
    img3File: Yup.mixed().required(""),
  });

  const { register, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      manzilValue: "",
      locationValue: "",
      holatValue: "",
      mantValue: "",
      img1File: "",
      img2File: "",
      img3File: "",
    },
    resolver: yupResolver(schema),
  });

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const handalClickBtnModal = () => {
    setModal(!modal);
  };

  const handalClickBtnModalEdite=()=>{
    setModalEdite(!modalEdite)
  }

  

  const onEditeSubmit = (data) => {


    const formData = new FormData();
    formData.append("location", data.manzilValue);
    formData.append("geolocation", data.locationValue);
    formData.append("isActive", data.holatValue);
    formData.append("destination", data.mantValue);
    formData.append("images", data.img1File[0]);
    formData.append("images", data.img2File[0]);
    formData.append("images", data.img3File[0]);

    axios
      .put(`http://localhost:1212/admin/address/${editeID}`, formData, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRender(!render);
          setModal(!modal);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("location", data.manzilValue);
    formData.append("geolocation", data.locationValue);
    formData.append("isActive", data.holatValue);
    formData.append("destination", data.mantValue);
    formData.append("images", data.img1File[0]);
    formData.append("images", data.img2File[0]);
    formData.append("images", data.img3File[0]);
    axios
      .post("http://localhost:1212/admin/address", formData, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setRender(!render);
          setModal(!modal);
        }
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/address", {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRows(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [render]);

  const handalDeleteBtn = (id) => {
    axios
      .delete(`http://localhost:1212/admin/address/${id}`, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setRender(!render);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="admin-table-list table-header">
            <TableRow className="table-header">
              <TableCell className="admin-table-text">Manzil</TableCell>
              <TableCell className="admin-table-text">Matn</TableCell>
              <TableCell className="admin-table-text">Location</TableCell>
              <TableCell className="admin-table-text"></TableCell>
              <TableCell className="admin-table-text"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.destination} </TableCell>
                <TableCell>
                  <a href={row.geolacation} target="blank">
                    <MdLocationOn color="red" size="20" />
                  </a>
                </TableCell>
                <TableCell></TableCell>
                <TableCell
                  align="right"
                  sx={{ display: "flex", gap: "10px" }}
                  className="delete-btn-btn">
                  <button
                    className="admin-customer-btn"
                    onClick={() => {
                      handalDeleteBtn(row.id);
                    }}>
                    <MdDelete color="red" />
                  </button>
                  <button
                    className="admin-customer-btn admin-toifa-edite"
                    onClick={() => {
                      handalClickBtnModalEdite();
                      setEditeId(row.id);
                    }}
                    type="button">
                    <MdModeEdit color="black" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button className="manzil-open-close-btn" onClick={handalClickBtnModal}>
        Qo’shish
      </button>

      <ReactModal
        isOpen={modal}
        onRequestClose={handalClickBtnModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#00000060",
          },
          content: {
            position: "relative",
            margin: "0 auto",
            marginTop: "10%",
            width: "42%",
            height: "auto",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "25px",
          },
        }}>
        <button className="manzil-close-btn" onClick={handalClickBtnModal}>
          <MdOutlineClose size="20" color="white" />
        </button>

        <h4 className="manzil-qoshishi-modal-title">Tahrirlash</h4>

        <form className="manzil-form" onSubmit={handleSubmit(onSubmit)}>
          <Slider {...settings}>
            <div className="card">
              <label htmlFor="manzilImg1" className="card-top">
                <BsCardImage size="50" />
                <input
                  type="file"
                  id="manzilImg1"
                  {...register("img1File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
            <div className="card">
              <label htmlFor="manzilImg2" className="card-top">
                <BsCardImage size="50" />
                <input
                  type="file"
                  id="manzilImg2"
                  {...register("img2File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
            <div className="card">
              <label htmlFor="manzilImg3" className="card-top">
                <BsCardImage size="50" />
                <input
                  onChange={(evt) => console.log(evt.target.files)}
                  type="file"
                  id="manzilImg3"
                  {...register("img3File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
          </Slider>

          <div className="manzil-input-box">
            <label htmlFor="manzil">
              <p className="manzil-inp-title">Manzil</p>
              <input
                className="manzil-inp"
                {...register("manzilValue")}
                type="text"
                id="manzil"
              />
            </label>

            <label htmlFor="location">
              <p className="manzil-inp-title">Location</p>
              <input
                className="manzil-inp"
                {...register("locationValue")}
                type="text"
                id="location"
              />
            </label>

            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Holat</p>
              <input
                className="admin-table-fech-inp-switch"
                {...register("holatValue")}
                id="holat"
                type="checkbox"
              />
            </label>
          </div>

          <div className="manzil-input-box">
            <label className="" htmlFor="matn">
              <p className="manzil-inp-title">Matn</p>
              <textarea
                {...register("mantValue")}
                className="admin-table-fech-inp-switch"
                id="matn"
              />
            </label>
            <button className="manzil-saqlash-btn" type="submit">
              Saqlash
            </button>
          </div>
        </form>
      </ReactModal>

      <ReactModal
        isOpen={modalEdite}
        onRequestClose={handalClickBtnModalEdite}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#00000060",
          },
          content: {
            position: "relative",
            margin: "0 auto",
            marginTop: "10%",
            width: "42%",
            height: "auto",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "25px",
          },
        }}>
        <button className="manzil-close-btn" onClick={handalClickBtnModalEdite}>
          <MdOutlineClose size="20" color="white" />
        </button>

        <h4 className="manzil-qoshishi-modal-title">Manzil o'zgartirish</h4>

        <form className="manzil-form" onSubmit={handleSubmit(onEditeSubmit)}>
          <Slider {...settings}>
            <div className="card">
              <label htmlFor="manzilImg1" className="card-top">
                <BsCardImage size="50" />
                <input
                  type="file"
                  id="manzilImg1"
                  {...register("img1File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
            <div className="card">
              <label htmlFor="manzilImg2" className="card-top">
                <BsCardImage size="50" />
                <input
                  type="file"
                  id="manzilImg2"
                  {...register("img2File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
            <div className="card">
              <label htmlFor="manzilImg3" className="card-top">
                <BsCardImage size="50" />
                <input
                  onChange={(evt) => console.log(evt.target.files)}
                  type="file"
                  id="manzilImg3"
                  {...register("img3File")}
                  style={{ position: "absolute", zIndex: "-10", opacity: "0" }}
                />
              </label>
            </div>
          </Slider>

          <div className="manzil-input-box">
            <label htmlFor="manzil">
              <p className="manzil-inp-title">Manzil</p>
              <input
                className="manzil-inp"
                {...register("manzilValue")}
                type="text"
                id="manzil"
              />
            </label>

            <label htmlFor="location">
              <p className="manzil-inp-title">Location</p>
              <input
                className="manzil-inp"
                {...register("locationValue")}
                type="text"
                id="location"
              />
            </label>

            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Holat</p>
              <input
                className="admin-table-fech-inp-switch"
                {...register("holatValue")}
                id="holat"
                type="checkbox"
              />
            </label>
          </div>

          <div className="manzil-input-box">
            <label className="" htmlFor="matn">
              <p className="manzil-inp-title">Matn</p>
              <textarea
                {...register("mantValue")}
                className="admin-table-fech-inp-switch"
                id="matn"
              />
            </label>
            <button className="manzil-saqlash-btn" type="submit">
              Saqlash
            </button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};
