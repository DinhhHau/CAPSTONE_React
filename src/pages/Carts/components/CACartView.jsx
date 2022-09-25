import { Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CACartTable from "./CACartTable";

const CACartView = () => {
  return (
    // <div className="row">
    //     <div className="col-12"></div>
    //     <div className="col-12"></div>
    //     <div className="col-12"></div>
    // </div>
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Carts</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <CACartTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CACartView;
