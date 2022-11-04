import React from "react";
import ReactDOM from "react-dom/client";
import RegistroProspecto from "./components/RegistroProspecto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ListadoProspectos from "./components/ListadoProspectos";
import Index from "./components/Index";
import "./index.css";
import "./normalize.css";
import {
  LISTADO_PROSPECTOS,
  ALTA_PROSPECTO,
  INICIO,
} from "./constantes/ConstantesRutas";

const router = createBrowserRouter([
  {
    path: INICIO,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: ALTA_PROSPECTO,
        element: <RegistroProspecto />,
      },
      {
        path: LISTADO_PROSPECTOS,
        element: <ListadoProspectos />,
      },
      {
        path: "*",
        element: INICIO,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <RouterProvider router={router} />
  </React.Fragment>
);
