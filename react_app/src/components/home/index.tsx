import React from "react";

import About from "../about";
import BlockChain from "../about/info/blockchain";

import Intro from "../Intro";
import ContactUs from "../contactus";

function Home() {
  return (
    <>
      <Intro />
      <About />
      <BlockChain />
      <ContactUs />
    </>
  );
}

export default Home;
