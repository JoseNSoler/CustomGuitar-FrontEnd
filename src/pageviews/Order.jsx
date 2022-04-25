import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setOrderById } from "../actions/guitarActions.js";
import OrderInfo from "../components/OrderInfo.jsx";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function Order({ loading, error, order, setOrderById }) {
  const params = useParams();
  const auth = getAuth(fireApp);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    params.uid === auth.currentUser.uid
      ? setOrderById(params.id)
      : setAccessDenied(true);
  }, [auth.currentUser.uid, params.id, params.uid, setOrderById]);

  const renderOrder = () => {
    if (accessDenied) {
      return <h1>401 Unauthorized</h1>;
    }

    if (loading) {
      return (
        <Spinner
          style={{ position: "absolute", left: "50%", top: "50%" }}
          animation="border"
        />
      );
    }

    if (error) {
      return <h1>408 Request Timeout</h1>;
    }

    if (order.id)
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
  };
  return <>{renderOrder()}</>;
}

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
  order: state.guitar.order,
});

const mapDispatchToProps = { setOrderById };
export default connect(mapStateToProps, mapDispatchToProps)(Order);
