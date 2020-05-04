import React, { useState } from "react";
import API from "./API";
import { Button, Form, Modal } from "react-bootstrap";
import './index.css';



class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      error: null,
      data: {
        id: "",
        name: "",
        description: "",
        price: "",
      },
      modalShow: false,
      isUpdate: false,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ isUpdate: true });
      this.displayData();
    }
  }

  handleFormChange = (event) => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    this.setState({ data: newData });
  };

  getProduct = () => {
    API.get(`/read/${this.props.id}`)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  displayData = () => {
    this.getProduct();
    console.log(this.state.data);
  };

  saveProduct = () => {
    let data = this.state.data;
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    if (this.state.isUpdate) {
      API.put(`/update/${this.props.id}`, data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      API.post("/create", data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }

    this.setState({ modalShow: false });
    // let apiUrl = 'http://wayangapi.herokuapp.com/api/wayang';

    // fetch(apiUrl, {
    //     method: "POST",
    //     headers:{
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({
    //       response: result.result
    //     })
    //   },
    //   (error) => {
    //     this.setState({ error });
    //   }
    // )
  };

  render() {
    return (

      //baru


      
      //lama
      <div>
        <Button className="add-btn-prd" onClick={() => this.setState({ modalShow: true })}>
          {this.props.text}
        </Button>
        <Modal
          size="lg"
          show={this.state.modalShow}
          onHide={() => false}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg" className="headerlabel">
              {this.state.isUpdate ? "Ubah " : "Tambah "}
              Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-input form-input-wrapper">
            <Form.Group>
            <tr>
            <Form.Label >Product ID</Form.Label>
            </tr> 
                <tr>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="Product ID"
                  value={this.state.data.id}
                  onChange={this.handleFormChange}
                />
                </tr>
              </Form.Group>
              <Form.Group>
              <tr> <Form.Label>Product Name</Form.Label></tr>
              <tr>
              <Form.Control
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={this.state.data.name}
                  onChange={this.handleFormChange}
                />
              </tr>
               
                
              </Form.Group>
              <Form.Group>
              <tr>  <Form.Label>Description</Form.Label></tr>
              <tr>
              <Form.Control
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  value={this.state.data.description}
                  onChange={this.handleFormChange}
                />
              </tr>
                
              </Form.Group>
              <Form.Group>
              <tr><Form.Label>Price</Form.Label></tr>
                <tr>
                <Form.Control className="form-input:focus"
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={this.state.data.price}
                  onChange={this.handleFormChange}
                />
                </tr>
               
              </Form.Group>
              <div className="btn-cust">
              <Button className="btn-register" variant="primary" onClick={this.saveProduct} >
                Simpan
              </Button>
              &nbsp;
              <Button className="btn-remove:hover btn-remove"
                variant="secondary"
                onClick={() => this.setState({ modalShow: false })}>
                Batal
              </Button>
              </div>
              
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
