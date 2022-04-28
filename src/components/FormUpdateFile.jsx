
import React, { useState } from 'react'
import * as filestack from 'filestack-js';
import {
    Button
} from "react-bootstrap";
import { connect } from "react-redux";
import {
    updateOrderByIdWithURL as actionUpdateOrderByIdWithURL
} from "../actions/guitarActions.js";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import fireApp from "../firebase/firebase";
import "../scss/Order.scss";

const apikey = "Aj7zhAGroTiOWBnlECxHyz";
const client = filestack.init(apikey);

const FormUpdateFile = ({ updateOrderByIdWithURL }) => {

    const [formUpload, setformUpload] = useState(false)
    const params = useParams();
    const auth = getAuth(fireApp);
    const options = {
        maxFiles: 1,
        uploadInBackground: false,
        onOpen: () => console.log('opened!'),
        onUploadDone: (res) => {
            console.log(auth.currentUser.uid)
            updateOrderByIdWithURL(params.id, auth.currentUser.uid, res.filesUploaded[0].url);

        },
        onClose: () => setformUpload(false)
    };

    if (formUpload) {
        client.picker(options).open()
        client.picker().close()
    }

    return (
        <div style={{ marginTop: "4%" }}>
            <Button onClick={() => { setformUpload(true) }}
                style={{
                    marginBottom: "20px"
                }}
                className="buttonURL">
                Buscar comprobante en computador
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.guitar.loading,
    error: state.guitar.error,
    order: state.guitar.order,
});

const mapDispatchToProps = {
    updateOrderByIdWithURL: actionUpdateOrderByIdWithURL
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateFile);

