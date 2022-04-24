import React from "react";
import NavBarFilter from "./components/NavBarFilter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import fireApp from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginRegisterView from "./pageviews/LoginRegisterView";
import Products from "./pageviews/Products";

import "./scss/App.scss";
import Order from "./pageviews/Order";

const auth = getAuth(fireApp);

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="App">
        <Navbar firebaseUser={firebaseUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegisterView />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="*" element={<h1>404 NotFoundPage</h1>} />
        </Routes>
      </div>
    </Router>
  ) : (
    <center>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"></span>
        Loading...
      </button>
    </center>
  );
}

export default App;
