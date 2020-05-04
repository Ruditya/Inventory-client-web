import React from "react";
import API from "./API";
// import { Button, Table } from "react-bootstrap";
import './index.css';
import ModalComponent from "./ModalComponent";

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
    };
  }

  componentDidMount() {
    this.getProduct();
    // const URL = "http://wayangapi.herokuapp.com/api/wayang";
    // fetch(URL)
    // .then(res => res.json())
    // .then(response => {
    //     this.setState({wayangs: response.result})
    // }),
    // (error) => {
    //     this.setState({ error });
    // }
  }

  getProduct() {
    API.get("/read")
      .then((res) => {
        console.log(res);
        this.setState({ products: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  deleteProduct = (id) => {
    API.delete("/delete/" + id)
      .then((_res) => {
        this.render();
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.getProduct();
    this.render();
  };

  render() {
    const { products, error } = this.state;
    if (error) {
      return <div>Error : {error.message}</div>;
    } else {
      return (
        <table className="table">
          <thead >
            <tr className="tabletext">
            <th>Product ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <line></line>
          <tbody >
            {products.map((product) => (
              <tr key={product.id}>
              <td>{product.id}</td>
                <td >{product.name}</td>
                <td >{product.description}</td>
                <td >{product.price}</td>
                <td >
                  <ModalComponent id={product.id} text="Edit"/>
                  </td>
                  <td>
                  <button className="btn-remove" onClick={() => this.deleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}
export default ProductIndex;
