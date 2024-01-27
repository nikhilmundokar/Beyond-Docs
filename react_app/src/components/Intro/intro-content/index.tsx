import "./style.scss";
import phone from "../../../images/smart_phone.png";
import CallToAction from "../../common/calltoaction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IntroContent() {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="intro-content">
      <div className="layout">
        <div className="left-col">
          <h1 className={`title ${scrolled ? "animate-border" : ""}`}>
            BEYOND DOCS
          </h1>

          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum,
            provident totam libero reprehenderit omnis possimus recusandae
            maxime earum sint nam consequatur soluta? Laborum, doloremque
            deserunt. Velit sapiente ipsa inventore.
          </p>
          <div className="ctas">
            <Link to="/welcome" className="cta-link">
              <CallToAction text="Signup" type="fill" />
            </Link>
            <Link to="/welcome" className="cta-link">
              <CallToAction text="Login" type="border" />
            </Link>
          </div>
        </div>

        <div className="right-col">
          <img className="banner" src={phone} alt="phone" />
        </div>
      </div>
    </div>
  );
}

export default IntroContent;
