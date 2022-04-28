import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import "../scss/Products.scss";
import "../scss/SingleProduct.scss";
import { setGuitarBySpecs as actionSetGuitarBySpecs } from "../actions/guitarActions";
import ComboBoxFilter from "../components/ComboBoxFilter";
import SingleProduct from "../components/SingleProduct";

const Products = ({ loading, setGuitarBySpecs }) => {
  const [typeGuitar, setTypeGuitar] = useState({
    value: "",
    options: {
      options: ["Acústica", "Electroacústica", "Eléctrica"],
    },
  });
  const [model, setModel] = useState({
    value: "",
    options: {
      Acústica: ["Concert", "Grand Concert", "Dreadnought"],
      Electroacústica: ["Auditorium", "Jumbo", "Ovation", "Folk"],
      Eléctrica: ["Telecaster", "Estratocaster", "SG", "Less paul"],
    },
  });
  const [brand, setBrand] = useState({
    value: "",
    options: {
      Acústica: ["Fender", "Gibson", "Yamaha"],
      Electroacústica: ["Fender", "Gibson", "Yamaha"],
      Eléctrica: ["Fender", "Gibson", "Yamaha"],
    },
  });
  const [strings, setStrings] = useState({
    value: "",
    options: {
      Acústica: [6],
      Electroacústica: [6, 12],
      Eléctrica: [6],
    },
  });
  const [typeStrings, setTypeStrings] = useState({
    value: "",
    options: {
      Acústica: ["Nylon", "Acero"],
      Electroacústica: ["Nylon", "Acero"],
      Eléctrica: ["Acero"],
    },
  });
  const [tuner, setTuner] = useState({
    value: "",
    options: {
      Acústica: ["E", "D"],
      Electroacústica: ["E", "D"],
      Eléctrica: ["E", "D", "C"],
    },
  });
  const [showresult, setShowResult] = useState(false);

  const readyForSearch = () => {
    return (
      typeGuitar.value &&
      model.value &&
      brand.value &&
      strings.value &&
      typeStrings.value &&
      tuner.value
    );
  };

  return (
    <div className="container mainProducts" style={{
      marginTop: "3.5rem"
    }}>
      <div className="title">
        <h2>Elige las características deseadas...</h2>
      </div>

      <Container>
        <Row>
        <Col style={{width: "13rem"}}>
            <ComboBoxFilter
              classType={true}
              name="Tipo de guitarra"
              state={typeGuitar}
              setState={setTypeGuitar}
              type={"options"}
              onChangeFunction={() => {
                setModel({ value: "", options: model.options });
                setBrand({ value: "", options: brand.options });
                setStrings({ value: "", options: strings.options });
                setTypeStrings({ value: "", options: typeStrings.options });
                setTuner({ value: "", options: tuner.options });
              }}
            />
          </Col>
        </Row>
        <Row xs={1} sm={2} md={3} lg={4} className="rowFilters">
          

          {typeGuitar.value && (
            <>
              <Col>
                <ComboBoxFilter
                  name="Modelo"
                  state={model}
                  setState={setModel}
                  type={typeGuitar.value}
                />
              </Col>
              <Col>
                <ComboBoxFilter
                  name="Marca"
                  state={brand}
                  setState={setBrand}
                  type={typeGuitar.value}
                />
              </Col>
              <Col>
                <ComboBoxFilter
                  name="Número de cuerdas"
                  state={strings}
                  setState={setStrings}
                  type={typeGuitar.value}
                />
              </Col>
              <Col>
                <ComboBoxFilter
                  name="Tipo de cuerdas"
                  state={typeStrings}
                  setState={setTypeStrings}
                  type={typeGuitar.value}
                />
              </Col>
              <Col>
                <ComboBoxFilter
                  name="Afinación"
                  state={tuner}
                  setState={setTuner}
                  type={typeGuitar.value}
                />
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col>
            <Button
              className="buttonBlue"
              id="searchProducts"
              disabled={!readyForSearch()}
              onClick={() => {
                setShowResult(true);
                return setGuitarBySpecs(
                  typeGuitar.value,
                  strings.value,
                  typeStrings.value,
                  model.value,
                  brand.value,
                  tuner.value
                );
              }}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Container>
      <Row className="resultProduct">
        <Col>
          {!loading && showresult && (
            <>
              <h2 style={{textAlign: "center", marginTop: "1.5rem"}}>Resultados</h2>
              <SingleProduct></SingleProduct>
            </>
          )}
          {loading && (
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
});

const mapDispatchToProps = {
  setGuitarBySpecs: actionSetGuitarBySpecs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
