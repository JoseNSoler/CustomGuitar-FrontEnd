import React, { useState, useEffect } from 'react'
import { Button, Spinner, Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createOrderByUID } from "../actions/guitarActions";
import { useNavigate } from "react-router-dom";
import fireApp, { db } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";



const auth = getAuth(fireApp);

const SingleProduct = ({ SingleProduct, loading, error, createOrderByUID, guitarGeneral, order }) => {
    const [luthier, setLuthier] = useState(false)
    console.log(SingleProduct);
    const navigate = useNavigate();

    /*
    useEffect(() => {

        return () => {
            console.log(luthier)
        }
    }, [luthier])*/

    const wasBuyed = (event, product) => {
        event.preventDefault();
        console.log(auth.currentUser.uid)
        createOrderByUID(auth.currentUser.uid, luthier, product)
        console.log(luthier)
        console.log(order)
        navigate(`/${auth.currentUser.uid}/order/${order.id}`)
    }


    if (SingleProduct.length) {
        return (
            
            <div>
                <div>
                    {order ? <>{order.fecha} asdas</> : <>nonono</>}
                </div>
                {SingleProduct.map((product) => {
                    return (
                        <Row xs={1} md={2} className='guitarGeneralMain'>
                            <Col className='guitarImagePrice'>
                                <div className=''>
                                    <h4>Guitarra de tipo {product.tipo}, Marca {product.marca} modelo {product.modelo}</h4>

                                    <div className=''>
                                        <img src={product.imagen}></img>
                                    </div>
                                </div>
                            </Col>
                            <Col className='guitarInfoLuthier'>
                                <h5>Afinacion: {product.afinacion}</h5>
                                <div>
                                    Hermosa guitarra con un numero de cuerdas de {product.numCuerdas} de tipo {product.tipoCuerda}
                                </div>
                                <div>
                                    El luthier, uno de los más bellos oficios de la historia que conjuga unas manos increíbles para trabajar todo tipo de materiales, sobre todo la madera,
                                    y un amor por la música que le lleva a investigar hasta la perfección del sonido
                                </div>
                                <Form onSubmit={(event)=>{wasBuyed(event, product)}}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Check this switch"
                                        onChange={(event) => { setLuthier(!luthier) }}
                                    />

                                    <Button variant="primary" type="submit">
                                        COMPRAR!!
                                    </Button>
                                </Form>

                            </Col>
                        </Row>
                    )
                })}
            </div>

        )
    }
    if (SingleProduct.length === 0) {
        return (
            <Row>
                <Col>
                    No elementos
                </Col>
            </Row>
        )
    }

    return (
        <div className='none'>
            loading</div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.guitar.loading,
    error: state.guitar.error,
    guitarGeneral: state.guitar.guitar,
    order: state.guitar.order
});
  
const mapDispatchToProps = {
    createOrderByUID,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);




/*
<Row xs={1} md={2} className='guitarGeneralMain'>
                            <Col className='guitarImagePrice'>
                                <div className=''>
                                    <h4>Guitarra de tipo {product.tipo}, Marca {product.marca} modelo {product.modelo}</h4>

                                    <div className=''>
                                        <img src={product.imagen}></img>
                                    </div>
                                </div>
                            </Col>
                            <Col className='guitarInfoLuthier'>
                                <h5>Afinacion: {product.afinacion}</h5>
                                <div>
                                    Hermosa guitarra con un numero de cuerdas de {product.numCuerdas} de tipo {product.tipoCuerda}
                                </div>
                                <div>
                                    El luthier, uno de los más bellos oficios de la historia que conjuga unas manos increíbles para trabajar todo tipo de materiales, sobre todo la madera,
                                    y un amor por la música que le lleva a investigar hasta la perfección del sonido
                                </div>
                                <Form onSubmit={(event)=>{wasBuyed(event, product)}}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Check this switch"
                                        onChange={(event) => { setLuthier(!luthier) }}
                                    />

                                    <Button variant="primary" type="submit">
                                        COMPRAR!!
                                    </Button>
                                </Form>

                            </Col>
                        </Row>
*/
