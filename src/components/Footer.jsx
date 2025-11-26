import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

function Footer() {
  return (
    <footer style={{
      backgroundColor: "rgb(34, 33, 33)",
      padding: "20px 10px",
      textAlign: "center",
      marginTop: "30px",
      color: "white"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
      }}>
        <p style={{ margin: 0 }}>&copy; 2025 - GM / ACDelco</p>

        <div style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          fontSize: "1.4rem"
        }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <FaInstagram />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <SiX />
          </a>
          <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

