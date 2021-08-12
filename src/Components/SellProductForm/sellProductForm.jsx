import axios from 'axios';
import React, {useState} from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
const SellProductForm = (props) => {
    //CATEGORYID IS GOING TO CHANGE WHEN PROPS ARE TAKEN IN WHEN A CATEGORY IS SELECTED WE WILL REPLACE 1 WITH THAT SPECIFIC CATEGORIESID
    //ADD CONDITIONAL FOR IF A USER IS LOGGED IN AND ON SELL PRODUCT AND REFRESHES THE PAGE TO PREVENT WEBSITE FROM BREAKING
    let id;
    let currentToken = props.currentToken;
    let getAllProducts = props.getAllProducts;
    if(props.currentUser !== undefined) {
        id = props.currentUser.user.id;
    }
    const initialInput = {
        AverageRating: 1,
        CategoryId: 1,
        Description: "",
        Name: "",
        Price: 0,
        UserId: id
    }
    const [eachEntry, setEachEntry] = useState(initialInput)
    const handleChange = (event) => {
        setEachEntry({...eachEntry, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        submitProduct();
    }

    const submitProduct = async () => {
        let productData = eachEntry
        let intPriceProductData = Number(`${productData.Price}`)
        // if (intPriceProductdata == NaN || intPriceProductData == 0){} ADD LOGIC HERE FOR ALERTING A USER THAT THEY NEED TO ENTER AN INTEGER
        productData.Price = intPriceProductData
        await axios.post("https://localhost:44394/api/product", productData, { headers: {Authorization: 'Bearer ' + currentToken}}) //Creates a new product
        getAllProducts();
    }
    return (
        <React.Fragment>
        <Container>
            <Row>
                <Col sm={4}>
                <h1 className="mb-3">Sell A Product</h1>
                </Col>
                <Col sm={8}></Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col sm={8}>        
                    <Form onSubmit={handleSubmit}>
                        <div>
                    <Form.Label> Product Name
                    <Form.Control onChange={handleChange} name="Name" placeholder="Product name..."></Form.Control>
                    </Form.Label>
                    </div>
                    <div>
                    <Form.Label> Product Description
                    <Form.Control onChange={handleChange} name="Description"placeholder="Product description..."></Form.Control>
                    </Form.Label>
                    </div>
                    <div>
                    <Form.Label> Product Price
                    <Form.Control onChange={handleChange} name="Price"placeholder ="Product Price"></Form.Control>
                    </Form.Label>
                    </div>
                    <Button type="submit">Submit New Product</Button>
                    </Form>
                </Col>
                <Col sm={4}></Col>
            </Row>
        </Container>
        </React.Fragment>
    )
}

export default SellProductForm