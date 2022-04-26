import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import fireApp from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginRegisterView from "./pageviews/LoginRegisterView";
import Products from "./pageviews/Products";

import "./scss/App.scss";
import "./scss/NavBar.scss";
import "./scss/Footer.scss"
import Order from "./pageviews/Order";
import Footer from "./components/Footer";

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
          <Route path="/:uid/order/:id" element={<Order />} />
          <Route path="*" element={<h1>404 NotFoundPage</h1>} />
        </Routes>
        <Footer></Footer>
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
