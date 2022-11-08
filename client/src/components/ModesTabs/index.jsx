import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import { Container, Row, Col } from "react-bootstrap";
import SlidersBar from "../SlidersBar";
import React, { useContext } from "react";
import { AppContext } from "../../contexts";
const ModesTabs = () => {
  return (
    <section className="project" id="project">
      <Container>
        <Col>
          <Tab.Container id="projects-tabs" defaultActiveKey="freq">
            <Nav
              variant="tabs"
              className="nav-pills mb-5 justify-content-center align-items-center"
              id="pills-tab"
            >
              <Nav.Item>
                <Nav.Link eventKey="freq">Frequency</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vowels">Vowels</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="music">Music</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content
              id="slideInUp"
              className={"animate__animated animate__slideInUp"}
            >
              <Tab.Pane eventKey="freq">
                <SlidersBar mode={0} />
              </Tab.Pane>
              <Tab.Pane eventKey="vowels">
                <SlidersBar mode={1} />
              </Tab.Pane>
              <Tab.Pane eventKey="music">
                <SlidersBar mode={2} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Container>
    </section>
  );
};

export default ModesTabs;
