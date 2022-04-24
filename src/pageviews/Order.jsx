import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setOrderById } from "../actions/guitarActions.js";
import OrderInfo from "../components/OrderInfo.jsx";

function Order({ loading, error, order, setOrderById }) {
  const params = useParams();

  useEffect(() => {
    // setOrderById(params.id);
  }, [params.id, setOrderById]);

  return (
    <Container>
      <Row xs={1} md={2}>
        <Col>
          <OrderInfo order={order}></OrderInfo>
        </Col>
        <Col>
          <h3>¡FELICIDADES!</h3>
          <p>
            Estamos a un paso de que obtengas la guitarra de tus sueños
            {order.carrito[0].luthier.seleccionado
              ? " testeada y certificada por el mejor luthier de América."
              : "."}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
  order: state.guitar.order,
});

const mapDispatchToProps = { setOrderById };
export default connect(mapStateToProps, mapDispatchToProps)(Order);
