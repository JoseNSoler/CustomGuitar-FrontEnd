import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import "../scss/Products.scss";
import "../scss/SingleProduct.scss";
import { setGuitarBySpecs as actionSetGuitarBySpecs } from "../actions/guitarActions";
import ComboBoxFilter from "../components/ComboBoxFilter";
import SingleProduct from "../components/SingleProduct";
import { useNavigate } from "react-router-dom";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(fireApp);

const Products = ({ loading, setGuitarBySpecs }) => {
  const [typeGuitar, setTypeGuitar] = useState({
    value: "Acústica",
    options: {
      options: ["Acústica", "Electroacústica", "Eléctrica"],
    },
  });
  const [model, setModel] = useState({
    value: "Concert",
    options: {
      Acústica: ["Concert", "Grand Concert", "Dreadnought"],
      Electroacústica: ["Auditorium", "Jumbo", "Ovation", "Folk"],
      Eléctrica: ["Telecaster", "Estratocaster", "SG", "Less paul"],
    },
  });
  const [brand, setBrand] = useState({
    value: "Fender",
    options: {
      Acústica: ["Fender", "Gybson", "Yamaha"],
      Electroacústica: ["Fender", "Gybson", "Yamaha"],
      Eléctrica: ["Fender", "Gybson", "Yamaha"],
    },
  });
  const [strings, setStrings] = useState({
    value: "6",
    options: {
      Acústica: [6],
      Electroacústica: [6, 12],
      Eléctrica: [6],
    },
  });
  const [typeStrings, setTypeStrings] = useState({
    value: "Nylon",
    options: {
      Acústica: ["Nylon", "Acero"],
      Electroacústica: ["Nylon", "Acero"],
      Eléctrica: ["Acero"],
    },
  });
  const [tuner, setTuner] = useState({
    value: "E",
    options: {
      Acústica: ["E", "D"],
      Electroacústica: ["E", "D"],
      Eléctrica: ["E", "D", "C"],
    },
  });
  const [showresult, setShowResult] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

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
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="mainProducts">
      <h3>Guitarras</h3>
      <Container className="mainContainer">
        <Row>
          <Col>
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

        {typeGuitar.value ? (
          <Row xs={1} sm={2} md={3} lg={4} className="rowFilters">
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
          </Row>
        ) : (
          <Row className="none">
            <Col>
              <div className="optionsFilter none"></div>
            </Col>
          </Row>
        )}

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

        <Row className="resultProduct">
          <Col>
            {!loading && showresult && <SingleProduct></SingleProduct>}
            {loading && (
              <Spinner
                style={{ position: "absolute", left: "50%", top: "50%" }}
                animation="border"
              />
            )}
          </Col>
        </Row>
      </Container>
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
