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
import FormUpdateFile from "../components/FormUpdateFile.jsx";

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

  const paymentNumber = "metodo de pago por Nro comprobante"
  const paymentURL = "Metodo de pago por anexo"
  const [payment, setPayment] = useState(paymentNumber)

  useEffect(() => {
    params.uid !== auth.currentUser.uid
      ? setAccessDenied(true)
      : setOrderById(params.id);
  }, [auth.currentUser.uid, params.id, params.uid, setOrderById]);

  const isValidReceipt = () => {
    if (receipt === "") {
      setErrorReceipt({
        value: true,
        info: "Debe adjuntar un número de comprobante de pago para continuar",
      });
      return false;
    }
    if (receipt.match(/^\d+$/) === null) {
      setErrorReceipt({
        value: true,
        info: "El comprobante de pago debe ser números únicamente",
      });
      return false;
    }
    if (receipt.length !== 10) {
      setErrorReceipt({
        value: true,
        info: "El número de comprobante debe tener únicamente 10 dígitos",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidReceipt()) {

      setValidated(true);

      if (payment === paymentNumber) {
        updateOrderById(params.id, auth.currentUser.uid, receipt);
      }
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
          Comprobante ={order.comprobante} adjuntado con éxito a la orden
        </Alert>
      );
    }
  };

  const formPayment = () => {
    const changeMethod = () => {
      switch (payment) {
        case paymentNumber:
          setPayment(paymentURL)
          break;
        case paymentURL:
          setPayment(paymentNumber)
          break;
        default:
          break;
      }
    }
    return (
      <>
        {renderAlerts()}
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={payment}
            onChange={() => {
              setErrorReceipt({ info: "" })
              changeMethod()

            }}
          />
        </Form>
        <Form noValidate validated={validated} className="buttonsOrder">
          {(payment === paymentNumber) ? (
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
          ) : (
            <div>
              <Row>
                <FormUpdateFile></FormUpdateFile>
              </Row>

            </div>
          )}
          {!order.comprobante && (
            <div
              className="buttonDiv"
              onClick={(event) => {
                handleSubmit(event);
              }}>
              <Button id="sendReceipt" type="submit" className="button">
                Enviar
              </Button>
            </div>

          )}

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
            <h2>{`¡Felicidades, ${auth.currentUser.displayName}!`}</h2>
            <p>
              {`Estamos a un paso de que obtengas la guitarra de tus sueños${order.carrito[0].luthier.seleccionado
                ? " testeada y certificada por el mejor luthier de América."
                : "."
                }`}
              <br />
              {order.carrito[0].luthier.seleccionado
                ? null
                : "Lo invitamos a que use el servicio exclusivo de nuestro Luthier para su proxima compra."}
            </p>
            <br />
          </div>
          <Row xs={1} lg={2} className="mainOrder">
            <Col syle={{ padding: 0 }}>
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
