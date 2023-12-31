import React from "react";
import { useState } from 'react';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notifications() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">Notification</strong>
          <small>12 mins ago</small>
        </Toast.Header>
        <Toast.Body>There are some new updates that you might love!</Toast.Body>
      </Toast>
      <header className="App-header">
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}
export default Notifications;