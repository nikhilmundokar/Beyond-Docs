import "./style.scss";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

import React from "react";

function ContactInfo() {
  return (
    <div className="contact-info-box">
      <h4>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus,
        officiis magnam mollitia earum fugiat a ullam atque corporis doloremque,
        animi, similique quae dicta ab numquam voluptates itaque temporibus modi
        libero.
      </h4>
      <div className="contact-option">
        <FaPhoneAlt />
        <span className="text">+91 88888888</span>
      </div>
      <div className="contact-option">
        <MdEmail />
        <span className="text">contactus@beyondocs.com</span>
      </div>
    </div>
  );
}

export default ContactInfo;
