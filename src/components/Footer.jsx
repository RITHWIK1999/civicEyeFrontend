import { faCircleDot, faEnvelopeOpenText, faLocationDot, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black text-white">
    <div className="flex justify-around pt-10 pb-5">
      <div>
        <h1 className="border-l-4 ps-4 border-blue-500 text-2xl font-bold font-[Poppins]">Phone Numbers</h1>
        <div className="py-5 text-center text-lg pt-10">
          <h1>Military</h1>
          <h3>(123) 456 9871</h3>
          <h3>(123) 456 7892</h3>
        </div>
        <div className="py-5 text-center text-lg">
          <h1>State Police</h1>
          <h3>(123) 456 9873</h3>
          <h3>(123) 456 7894</h3>
        </div>
        <div className="py-5 text-center text-lg">
          <h1>Fire Department</h1>
          <h3>(123) 456 9875</h3>
          <h3>(123) 456 7896</h3>
        </div>
      </div>
      <div>
        <h1 className="border-l-4 ps-4 border-blue-500 text-2xl font-bold font-[Poppins]">Contact Info</h1>
        <div className="py-5 pt-10">
          <h1 className="text-white text-lg"><FontAwesomeIcon className="pe-4" icon={faLocationDot} />  Softronics</h1>
        </div>
        <div className="py-5">
          <h1 className="text-white text-lg"><FontAwesomeIcon className="pe-4" icon={faMobileScreenButton} />  (+91) 789 456 123 0</h1>
        </div>
        <div className="py-5">
          <h1 className="text-white text-lg"><FontAwesomeIcon className="pe-4" icon={faEnvelopeOpenText} />Softoniics@gmail.com</h1>
        </div>
      </div>
      <div>
        <h1 className="border-l-4 ps-4 border-blue-500 text-2xl font-bold font-[Poppins] ">Quick Links</h1>
        <div className="py-2 text-lg pt-10 text-start">
          <Link to="/about"><FontAwesomeIcon className="pe-4" icon={faCircleDot} />About</Link>
        </div>
        <div className="py-2 text-lg text-start">
          <Link><FontAwesomeIcon className="pe-4"  icon={faCircleDot} />Complaints</Link>
        </div>
        <div className="py-2 text-lg text-start">
          <Link to="/register"><FontAwesomeIcon className="pe-4"  icon={faCircleDot} />Register</Link>
        </div>
        <div className="py-2 text-lg text-start">
          <Link to="/"><FontAwesomeIcon className="pe-4"  icon={faCircleDot} />Login</Link>
        </div>
      </div>
    </div>
    <div className="text-center font-[Poppins] pb-10">
        <h1>© CivicEye 2025 | Empowering Citizens, Improving Communities.</h1>
      </div>
    </div>
  );
}

export default Footer;
