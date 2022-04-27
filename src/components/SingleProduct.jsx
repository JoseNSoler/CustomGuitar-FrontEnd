import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createOrderByuid as actionCreateOrderByuid } from "../actions/guitarActions";
import { useNavigate } from "react-router-dom";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(fireApp);

const SingleProduct = ({ order, guitarGeneral, createOrderByuid }) => {
  const [luthier, setLuthier] = useState(false);

  const navigate = useNavigate();

  const wasBuyed = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    createOrderByuid(auth.currentUser.uid, luthier, product);
  };

  useEffect(() => {
    if (order.created) {
      navigate(`/${auth.currentUser.uid}/order/${order.id}`);
    }
  }, [navigate, order.created, order.id]);

  if (guitarGeneral.length > 0) {
    return (
      <div className="pb-4" style={{ margin: "0 .4rem" }}>
        {guitarGeneral.map((product, index) => {
          return (
            <Row key={index} xs={1} md={2} className="guitarGeneralMain">
              <Col className="guitarImagePrice" id="guitarImagePriceID">
                <h4>
                  Guitarra de tipo {product.tipo}, Marca {product.marca} modelo{" "}
                  {product.modelo}
                </h4>

                <div className="imageAlone bg-image hover-zoom">
                  <img src={product.imagen} alt="productImage"></img>
                </div>

                <div className="price">
                  Precio <p className="priceAlone">{`$${product.precio}`}</p>
                </div>
              </Col>
              <Col className="guitarInfoLuthier" id="guitarInfoLuthierID">
                <p>
                  <b>Especificaciones</b>
                </p>
                <ul>
                  <li> Afinacion: {product.afinacion}</li>
                  <li> Número de cuerdas: {product.numCuerdas}</li>
                  <li> Tipo de cuerdas: {product.tipoCuerda}</li>
                </ul>
                <div className="mt-2">
                  <p>
                    <b>Certificación</b>
                  </p>
                  <p>
                    El luthier, uno de los más bellos oficios de la historia que
                    conjuga unas manos increíbles para trabajar todo tipo de
                    materiales, sobre todo la madera, y un amor por la música
                    que le lleva a investigar hasta la perfección del sonido de
                    nuestras guitarras.
                  </p>
                  <p>
                    Elige la opcion de Luthier para certificar y optimizar el
                    sonido de tu guitarra
                  </p>
                </div>
                <Form
                  onSubmit={(event) => {
                    wasBuyed(event, product);
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                    }}>
                    <Form.Check
                      type="checkbox"
                      id="checkbox"
                      label="Uso de luthier"
                      onChange={() => {
                        setLuthier(!luthier);
                      }}
                    />
                    <p className="priceLuthAlone" id="productPriceID">
                      $250000
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="buttonBlue"
                    id="buyProduct">
                    COMPRAR
                  </Button>
                </Form>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }

  return (
    <Row>
      <Col>
        <h4 className="my-5">No se encontaron elementos</h4>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  guitarGeneral: state.guitar.guitar,
  order: state.guitar.order,
});

const mapDispatchToProps = {
  createOrderByuid: actionCreateOrderByuid,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
