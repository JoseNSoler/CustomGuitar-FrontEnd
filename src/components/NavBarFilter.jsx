import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { setGuitarBySpecs } from "../actions/guitarActions";
import ComboBoxFilter from "./ComboBoxFilter";

const NavBarFilter = ({ loading, error, setGuitarBySpecs }) => {
  const [typeGuitar, setTypeGuitar] = useState({
    value: "",
    options: {
      options: ["Acústica", "Electroacustica", "Electrica"],
    },
  });
  const [model, setModel] = useState({
    value: "",
    options: {
      acustica: ["Concert", "Grand Concert", "Dreadnought"],
      electroacustica: ["Auditorium", "Jumbo", "Ovation", "Folk"],
      electrica: ["Telecaster", "Estratocaster", "SG", "Less paul"],
    },
  });
  const [brand, setBrand] = useState({
    value: "",
    options: {
      acustica: ["Fender", "Gybson", "Yamaha"],
      electroacustica: ["Fender", "Gybson", "Yamaha"],
      electrica: ["Fender", "Gybson", "Yamaha"],
    },
  });
  const [strings, setStrings] = useState({
    value: "",
    options: {
      acustica: [6],
      electroacustica: [6, 12],
      electrica: [6],
    },
  });
  const [typeStrings, setTypeStrings] = useState({
    value: "",
    options: {
      acustica: ["Nylon", "Acero"],
      electroacustica: ["Nylon", "Acero"],
      electrica: ["Acero"],
    },
  });
  const [tuner, setTuner] = useState({
    value: "",
    options: {
      acustica: ["E", "D"],
      electroacustica: ["E", "D"],
      electrica: ["E", "D", "C"],
    },
  });

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
    <Container>
      <Row xs={1} md={2} lg={3}>

        <Col>
          <ComboBoxFilter
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

      <Row>
        {typeGuitar.value ? (
          <Col className="optionsDiv">
            <div className="optionsFilter">
              <ComboBoxFilter
                name="Modelo"
                state={model}
                setState={setModel}
                type={typeGuitar.value}
              />
              <ComboBoxFilter
                name="Marca"
                state={brand}
                setState={setBrand}
                type={typeGuitar.value}
              />
              <ComboBoxFilter
                name="Número de cuerdas"
                state={strings}
                setState={setStrings}
                type={typeGuitar.value}
              />
              <ComboBoxFilter
                name="Tipo de cuerdas"
                state={typeStrings}
                setState={setTypeStrings}
                type={typeGuitar.value}
              />
              <ComboBoxFilter
                name="Afinación"
                state={tuner}
                setState={setTuner}
                type={typeGuitar.value}
              />
            </div>
          </Col>
        ) : (
          <Col className="none">
            <div className="optionsFilter none"></div>
          </Col>
        )}
      </Row>


      <Row>
        <Col>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              disabled={!readyForSearch()}
              onClick={() => {
                setGuitarBySpecs(
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
          </div>
        </Col>

        <Col>
          {loading ? (
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
            />
          ) : null}
        </Col>


      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
});

const mapDispatchToProps = {
  setGuitarBySpecs,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarFilter);
