import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { setGuitarBySpecs } from "../actions/guitarActions";
import ComboBoxFilter from "./ComboBoxFilter";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";
import fireApp, { db } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


const auth = getAuth(fireApp);

const NavBarFilter = ({ loading, error, setGuitarBySpecs, guitarGeneral }) => {

  console.log(auth)
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
      Acústica: ["Fender", "Gybson", "Yamaha"],
      Electroacústica: ["Fender", "Gybson", "Yamaha"],
      Eléctrica: ["Fender", "Gybson", "Yamaha"],
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

  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  const readyForSearch = () => {
    
    return !!(typeGuitar.value &&
      model.value &&
      brand.value &&
      strings.value &&
      typeStrings.value &&
      tuner.value);
  };

  useEffect(() => {
    console.log(readyForSearch().toString())
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/login");
    }
    return () => {
      console.log("final")
    }
  }, [navigate])



  return (
    <Container className="mainContainer" >
      <Row >

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

            <Button
              className="buttonBlue"
              id="searchProducts"
              disabled={!readyForSearch()}
              onClick={() => {
                return (
                  setGuitarBySpecs(
                    typeGuitar.value,
                    strings.value,
                    typeStrings.value,
                    model.value,
                    brand.value,
                    tuner.value
                  )
                  
                  )
              }}>
              Buscar
            </Button>

        </Col>
      </Row>
      <Row className="resultProduct">
        <Col>
          {loading ? (
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
            />
          ) : guitarGeneral && <SingleProduct SingleProduct={guitarGeneral} stateSearch={readyForSearch()}></SingleProduct>}
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
