import React, { useEffect, useState } from "react";
import "./mahsulotlar.scss";
import "../Buyurtmalar/buyurtmalar.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete, MdModeEdit, MdOutlineClose } from "react-icons/md";
import ReactModal from "react-modal";
import Slider from "react-slick";
import { BsCardImage, BsPersonCircle } from "react-icons/bs";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Search from "../../assest/images/search.svg";
import { useSelector } from "react-redux";

export const Mahsulotlar = () => {
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [modalEdite, setModalEdite] = useState(false);
  const [editeInfo, setEditeInfo] = useState({});
  const [rows, setRows] = useState([]);
  const [cate, setCate] = useState([]);
  const [cateoryText, setCategorytText] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [editeID, setEditeId] = useState(null);
  const [render, setRender] = useState(false);

  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteB, setDeleteB] = useState(false);

  const schema = Yup.object({
    name: Yup.string().required(""),
    category: Yup.string().required(""),
    body: Yup.string().required(""),
    size: Yup.string().required(""),
    cost: Yup.number().required(""),
    weight: Yup.number().required(""),
    warranty: Yup.number().required(""),
    capacity: Yup.number().required(""),
    new: Yup.boolean().required(""),

    discount: Yup.boolean(),
    newCost: Yup.number(),
    isActive: Yup.boolean(),

    img1File: Yup.mixed().required(""),
    img2File: Yup.mixed().required(""),
    img3File: Yup.mixed().required(""),
  });
  const { register, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      name: "", //
      category: "", //
      weight: "", //
      warranty: "", //
      capacity: "", //
      size: "", //
      body: "", //
      cost: "", //
      newCost: "", //
      discount: "", //
      new: "", //
      isActive: "", //
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
  const handalClickBtnModalEdite = () => {
    setModalEdite(!modalEdite);
  };
  const handalDelete = () => {
    setDeleteB(!deleteB);
  };

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", cateoryText);
    formData.append("weight", data.weight);
    formData.append("warranty", data.warranty);
    formData.append("capacity", data.capacity);
    formData.append("size", data.size);
    formData.append("body", data.body);
    formData.append("cost", data.cost);
    formData.append("newCost", data.newCost);
    formData.append("discount", data.discount);
    formData.append("new", data.new);
    formData.append("isActive", data.isActive);
    formData.append("images", data.img1File[0]);
    formData.append("images", data.img2File[0]);
    formData.append("images", data.img3File[0]);

    axios
      .post(`http://localhost:1212/admin/products/${categoryId}`, formData, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setRender(!render);
          setModal(!modal);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmitEdite = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", cateoryText);
    formData.append("weight", data.weight);
    formData.append("warranty", data.warranty);
    formData.append("capacity", data.capacity);
    formData.append("size", data.size);
    formData.append("body", data.body);
    formData.append("cost", data.cost);
    formData.append("newCost", data.newCost);
    formData.append("discount", data.discount);
    formData.append("new", data.new);
    formData.append("isActive", data.isActive);
    formData.append("images", data.img1File[0]);
    formData.append("images", data.img2File[0]);
    formData.append("images", data.img3File[0]);

    axios
      .put(`http://localhost:1212/admin/products/${editeID}`, formData, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 202) {
          setRender(!render);
          setModalEdite(!modalEdite);
          setEditeInfo({});
        }
      })
      .catch((err) => console.log(err));
  };

  const handalDeleteProduct = () => {
    axios
      .delete(`http://localhost:1212/admin/products/${deleteProductId}`, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setDeleteB(!deleteB);
          setRender(!render);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/products", {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCate(res.data.categories);
          setRows(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  }, [render]);

  return (
    <>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="admin-table-list">
            <TableRow>
              <TableCell className="admin-table-text">
                Mahsulot nomlari
              </TableCell>
              <TableCell className="admin-table-text">Toifalar</TableCell>
              <TableCell className="admin-table-text">Narxi</TableCell>
              <TableCell className="admin-table-text">Yuklama</TableCell>
              <TableCell className="admin-table-text">Razmeri</TableCell>
              <TableCell className="admin-table-text">Status</TableCell>
              <TableCell className="admin-table-text"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.weight}kg</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>
                  <input
                    defaultChecked={row.is_active ? "true" : "false"}
                    className="admin-table-fech-inp-switch"
                    type="checkbox"
                  />
                </TableCell>

                <TableCell align="right" sx={{ display: "flex", gap: "10px" }}>
                  <button
                    className="admin-customer-btn"
                    onClick={() => {
                      setDeleteProductId(row.id);
                      setDeleteB(!deleteB);
                    }}>
                    <MdDelete color="red" />
                  </button>
                  <button
                    className="admin-customer-btn admin-toifa-edite"
                    onClick={() => {
                      setModalEdite(!modalEdite);
                      setEditeId(row.id);
                      setEditeInfo(row);
                      console.log(row);
                    }}>
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
            marginTop: "5%",
            width: "60%",
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
        <h4 className="manzil-qoshishi-modal-title">Qo’shish</h4>

        <form
          className="manzil-form"
          style={{ gap: "50px" }}
          onSubmit={handleSubmit(onSubmit)}>
          <Slider {...settings}>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img1File")}
                />
              </label>
            </div>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img2File")}
                />
              </label>
            </div>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img3File")}
                />
              </label>
            </div>
          </Slider>

          <div className="manzil-input-box" style={{ position: "relative" }}>
            <div>
              <p className="manzil-inp-title">Tovar nomi</p>

              <select
                {...register("category")}

                className="manzil-inp"
                onChange={(evt) => {

                  let findOption = cate.find((item) => {
                    return (item.id == evt.target.value);
                  });

                  setCategorytText(findOption.category);
                  setCategoryId(evt.target.value);
                
                }}>
                {cate.map((item,index) => {
                  return (
                    <option  key={index} value={item.id}>
                      {item.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <label>
              <p className="manzil-inp-title">Tovar nomi</p>
              <input
                className="manzil-inp"
                {...register("name")}
                type="text"
                placeholder="Masalan: Martras best+"
              />
            </label>
            <label htmlFor="nomi2">
              <p className="manzil-inp-title">Narxi</p>
              <input
                {...register("cost")}
                className="manzil-inp"
                type="number"
                id="nomi2"
                placeholder="masalan: 20 000"
              />
            </label>
            <label>
              <p className="manzil-inp-title">Yuklama</p>
              <input
                className="manzil-inp"
                {...register("weight")}
                type="number"
                placeholder="masalan: 200 kg"
              />
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label>
              <p className="manzil-inp-title">Razmeri</p>
              <input
                className="manzil-inp"
                {...register("size")}
                type="text"
                placeholder="masalan: 200 x 140 x 40"
              />
            </label>
            <label>
              <p className="manzil-inp-title">Kafolat</p>
              <input
                className="manzil-inp"
                {...register("warranty")}
                type="number"
                placeholder="masalan: 1 yil"
              />
            </label>
            <label>
              <p className="manzil-inp-title">Sig’m</p>
              <input
                className="manzil-inp"
                {...register("capacity")}
                type="number"
                placeholder="masalan: 2"
              />
            </label>
            <label>
              <p className="manzil-inp-title">Aksiya Narxi</p>
              <div className="mahsulot-aksiya-inp-label">
                <input
                  {...register("newCost")}
                  className="manzil-inp aksiya-input-sum"
                  type="number"
                  placeholder="masalan: 1 200 000"
                />
                <input
                  className="manzil-inp only-another-chackbox"
                  type="checkbox"
                  {...register("discount")}
                />
              </div>
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label>
              <p className="manzil-inp-title">Ma’lumot</p>
              <textarea
                className="admin-table-fech-inp-switch"
                placeholder="info..."
                {...register("body")}
              />
            </label>
            <label className="location-switch-box">
              <p className="manzil-inp-title">Navinla</p>
              <input
                className="admin-table-fech-inp-switch"
                {...register("new")}
                id="holat"
                type="checkbox"
              />
            </label>
            <label className="location-switch-box">
              <p className="manzil-inp-title">Active</p>
              <input
                className="admin-table-fech-inp-switch"
                type="checkbox"
                {...register("isActive")}
              />
            </label>
            <button
              className="manzil-saqlash-btn "
              style={{ margin: "35px 0 0 0 " }}
              type="submit">
              Saqlash
            </button>
          </div>
        </form>
      </ReactModal>

      <ReactModal
        isOpen={modalEdite}
        onRequestClose={() => {
          setEditeInfo({});
          handalClickBtnModalEdite();
        }}
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
            marginTop: "5%",
            width: "60%",
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
        <button
          className="manzil-close-btn"
          onClick={() => {
            handalClickBtnModalEdite();
            setEditeInfo({});
          }}>
          <MdOutlineClose size="20" color="white" />
        </button>
        <h4 className="manzil-qoshishi-modal-title">O'zgartirsh</h4>

        <form
          className="manzil-form"
          style={{ gap: "50px" }}
          onSubmit={handleSubmit(onSubmitEdite)}>
          <Slider {...settings}>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img1File")}
                />
              </label>
            </div>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img2File")}
                />
              </label>
            </div>
            <div className="card">
              <label className="card-top">
                <BsCardImage size="50" />
                <input
                  style={{ opacity: "0" }}
                  type="file"
                  {...register("img3File")}
                />
              </label>
            </div>
          </Slider>

          <div className="manzil-input-box" style={{ position: "relative" }}>
            <div>
              <p className="manzil-inp-title">Toifalar</p>

              <select
                {...register("category")}
                className="manzil-inp"
                value={editeInfo.category}
                onChange={(evt) => {
                  setCategorytText(
                    evt.target.children.category.getAttribute("dataset-value"),
                  );
                  setCategoryId(evt.target.value);
                }}>
                {cate.map((item) => {
                  return (
                    <option
                      name="category"
                      dataset-value={item.category}
                      key={item.id}
                      value={item.id}>
                      {item.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <label>
              <p className="manzil-inp-title">Tovar nomi</p>
              <input
                className="manzil-inp"
                type="text"
                value={editeInfo.name}
                placeholder={editeInfo.name}
                {...register("name")}
              />
            </label>
            <label htmlFor="nomi2">
              <p className="manzil-inp-title">Narxi</p>
              <input
                className="manzil-inp"
                type="number"
                id="nomi2"
                placeholder={editeInfo.cost}
                value={editeInfo.cost}
                {...register("cost")}
              />
            </label>
            <label>
              <p className="manzil-inp-title">Yuklama</p>
              <input
                className="manzil-inp"
                type="number"
                placeholder={`masalan: ${editeInfo.weight} kg`}
                value={editeInfo.weight}
                {...register("weight")}
              />
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label>
              <p className="manzil-inp-title">Razmeri</p>
              <input
                className="manzil-inp"
                type="number"
                placeholder={`masslan: ${editeInfo.size}`}
                value={editeInfo.size}
                {...register("size")}
              />
            </label>
            <label>
              <p className="manzil-inp-title">Kafolat</p>
              <input
                className="manzil-inp"
                type="number"
                placeholder={`maslan: ${editeInfo.warranty}`}
                value={editeInfo.warranty}
                {...register("warranty")}
              />
            </label>
            <label>
              <p className="manzil-inp-title">Sig’m</p>
              <input
                className="manzil-inp"
                type="number"
                placeholder={`maslan: ${editeInfo.capacity}`}
                value={editeInfo.capacity}
                {...register("capacity")}
              />
            </label>
            <label>
              <p className="manzil-inp-title">Aksiya Narxi</p>
              <div className="mahsulot-aksiya-inp-label">
                <input
                  className="manzil-inp aksiya-input-sum"
                  type="number"
                  placeholder={`maslan: ${editeInfo.new_cost}`}
                  value={editeInfo.new_cost}
                  {...register("newCost")}
                />
                <input
                  className="manzil-inp only-another-chackbox"
                  type="checkbox"
                  {...register("discount")}
                />
              </div>
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label>
              <p className="manzil-inp-title">Ma’lumot</p>
              <textarea
                className="admin-table-fech-inp-switch"
                placeholder={`maslan: ${editeInfo.body}`}
                value={editeInfo.body}
                {...register("body")}
              />
            </label>
            <label className="location-switch-box">
              <p className="manzil-inp-title">Navinla</p>
              <input
                className="admin-table-fech-inp-switch"
                id="holat"
                type="checkbox"
                {...register("new")}
              />
            </label>
            <label className="location-switch-box">
              <p className="manzil-inp-title">Active</p>
              <input
                className="admin-table-fech-inp-switch"
                type="checkbox"
                checked
                {...register("isActive")}
              />
            </label>
            <button
              className="manzil-saqlash-btn "
              style={{ margin: "35px 0 0 0 " }}
              type="submit">
              Saqlash
            </button>
          </div>
        </form>
      </ReactModal>

      <ReactModal
        isOpen={deleteB}
        onRequestClose={handalDelete}
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
            marginTop: "5%",
            width: "19%",
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
        <h4 className="manzil-qoshishi-modal-title">
          Haqiqatdan ham o’chirmoqchimisiz?
        </h4>

        <div className="d-flex justify-content-end gap-4">
          <button className="otkazEditeBtn" onClick={handalDelete}>
            YO’Q
          </button>
          <button className="editeHa" onClick={handalDeleteProduct}>
            HA
          </button>
        </div>
      </ReactModal>
    </>
  );
};
