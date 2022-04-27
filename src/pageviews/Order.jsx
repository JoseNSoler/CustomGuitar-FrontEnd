import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Spinner,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setOrderById as actionSetOrderById,
  updateOrderById as actionUpdateOrderById,
} from "../actions/guitarActions.js";
import OrderInfo from "../components/OrderInfo.jsx";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";

import "../scss/Order.scss";

function Order({ loading, error, order, setOrderById, updateOrderById }) {
  const params = useParams();
  const auth = getAuth(fireApp);
  const [accessDenied, setAccessDenied] = useState(false);
  const [validated, setValidated] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [errorReceipt, setErrorReceipt] = useState({
    value: false,
    info: "",
  });

  useEffect(() => {
    params.uid !== auth.currentUser.uid
      ? setAccessDenied(true)
      : setOrderById(params.id);
  }, [auth.currentUser.uid, params.id, params.uid, setOrderById]);

  const isValidReceipt = () => {
    console.log(receipt.match(/^\d+$/) != null)
    if (receipt === "") {
      setErrorReceipt({
        value: true,
        info: "Debe adjuntar un número de comprobante de pago para continuar",
      });
      return false;
    }
    if(receipt.match(/^\d+$/) == null){
      setErrorReceipt({
        value: true,
        info: "El comprobante de pago debe ser numeros unicamente",
      });
      return false;
    }
    if(receipt.length != 10){
      setErrorReceipt({
        value: true,
        info: "El numero comprobante debe tener solo 10 digitos",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidReceipt()) {
      setValidated(true);

      //updateOrderById(params.id, auth.currentUser.uid, receipt);
    }
  };

  const renderAlerts = () => {
    if (errorReceipt.value) {
      return (
        <Alert className="errorReceipt" variant="danger">
          {errorReceipt.info}
        </Alert>
      );
    }

    if (order.comprobante) {
      return (
        <Alert className="successReceipt" variant="success">
          Comprobante No. {order.comprobante} enviado con éxito
        </Alert>
      );
    }
  };

  const formPayment = () => {
    return (
      <>
        {renderAlerts()}
        <Form noValidate validated={validated} className="buttonsOrder">
          <Row>
            <Form.Group as={Col} controlId="inputReceipt">
              <Form.Control
                required
                type="text"
                className="inputPayment"
                placeholder="No. Comprobante"
                onChange={(event) => {
                  setReceipt(event.target.value);
                  setErrorReceipt({
                    value: false,
                    info: "",
                  });
                }}
                value={receipt}
              />
            </Form.Group>
          </Row>
          <div
            className="buttonDiv"
            onClick={(event) => {
              handleSubmit(event);
            }}>
            <Button id="sendReceipt" type="submit" className="button">
              Enviar
            </Button>
          </div>
        </Form>
      </>
    );
  };

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
    if (order.carrito?.length)
      return (
        <Container>
          <div className="header">
            <h2>{"¡Felicidades!"}</h2>
            <p>
              {`Estamos a un paso de que obtengas la guitarra de tus sueños${
                order.carrito[0].luthier.seleccionado
                  ? " testeada y certificada por el mejor luthier de América."
                  : "."
              }`}
              <br />
              {order.carrito[0].luthier.seleccionado
                ? null
                : "Lo invitamos a que use el servicio exclusivo de nuestro Luthier."}
            </p>
            <br />
          </div>
          <Row xs={1} lg={2} className="mainOrder">
            <Col syle={{padding: 0}}>
              <OrderInfo order={order}></OrderInfo>
            </Col>
            <Col className="my-auto">
              <h5>{"Método de pago".toUpperCase()}</h5>
              <p>
                Por favor realiza una consignacion a nuestra cuenta de ahorros
                Bancolombia: <br />
                N° 618 863 775 90
              </p>
              <h5>{"Comprobante de pago".toUpperCase()}</h5>
              <p>
                Adjunta el número de comprobante de la transferencia realizada
              </p>
              {formPayment()}
            </Col>
          </Row>
        </Container>
      );
  };
  return (
    <div className="order">
      <div>{renderOrder()}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
  order: state.guitar.order,
});

const mapDispatchToProps = {
  setOrderById: actionSetOrderById,
  updateOrderById: actionUpdateOrderById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
