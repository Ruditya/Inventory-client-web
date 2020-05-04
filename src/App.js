import React, { Component } from "react";
// import { Container } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import ProductIndex from "./ProductIndex";
import './App.css';

class App extends Component {
  render() {
    return (
      <container>
        <div className="btn-header">
          <ModalComponent text="Tambah" />
          <ProductIndex />
        </div>
      </container>
    );
  }
}

export default App;
