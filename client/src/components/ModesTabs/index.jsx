import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Col } from "react-bootstrap";
import SlidersBar from "../SlidersBar";
import React, { useContext } from "react";
import { AppContext } from "../../contexts";
const ModesTabs = () => {
  // init context value
  const { setcurrentMode } = useContext(AppContext);
  return (
    <section className="project" id="project">
      <Container>
        <Col>
          <Tab.Container id="projects-tabs" defaultActiveKey="freq">
            <Nav
              variant="tabs"
              className="nav-pills mb-5 justify-content-center align-items-center"
              id="pills-tab"
              onSelect={(selectedKey) => {
                if (selectedKey === "freq") {
                  setcurrentMode(0);
                } else if (selectedKey === "vowels") {
                  setcurrentMode(1);
                } else if (selectedKey === "music") {
                  setcurrentMode(2);
                } else if (selectedKey === "voice") {
                  setcurrentMode(3);
                }
              }}
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
              <Nav.Item>
                <Nav.Link eventKey="voice">Animals</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content
              id="slideInUp"
              className={"animate__animated animate__slideInUp"}
            >
              <Tab.Pane eventKey="freq">
                <SlidersBar />
              </Tab.Pane>
              <Tab.Pane eventKey="vowels">
                <SlidersBar />
              </Tab.Pane>
              <Tab.Pane eventKey="music">
                <SlidersBar />
              </Tab.Pane>
              <Tab.Pane eventKey="voice">
                <SlidersBar />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Container>
    </section>
  );
};

export default ModesTabs;
