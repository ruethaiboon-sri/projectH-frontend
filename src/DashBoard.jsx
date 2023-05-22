import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Activitycard from "./component/Activitycard";
import Profile from "./component/Profile";
import AddBtn from './component/AddBtn';
import Layout from "./Navbar/Layout";
import DashboardLabel from "./component/DasboardLabel";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'

function Dashboard() {
  return (
    <Layout>
    <Container fluid className="bigcontainer">
      
      <Row>
      <AddBtn />
        <Col className="d-none d-md-block profile" md={3} xl={2}>
            <Profile />
        </Col>
        <Col className="dashboard"  sm={12} md={9} xl={10}>
          <DashboardLabel />
          
            <Activitycard />
          
        </Col>
      </Row>
    </Container>
    </Layout>
  );
}

export default Dashboard;
