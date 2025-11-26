import React from 'react';
import { useEffect } from "react";

useEffect(() => {
    console.log("primera ejecucion")
    return () => {
      // Limpieza del efecto             //(opcional)
    };
  }, []);