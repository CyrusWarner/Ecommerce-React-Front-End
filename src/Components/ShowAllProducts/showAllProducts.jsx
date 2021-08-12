import React from 'react';  
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ShowAllProducts = (props) => {
    let allProducts = props.allProducts
    let createCurrentProduct = props.createCurrentProduct
    return (
        <React.Fragment>

            <Container>
            <Row>
                <Col sm={4}>
                <h1>All Products</h1>
            {/* ADD SHOW ALL CATEGORES HERE */}
                </Col>
                <Col sm={8}></Col>
            </Row>
        </Container>
            <Container fluid>
                <Row className="d-flex justify-content-center">
                    {allProducts.map((product) =>{
                        return (
                            <Card
                            className="card-container border border-primary "
                            style={{ width: "18rem", margin: "1rem" }}
                          >
                            <Card.Body className="text-center">
                              <Card.Title>{product.name}</Card.Title>
                              <Card.Text>{product.description}</Card.Text>
                              <Card.Text>Price: ${product.price}</Card.Text>
                              <Card.Text>Rating: {product.averageRating}</Card.Text>
                              <Link to="/viewproduct"><Button onClick={() => (createCurrentProduct(product))}>View product</Button></Link>
                            </Card.Body>
                          </Card>
                        )
                    })}
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ShowAllProducts