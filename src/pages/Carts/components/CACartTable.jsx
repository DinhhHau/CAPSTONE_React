import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons";
import { changeQuantityBuy } from "../../../redux/reducers/productReducer";
import { type } from "@testing-library/user-event/dist/type";

export default function CACartTable() {
  const dispatch = useDispatch();

  const columns = [
    { id: "id", name: "id", },
    {
      id: "image",
      name: "img",
      renderCell: (rowObj) => <img src={rowObj.image} width="80" />,
    },
    { id: "name", name: "name" },
    { id: "price", name: "price" },
    {
      id: "quantityBuy",
      name: "quantity",
      renderCell: (rowObj) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="contained" size="small">
            <IconMinus />
          </Button>
          <TextField
            id="filled-basic"
            size="small"
            variant="standard"
            value={rowObj.quantityBuy}
            sx={{
              mx: 2,
              width: 60,
            }}
            inputProps={{
              style: { textAlign: "center" },
            }}
          />

          <Button variant="contained" size="small" onClick={() => {
            
            dispatch(changeQuantityBuy(true,rowObj.id));
          }}>
            <IconPlus />
          </Button>
        </Box>
      ),
    },
    {
      id: "total",
      name: "total",
      renderCell: (rowObj) => <>{(rowObj.price * rowObj.quantityBuy).toLocaleString()} $</>,
    },
    {
      id: "action", name: "action", renderCell: (rowObj) =>
        <>
          <Button variant="contained" size="small" sx={{ backgroundColor: "#6200ee", mr: 1 }}>
            Edit
          </Button>
          <Button variant="contained" size="small" color="error">
            Delete
          </Button>
        </>,
    },
  ];
  const { arrCart } = useSelector((state) => state.productReducer);
  console.log(arrCart);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <TableCell key={item.id}>{item.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {arrCart.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col, index) => (
                <TableCell key={col.id}>
                  {col.renderCell ? col.renderCell(row) : row[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
