import React, { Component } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

// CARDS VIEW
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";

// ICONS
import StoreIcon from "@material-ui/icons/Store";
import InsertChartIcon from "@material-ui/icons/InsertChart";

// COMPONETS
import Market from "./markets";
import Report from "./report";
import History from "./clienthistory";

const Hello = () => {
  return (
    <MDBCard>
      <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
        <h1>
          <a className="white-text mx-1">TEC Market</a>
        </h1>
      </MDBCardHeader>
      <MDBCardBody style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>¡Bienvenido!</h2>
      </MDBCardBody>
    </MDBCard>
  );
};

class dashboard extends Component {
  constructor(props) {
    super();
  }
  render() {
    const mystyle = {
      // backgroundColor : "#45cafc"
      background: "linear-gradient(40deg, #303f9f, #45cafc)"
    };
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                style={mystyle}
                onSelect={selected => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                  <NavItem eventKey="mercados">
                    <NavIcon>
                      <StoreIcon fontSize="large" />
                    </NavIcon>
                    <NavText>Supermercados</NavText>
                  </NavItem>
                  <NavItem eventKey="reports">
                    <NavIcon>
                      <InsertChartIcon fontSize="large" />
                    </NavIcon>
                    <NavText>Reportes</NavText>
                    <NavItem eventKey="reports/historial">
                      <NavText>Historial Cliente</NavText>
                    </NavItem>

                    <NavItem eventKey="reports/sucursales">
                      <NavText>Sucursales con Pedidos</NavText>
                    </NavItem>

                    <NavItem eventKey="reports/top5">
                      <NavText>top 5 Sucursales</NavText>
                    </NavItem>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main style={{ marginLeft: "120px" }}>
                <Route path="/" exact component={Hello} />
                <Route path="/home" component={Hello} />
                <Route path="/mercados" component={Market} />
                <Route path="/reports/sucursales" component={Report} />
                <Route path="/reports/historial" component={History} />
                <Route path="/reports/top5" component={Report} />
              </main>
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}

export default dashboard;
