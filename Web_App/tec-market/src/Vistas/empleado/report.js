import React, { Component } from "react";

// MBDREACT COMPONENTS
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

// MATERIAL ICONS
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// HTTP
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fields = [
  {
    label: "Code",
    field: "Code",
    sort: "asc"
  },
  {
    label: "Name",
    field: "Name",
    sort: "asc"
  }
];

class TablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      save: false,
      confirm: false,
      data: [],
      data_temp: [],
      data_panel: [],
      options: [],
      suggest: false,
      top: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080//")
      .then(response => {})
      .catch(error => {
        console.log(error);
        alert("Error trying to get Markets");
      });
  }

  render() {
    const formStyle = {
      display: "flex",
      justifyContent: "flex-start"
    };
    return (
      <MDBCard narrow>
        <Dialog
          open={this.state.confirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"¿Seguro que desea eleminar los elementos seleccionados?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              CANCELAR
            </Button>
            <Button onClick={() => this.confirmDelete()} color="primary">
              ACEPTAR
            </Button>
          </DialogActions>
        </Dialog>

        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
          <h3 href="#" className="white-text mx-3">
            Top 5
          </h3>
        </MDBCardHeader>
        <MDBCardBody narrow>
          <MDBContainer>
            <h5>Orders</h5>
            <div style={formStyle}></div>
          </MDBContainer>
          <MDBContainer>
            <MDBTable btn fixed>
              <MDBTableBody rows={this.state.top} />
            </MDBTable>
          </MDBContainer>
        </MDBCardBody>
        <hr />
        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-around align-items-center py-2 mx-4 mb-3">
          <h5 style={{ color: "white" }}>Market with orders</h5>
        </MDBCardHeader>
        <MDBCardBody cascade>
          <MDBTable btn fixed>
            <MDBTableHead columns={fields} />
            <MDBTableBody rows={this.state.market_orders} />
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
export default TablePage;
