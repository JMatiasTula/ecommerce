import React from 'react';
import styled from "styled-components";

const BotonCompra = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c70039;
  }
`;

function Producto({text}) {
  return <BotonCompra>{text}</BotonCompra>;
}

export default Producto