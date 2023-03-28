import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";

const Pizzas = () => {
  return (
      <Container >
        <Row style={{margin: '5rem 0'}}>
          {products.map((item) => (
            <Col
              lg="3"
              md="4"
              sm="6"
              xs="6"
              key={item.id}
              className="mb-4 mt-4"
            >
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default Pizzas;
