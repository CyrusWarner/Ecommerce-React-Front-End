import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { FaPlus, FaMinus, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import "./shoppingCart.css"
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

const ShoppingCart = (props) => {
  const {shoppingCart , user, product, getUsersCart, increaseQuantity, decreaseQuantity, deleteItemFromCart}  = props;
  const [quantityDidChange, setQuantityDidChange] = useState(false);
  const [didDeleteProduct, setDidDeleteProduct] = useState(false);
  let total = 0;
  shoppingCart.map((item) => {
    total += item.product.price * item.quantity
  })
  useEffect( () =>{
    getUsersCart()
  }, [quantityDidChange, didDeleteProduct])

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://localhost:3000/api/shoppingcart/",
      { token, product }
    );
    const { status } = response.data;
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  var image = new Image()
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col sm={8}>
              <h1 className="title">{user.user.username}'s Shopping Cart!</h1>
            <div className="total">
              <h4>
                Total:
                <FaDollarSign size="1.5rem" style={{ color: "green" }} />
                {total}
              </h4>
            </div>
          </Col>
          <Col sm={4}></Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="d-flex justify-content-center m-1">
          {shoppingCart.map((item) => {
            if (item.product.image === null || item.product.image === "") {
              image.src =
                "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
            } else {
              image.src = item.product.image;
            }
            <div>{total += item.product.price * item.quantity }</div>

            return (
              <React.Fragment>
        
                  <Card
                    className="cardGlow"
                    style={{ width: "25rem", margin: "1rem" }}
                  >
                    <Card.Img className="image" src={image.src} />
                    <Card.Title className="fs-2 ms-3 mt-2">
                      {item.product.name}
                    </Card.Title>
                    <Card.Body>
                      <Card.Text>{item.product.description}</Card.Text>
                      <Row>
                        <Col sm={4}>
                          <span
                            style={{ marginRight: "0.5rem" }}
                            className="fs-5"
                          >
                            {" "}
                            Quantity: {item.quantity}
                          </span>
                          <FaPlus
                            size="1.5rem"
                            onClick={async () => {
                              await increaseQuantity(
                                item.quantity,
                                item.shoppingCartId
                              );
                              setQuantityDidChange(!quantityDidChange);
                            }}
                          />
                          <FaMinus
                            size="1.5rem"
                            onClick={async () => {
                              await decreaseQuantity(
                                item.quantity,
                                item.shoppingCartId
                              );
                              setQuantityDidChange(!quantityDidChange);
                            }}
                          />
                        </Col>
                      </Row>
                      <div className="fs-5 mb-2">
                        Price:{" "}
                        <FaDollarSign
                          size="1.5rem"
                          style={{ color: "green" }}
                        />
                        {item.product.price * item.quantity}
                      </div>
                      <StripeCheckout
                        stripeKey="pk_test_51JPBMHKKQZlcZJbhcrE6yUPCJQgqgAWMk01gbMx0OpWffz07OZiSQa886wWpgknWutqyy6qogtyPb2TrXnlEFzi000pAh9DgsT"
                        token={handleToken}
                        amount={item.product.price * 100}
                        name="Checkout"
                        billingAddress
                        shippingAddress
                      />
                      <Container className="g-0">
                        <Row className="g-0">
                          <Col></Col>
                          <Col></Col>
                          <Col className="d-flex justify-content-end">
                            <FaTrashAlt size="1.75rem"className="trashIcon" onClick={async () => {await deleteItemFromCart(item.shoppingCartId); setDidDeleteProduct(!didDeleteProduct)}} />
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                
              </React.Fragment>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default ShoppingCart;

//  <Container>

//   /* <Row>
// <Col sm={1}></Col>
// <Col sm={10}>
// <div className="mb-2 fs-5" style={{color: "white"}}>Sold by: {item.product.user.userName}</div>
// </Col>
// <Col sm={1}></Col>
// </Row>
// </Container> 

