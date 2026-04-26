import React, { useEffect, useState } from "react";
import api from "../api/axios";

import VoiceInput from "../components/VoiceInput";
import CartView from "../components/CartView";

const Home = () => {

  const [status, setStatus] = useState("");
  const [cart, setCart] = useState(null);

  useEffect(() => {

    const checkHealth = async () => {

      try {

        const res = await api.get("/health");
        setStatus(res.data.message);

      } catch {

        setStatus("Backend not reachable");

      }

    };

    checkHealth();

  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (

    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Voice Billing System</h1>

      <p>Backend Status: {status}</p>

      <VoiceInput updateCart={updateCart} />

      <CartView cart={cart} />

    </div>

  );

};

export default Home;