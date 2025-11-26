import React from 'react';
import Footer from './Footer';

function About() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <div className="container my-5 flex-grow-1">
        <div className="bg-dark text-white p-5 rounded shadow">
          <h2 className="text-center mb-4">Sobre Nosotros</h2>

          <p><strong>General Motors (GM)</strong> es una compañía multinacional estadounidense que fabrica automóviles, camiones y motores. Fue fundada en 1908 y tiene su sede en Detroit, Michigan. GM es líder en la industria automotriz a nivel mundial y opera en diversos países, incluyendo Argentina.</p>

          <p><strong>Origen y Evolución:</strong> GM se originó como una empresa holding para Buick en 1908, fundada por William C. Durant. La empresa ha experimentado una evolución significativa, incluyendo una reestructuración en 2009.</p>

          <p><strong>Actividad Principal:</strong> GM se dedica a la fabricación de vehículos, incluyendo automóviles, camiones y vehículos eléctricos.</p>

          <p><strong>Presencia en Argentina:</strong> General Motors de Argentina es una subsidiaria de GM y produce vehículos en el país. La planta de Alvear, Santa Fe, es un importante centro de producción, especialmente para la Chevrolet Tracker, que también se produce en Brasil.</p>

          <p><strong>Impacto en la Industria Automotriz Argentina:</strong> GM ha experimentado desafíos en Argentina debido a la baja demanda y las dificultades de las exportaciones a Brasil, lo que ha llevado a la paralización de la producción en la planta de Alvear.</p>

          <p><strong>Futuro y Estrategia:</strong> GM está enfocada en la transición hacia vehículos eléctricos y ha anunciado su intención de dejar de producir vehículos con motores de combustión interna en 2035, como parte de su plan para lograr la neutralidad de carbono en 2040.</p>

          <p><strong>Subsidiarias y Productos:</strong> GM tiene diversas subsidiarias y marcas, incluyendo Chevrolet, GMC, Cadillac y Buick. También ofrece servicios financieros (GM Financial) y sistemas de seguridad (OnStar), según Wikipedia.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
