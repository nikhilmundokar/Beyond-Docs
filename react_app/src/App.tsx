import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import "./App.scss";
import BlockChain from "./components/blockchain";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <About />
      <BlockChain />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
