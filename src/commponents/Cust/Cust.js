import React, { useEffect, useState } from "react";
import "../Buyurtmalar/buyurtmalar.scss";
import "./cust.scss"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {MdDelete} from "react-icons/md"
import { useSelector } from "react-redux";
import axios from "axios";

export const Cust = () => {
  const state = useSelector((state) => state);
  const [render, setRender] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/contact/1", {
        headers: {
          Authorization: state.token.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setRows(res.data.data);
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
              <TableCell className="admin-table-text">ID</TableCell>
              <TableCell className="admin-table-text">sana</TableCell>
              <TableCell className="admin-table-text">Telefon raqami</TableCell>
              <TableCell className="admin-table-text">Qayta aloqa</TableCell>
              <TableCell className="admin-table-text"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>
                  <input
                    className="admin-table-fech-inp-switch"
                    type="checkbox"
                  />
                </TableCell>

                <TableCell align="right">
                    <button className="admin-customer-btn" onClick={()=>{
                      axios
                      .delete(`http://localhost:1212/admin/contact/${row.id}`, {
                        headers: {
                          Authorization: state.token.token,
                        },
                      })
                      .then((res) => {
                        if (res.status === 200) {
                          setRender(!render);
                        }
                      })
                      .catch((err) => console.log(err));
                    }}>
                        <MdDelete color="red"/>
                    </button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
