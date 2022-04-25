import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { setGuitarBySpecs } from "../actions/guitarActions";
import ComboBoxFilter from "./ComboBoxFilter";
import SingleProduct from "./SingleProduct";

const NavBarFilter = ({ loading, error, setGuitarBySpecs, guitarGeneral }) => {
  const [typeGuitar, setTypeGuitar] = useState({
    value: "",
    options: {
      options: ["Acústica", "Electroacústica", "Electrica"],
    },
  });
  const [model, setModel] = useState({
    value: "",
    options: {
      Acústica: ["Concert", "Grand Concert", "Dreadnought"],
      Electroacústica: ["Auditorium", "Jumbo", "Ovation", "Folk"],
      Electrica: ["Telecaster", "Estratocaster", "SG", "Less paul"],
    },
  });
  const [brand, setBrand] = useState({
    value: "",
    options: {
      Acústica: ["FENDER", "GYBSON", "YAMAHA"],
      Electroacústica: ["FENDER", "GYBSON", "YAMAHA"],
      Electrica: ["FENDER", "GYBSON", "YAMAHA"],
    },
  });
  const [strings, setStrings] = useState({
    value: "",
    options: {
      Acústica: [6],
      Electroacústica: [6, 12],
      Electrica: [6],
    },
  });
  const [typeStrings, setTypeStrings] = useState({
    value: "",
    options: {
      Acústica: ["Nylon", "Acero"],
      Electroacústica: ["Nylon", "Acero"],
      Electrica: ["Acero"],
    },
  });
  const [tuner, setTuner] = useState({
    value: "",
    options: {
      Acústica: ["E", "D"],
      Electroacústica: ["E", "D"],
      Electrica: ["E", "D", "C"],
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

  useEffect(() => {
    console.log(guitarGeneral)
  
    return () => {
      console.log("final")
    }
  }, [guitarGeneral])
  

  return (
    <Container>
      <Row >

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

        {typeGuitar.value ? (
          <Row xs={1} sm={2} md={3} lg={4} className='rowFilters'>
            <Col >
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
            </Row>
        ) : (
          <Row className="none">
          <Col >
            <div className="optionsFilter none"></div>
          </Col>
          </Row>
        )}

        
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
      </Row>
      <Row>
      <Col>
          {loading ? (
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
            />
          ) : guitarGeneral && <SingleProduct SingleProduct={guitarGeneral}></SingleProduct>}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.guitar.loading,
  error: state.guitar.error,
  guitarGeneral: state.guitar.guitar
});

const mapDispatchToProps = {
  setGuitarBySpecs,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarFilter);
