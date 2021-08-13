import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SearchBar = (props) => {
  let setSearchFilteredProducts = props.setSearchFilteredProducts;
  let getAllProducts = props.getAllProducts
  const allProducts = props.allProducts;
  //   setSearchFilteredProducts(filteredProducts);
  const handleChange = (currentSearchText) => {
    let filteredProducts = [];
    allProducts.forEach((product) => {
      if (product.name.toLowerCase().includes(currentSearchText.toLowerCase())) {
        filteredProducts.push(product);
      }
    });
    if(currentSearchText !== ""){
        setSearchFilteredProducts(filteredProducts);
    }
    else {
        getAllProducts();
    }
    
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <input
              name="search"
              onChange={(event) => handleChange(event.target.value)}
              placeholder="Search By Product Name..."
              className="form-control"
            ></input>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SearchBar;