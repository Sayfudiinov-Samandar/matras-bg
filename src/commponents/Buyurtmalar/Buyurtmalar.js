import React, { useEffect, useState } from "react";
import "./buyurtmalar.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector } from "react-redux";


export const Buyurtmalar = () => {
  const state = useSelector((state) => state);

  const [render, setRender] = useState(false);
  const [rows, setRows] = useState([]);


  

  useEffect(() => {
    axios
      .get("http://localhost:1212/admin/orders/1", {
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
              <TableCell className="admin-table-text">Ismi</TableCell>
              <TableCell className="admin-table-text">Telefon raqami</TableCell>
              <TableCell className="admin-table-text">Mahsulot nomlari</TableCell>
              <TableCell className="admin-table-text">Miqdor</TableCell>
              <TableCell className="admin-table-text">Qayta aloqa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                className="admin-table-map"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.number}</TableCell>
                <TableCell >{row.product_name}</TableCell>
                <TableCell >{row.count}</TableCell>
                <TableCell ><input className="admin-table-fech-inp-switch"  type="checkbox"  /></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
