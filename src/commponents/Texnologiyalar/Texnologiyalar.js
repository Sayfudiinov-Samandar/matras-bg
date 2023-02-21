import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete, MdModeEdit, MdOutlineClose } from "react-icons/md";
import "./texnologiya.scss";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import axios from "axios";

export const Texnologiyalar = () => {
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [deleteB, setDeleteB] = useState(false);
  const [modalEdite, setModalEdite] = useState(false);
  const [deletId, setDeleteId] = useState(null);
  const [editeID, setEditeId] = useState(null);
  const [render, setRender] = useState(false);
  const [rows, setRows] = useState([]);
  const texnologiyaNomi = useRef();
  const texnologiyaDec = useRef();
  const texnologiyaImg = useRef();
  const texnologiyaVideo = useRef();
  const texnologiyaNavinla = useRef();

  const handalClickBtnModal = () => {
    setModal(!modal);
  };

  const handalClickBtnModalEdite = () => {
    setModalEdite(!modalEdite);
  };

  const handalDelete = () => {
    setDeleteB(!deleteB);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post(
        "http://localhost:1212/admin/technology",
        {
          name: texnologiyaNomi.current.value,
          description: texnologiyaDec.current.value,
          isActive: true || false,
          thumbnail: texnologiyaImg.current.value,
          link: texnologiyaVideo.current.value,
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

  const onSubmitEdite = (evt) => {
    evt.preventDefault();

    axios
      .put(
        `http://localhost:1212/admin/technology/${editeID}`,
        {
          name: texnologiyaNomi.current.value,
          description: texnologiyaDec.current.value,
          isActive: true || false,
          thumbnail: texnologiyaImg.current.value,
          link: texnologiyaVideo.current.value,
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

  const handalDeleteBtn = () => {
    axios
      .delete(`http://localhost:1212/admin/technology/${deletId}`, {
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

  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/technology", {
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="admin-table-list table-header">
            <TableRow className="table-header">
              <TableCell className="admin-table-text">Nomlari</TableCell>
              <TableCell className="admin-table-text">Matn</TableCell>
              <TableCell className="admin-table-text">Video</TableCell>
              <TableCell className="admin-table-text"></TableCell>
              <TableCell className="admin-table-text"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className="align-items-center"
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description} </TableCell>
                <TableCell>{row.thumbnail}</TableCell>
                <TableCell></TableCell>

                <TableCell
                  align="right"
                  sx={{ display: "flex", gap: "10px", padding: "40px" }}
                  className="delete-btn-tex">
                  <button
                    className="admin-customer-btn admin-toifa-edite"
                    onClick={() => {
                      handalClickBtnModalEdite();
                      setEditeId(row.id);
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
            width: "27%",
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

        <form className="manzil-form" onSubmit={onSubmit}>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="nomi">
              <p className="manzil-inp-title">Nomi</p>
              <input
                className="manzil-inp"
                type="text"
                id="nomi"
                ref={texnologiyaNomi}
              />
            </label>
            <label htmlFor="nomi2">
              <p className="manzil-inp-title">Nomi</p>
              <input
                className="manzil-inp"
                type="text"
                id="nomi2"
                ref={texnologiyaDec}
              />
            </label>
            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Navinla</p>
              <input
                className="admin-table-fech-inp-switch"
                id="holat"
                type="checkbox"
                ref={texnologiyaNavinla}
              />
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="Rasm">
              <p className="manzil-inp-title">Rasm</p>
              <input
                className="manzil-inp"
                type="text"
                id="Rasm"
                ref={texnologiyaImg}
              />
            </label>
            <label htmlFor="Video">
              <p className="manzil-inp-title">Video</p>
              <input
                className="manzil-inp"
                type="text"
                id="Video"
                ref={texnologiyaVideo}
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
            marginTop: "5%",
            width: "27%",
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
        <h4 className="manzil-qoshishi-modal-title">O'zgartirish!!</h4>

        <form className="manzil-form" onSubmit={onSubmitEdite}>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="nomi">
              <p className="manzil-inp-title">Nomi</p>
              <input
                className="manzil-inp"
                type="text"
                id="nomi"
                ref={texnologiyaNomi}
              />
            </label>
            <label htmlFor="nomi2">
              <p className="manzil-inp-title">Nomi</p>
              <input
                className="manzil-inp"
                type="text"
                id="nomi2"
                ref={texnologiyaDec}
              />
            </label>
            <label className="location-switch-box" htmlFor="holat">
              <p className="manzil-inp-title">Navinla</p>
              <input
                className="admin-table-fech-inp-switch"
                id="holat"
                type="checkbox"
                ref={texnologiyaNavinla}
              />
            </label>
          </div>
          <div className="manzil-input-box" style={{ position: "relative" }}>
            <label htmlFor="Rasm">
              <p className="manzil-inp-title">Rasm</p>
              <input
                className="manzil-inp"
                type="text"
                id="Rasm"
                ref={texnologiyaImg}
              />
            </label>
            <label htmlFor="Video">
              <p className="manzil-inp-title">Video</p>
              <input
                className="manzil-inp"
                type="text"
                id="Video"
                ref={texnologiyaVideo}
              />
            </label>
            <button className="manzil-saqlash-btn" type="submit">
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
          <button className="editeHa" onClick={handalDeleteBtn}>
            HA
          </button>
        </div>
      </ReactModal>
    </>
  );
};
