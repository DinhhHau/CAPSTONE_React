import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearArrCartSelected } from "../../../redux/reducers/productReducer";
import CACartTable from "./CACartTable";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import userApiService from "../../../api-services/user.api.service";
import toastService from "../../../util/toast.service";

const CACartView = () => {
  const dispatch = useDispatch();
  const { arrCart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const mOrder = useMutation((data) => userApiService.userOrder(data), {
    onSuccess: (res) => {
      dispatch(clearArrCartSelected());
      toastService.showToast("success", "Successfully", "Order Confirmed!");
    },
    onError: (err) => {
      toastService.showToast("error", "Error", "Error");
      console.log(err);
    },
  });
  // const hasSelected = arrCart.filter((x) => x.isSelected);
  // console.log(hasSelected);
  return (
    // <div className="row">
    //     <div className="col-12"></div>
    //     <div className="col-12"></div>
    //     <div className="col-12"></div>
    // </div>
    <Container className="ordercarts">
      <Grid container spacing={2} className="ordercarts_container">
        <Grid item xs={12} className="ordercarts_gird1">
          <Typography variant="h2">Carts</Typography>
        </Grid>
        <Grid item xs={12} className="ordercarts_gird2">
          <Divider />
        </Grid>
        <Grid item xs={12} className="ordercarts_gird3">
          <span>
            {arrCart?.length
              ? `Selected (${
                  arrCart?.filter((x) => x.isSelected).length
                }) items`
              : ""}
          </span>
        </Grid>
        <Grid item xs={12} className="ordercarts_gird4">
          <CACartTable />
        </Grid>
        <Grid item sx={12} className="ordercarts_gird5 mt-2">
          <LoadingButton
            variant="contained"
            className="btn-order"
            sx={{
              padding: "10px 34px",
              background: "#f2994a",
              color: "#fff",
              transition: "all 0.3s ease",
              border: "none",
              ":hover": {
                boxShadow:
                  "0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%),0px 5px 5px rgb(0 0 0 / 20%)",
                transform: "translateY(-0.25em)",
              },
            }}
            onClick={(e) => {
              // {
              //   "orderDetail": [
              //     {
              //       "productId": "string",
              //       "quantity": 0
              //     }
              //   ],
              //   "email": "string"
              // }
              const payload = {
                orderDetail: arrCart
                  .filter((x) => x.isSelected)
                  .map((item) => ({
                    productId: item.id,
                    quantity: item.quantityBuy,
                  })),
                email: userLogin.email,
              };
              mOrder.mutate(payload);
            }}
            disabled={
              !arrCart.filter((x) => x.isSelected) ||
              arrCart.filter((x) => x.isSelected).length === 0
            }
          >
            SUBMIT ORDER
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CACartView;
