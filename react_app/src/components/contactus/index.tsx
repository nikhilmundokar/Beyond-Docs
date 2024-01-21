import React from "react";
import "./style.scss";
import Section from "../common/section";
import ContactInfo from "./contact-info";
import Form from "./form";

function ContactUs() {
  return (
    <Section
      id="contactus"
      title="Any Questions? Feel Free To Contact Us"
      background="black-light"
    >
      <div className="contact-info-wrapper">
        <ContactInfo />
        <Form />
      </div>
    </Section>
  );
}

export default ContactUs;
