import React, { useEffect, useRef, useState } from "react";
import "../Buyurtmalar/buyurtmalar.scss";
import "./toifalar.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete, MdModeEdit, MdOutlineClose } from "react-icons/md";
import ReactModal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";


export const Toifalar = () => {

  

  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [deleteB, setDeleteB] = useState(false);
  const [deletId, setDeleteId] = useState(null);

  const [editeCategory, setEditeCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [modalEdite, setModalEdite] = useState(false);
  const [rows, setRows] = useState([]);
  const [render, setRender] = useState(false);
  const inputName = useRef();
  const inputCheckbox = useRef();

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
    data.preventDefault();
    axios
      .post(
        `http://localhost:1212/admin/categories`,
        {
          category: inputName.current.value,
          isActive: false|| true,
        },
        {
          headers: {
            Authorization: state.token.token,
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          setRender(!render);
          setModal(!modal);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/categories", {
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

  const onSubmitEdite = (evt) => {
    evt.preventDefault();
    axios
      .put(
        `http://localhost:1212/admin/categories/${editeCategory}`,
        {
          category: inputName.current.value,
          isActive: true || false,
        },
        {
          headers: {
            Authorization: state.token.token,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setRender(!render);
          setModalEdite(!modalEdite);
        }
      })
      .catch((err) => console.log(err));
  };

  const handalDeleteCategory = () => {

    axios
      .delete(`http://localhost:1212/admin/categories/${deletId}`, {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setDeleteB(!deleteB);
          setRender(!render);
        }
      })
      .catch((err) => console.log(err));

  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="admin-table-list table-header">
            <TableRow className="table-header">
              <TableCell className="admin-table-text">Toifalar</TableCell>
              <TableCell className="admin-table-text"></TableCell>
              <TableCell className="admin-table-text"></TableCell>
              <TableCell className="admin-table-text"></TableCell>
              <TableCell className="admin-table-text"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.category}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell
                  align="right"
                  sx={{ display: "flex", gap: "10px" }}
                  className="delete-btn-btn">
                  <button
                    className="admin-customer-btn admin-toifa-edite"
                    onClick={() => {
                      setModalEdite(!modalEdite);
                      setEditeCategory(row.id);
                      setCategoryName(row.category);
                    }}>
                    <MdModeEdit color="black" />
                  </button>
                  <button
                    className="admin-customer-btn"
                    onClick={() => {
                      setDeleteB(!deleteB);
                      setDeleteId(row.id);
                    }}>
                    <MdDelete color="red" />
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
            width: "14%",
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
        <form onSubmit={onSubmit}>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="nomi">
              <p className="manzil-inp-title">Kategoriya nomi</p>
              <input
                className="manzil-inp"
                placeholder="masalan: Model B"
                type="text"
                id="nomi"
                ref={inputName}
              />
            </label>
            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Holat</p>
              <input
                className="admin-table-fech-inp-switch"
                id="holat"
                type="checkbox"
                ref={inputCheckbox}
              />
            </label>

            <button className="manzil-saqlash-btn" type="submit">
              Qo’shish
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
            marginTop: "5%",
            width: "14%",
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
        <h4 className="manzil-qoshishi-modal-title">Toifalar O'zgartirish</h4>

        <button className="manzil-close-btn" onClick={handalClickBtnModalEdite}>
          <MdOutlineClose size="20" color="white" />
        </button>

        <form onSubmit={onSubmitEdite}>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="nomi">
              <p className="manzil-inp-title">Kategoriya nomi</p>
              <input
                className="manzil-inp"
                placeholder={categoryName}
                type="text"
                id="nomi"
                ref={inputName}
              />
            </label>
            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Holat</p>
              <input
                className="admin-table-fech-inp-switch"
                id="holat"
                type="checkbox"
                ref={inputCheckbox}
              />
            </label>

            <button className="manzil-saqlash-btn" type="submit">
              Qo’shish
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
          <button className="otkazEditeBtn" onClick={handalDelete}>YO’Q</button>
          <button className="editeHa" onClick={handalDeleteCategory}>
            HA
          </button>
        </div>
      </ReactModal>
    </>
  );
};
