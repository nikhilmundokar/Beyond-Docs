import React from "react";
import "./style.scss";
import Section from "../common/section";
import blockchain from "../../images/blockchain.png";
import CallToAction from "../common/CallToAction";
import { FaInfo } from "react-icons/fa";

function BlockChain() {
  return (
    <Section background="black-dark" id="skills">
      <div className="skills-content-wrapper">
        <div className="left-col">
          <h2>Blockchain</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            aliquam laudantium, repudiandae maxime vel totam quos perspiciatis
            quam laborum ipsam officia dolor et quod quo, doloribus at. Esse,
            culpa hic!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            itaque omnis deleniti quidem repudiandae nihil voluptate esse quis
            ipsam ut, qui temporibus aliquid. Deleniti accusantium, nihil
            similique vel atque nulla.
          </p>
          <CallToAction text="Learn More" icon={<FaInfo />} />
        </div>
        <div className="right-col">
          <img src={blockchain} alt="Blockchain"></img>
        </div>
      </div>
    </Section>
  );
}

export default BlockChain;
