import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconMinus, IconPlus } from "@tabler/icons";
import _ from "lodash";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityCart,
  detleProduct,
  handleCheckAllToggleProductCart,
  handleToggleProductCart,
} from "../../../redux/reducers/productReducer";

export default function CACartTable() {
  const dispatch = useDispatch();
  const { arrCart } = useSelector((state) => state.productReducer);

  const columns = [
    { id: "id", name: "id" },
    {
      id: "image",
      name: "Img",
      renderCell: (rowObj) => <img src={rowObj.image} width="80" />,
    },
    { id: "name", name: "Name" },
    { id: "price", name: "Price" },
    {
      id: "quantityBuy",
      name: "Quantity",
      renderCell: (rowObj) => (
        <Box className="box_quantity">
          <Button
            className="btn_minus"
            variant="contained"
            // size="small"
            onClick={() => {
              const action = { soLuong: false, rowObj };
              dispatch(changeQuantityCart(action));
            }}
          >
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

          <Button
            className="btn_plus"
            variant="contained"
            // size="small"
            onClick={() => {
              dispatch(changeQuantityCart({ soLuong: true, rowObj }));
            }}
          >
            <IconPlus />
          </Button>
        </Box>
      ),
    },
    {
      id: "total",
      name: "Total",
      renderCell: (rowObj) => (
        <>{(rowObj.price * rowObj.quantityBuy).toLocaleString()} $</>
      ),
    },
    {
      id: "action",
      name: "Action",
      renderCell: (rowObj) => (
        <Box className="box_action">
          <Button
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: "#6200ee",
              mr: 1,
              transition: "all 0.3s ease",
              ":hover": {
                boxShadow:
                  "0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%),0px 5px 5px rgb(0 0 0 / 20%)",
                transform: "translateY(-0.25em)",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            sx={{
              transition: "all 0.3s ease",
              ":hover": {
                boxShadow:
                  "0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%),0px 5px 5px rgb(0 0 0 / 20%)",
                transform: "translateY(-0.25em)",
              },
            }}
            onClick={() => {
              dispatch(detleProduct({ rowObj }));
            }}
          >
            Delet
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <TableContainer component={Paper} className="table_container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
        <TableHead className="tb_header">
          <TableRow className="tb_tr">
            <TableCell>
              <Checkbox
                checked={
                  arrCart.filter((x) => x.isSelected).length === arrCart.length
                }
                indeterminate={
                  arrCart.filter((x) => x.isSelected).length > 0 &&
                  arrCart.filter((x) => x.isSelected).length !== arrCart.length
                }
                onChange={(e) => {
                  dispatch(handleCheckAllToggleProductCart(e.target.checked));
                }}
              />
            </TableCell>
            {columns.map((item, index) => (
              <TableCell key={index} className={item.id}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="tb_body">
          {arrCart.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={row.isSelected}
                  defaultChecked={false}
                  onChange={(e) => {
                    // console.log(e.target.checked);
                    dispatch(handleToggleProductCart(row));
                  }}
                />
              </TableCell>
              {columns.map((col, index) => (
                <TableCell key={index} className={col.id}>
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
