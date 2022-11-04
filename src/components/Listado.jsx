import axios from "axios";
import { useEffect, useState } from "react";
import ListadoItem from "./ListadoItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpinnerMain from "./SpinnerMain";
import { baseUrl } from "../constantes/Constantes";

const style = {
  position: "absolute",
  top: "10%",
  left: "10%",
  right: "10%",
  bottom: "10%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

function Listado() {
  const [detalleProspecto, setDetalleProspecto] = useState({ documentos: [] });
  const [listado, setListado] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [evaluacion, setEvaluacion] = useState({
    estatus: "",
    comentarios: "",
  });
  useEffect(() => {
    fetchListado();
  }, []);

  useEffect(() => {
    validarBotonRechazo();
  }, [evaluacion]);

  const fetchListado = () => {
    axios
      .get(baseUrl + "prospectos")
      .then((response) => {
        setListado(response.data);
      })
      .catch((error) => {});
  };
  const comentarioRechazo = (e) => {
    setEvaluacion({
      comentarios: (evaluacion.comentarios = e.target.value),
    });
  };
  const validarBotonRechazo = () => {
    if (!evaluacion.comentarios || evaluacion.comentarios.length < 15) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  };
  const onDetalleCargado = (detalle) => {
    setDetalleProspecto(detalle);
    abrirModal();
  };

  const abrirModal = () => {
    setOpenModal(true);
    limpiarComentario();
  };

  const cerrarModal = () => {
    setOpenModal(false);
  };

  const abrirUrl = (fileUrl) => {
    window.open(baseUrl + fileUrl);
  };
  const getListado = () =>
    listado.map((item) => (
      <ListadoItem onDetalleCargado={onDetalleCargado} item={item} />
    ));

  const aprobarProspecto = () => {
    setCargando(true);
    setEvaluacion({
      comentarios: (evaluacion.comentarios = ""),
      estatus: (evaluacion.estatus = "AUTORIZADO"),
    });
    axios
      .post(baseUrl + "prospectos/" + detalleProspecto.id, evaluacion)
      .then(() => {
        setCargando(false);
        fetchListado();
        cerrarModal();
      })
      .catch((error) => {
        setCargando(false);
        cerrarModal();
      });
  };
  const rechazarProspecto = () => {
    setCargando(true);
    setEvaluacion({
      estatus: (evaluacion.estatus = "RECHAZADO"),
    });

    axios
      .post(baseUrl + "prospectos/" + detalleProspecto.id, evaluacion)
      .then((response) => {
        setCargando(false);
        cerrarModal();
        fetchListado();
        limpiarComentario();
      })
      .catch((error) => {
        setCargando(false);
        cerrarModal();
        limpiarComentario();
      });
  };
  const limpiarComentario = () => {
    setEvaluacion({
      comentarios: (evaluacion.comentarios = ""),
      estatus: (evaluacion.estatus = ""),
    });
  };

  return (
    <div>
      <table
        style={{
          width: "95%",
          margin: "auto",
          borderCollapse: "collapse",
          marginTop: "2rem",
        }}
      >
        <thead style={{ background: "#06a661" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <th className="campo-head">Nombre</th>
            <th className="campo-head">Apellido paterno</th>
            <th className="campo-head">Apellido materno</th>
            <th className="campo-head">Colonia</th>
            <th className="campo-head">Calle</th>
            <th className="campo-head">Número</th>
            <th className="campo-head">Código postal</th>
            <th className="campo-head">Rfc</th>
            <th className="campo-head">Teléfono</th>
            <th className="campo-head">Estatus</th>
          </tr>
        </thead>
        <tbody>{getListado()}</tbody>
        {listado.length == 0 && (
          <div className="listado-vacio">Listado vacío.</div>
        )}
      </table>
      <Modal open={openModal}>
        <Box sx={style}>
          {cargando && <SpinnerMain />}
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <div>Detalle prospecto</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ flexBasis: "50%" }}>
                <div className="contenedor-camposM">
                  <p className="description-modal">Nombre:</p>
                  <p>{detalleProspecto.nombre}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">apellido paterno:</p>
                  <p>{detalleProspecto.apellidoPaterno}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">apellido materno:</p>
                  <p>{detalleProspecto.apellidoMaterno}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">colonia:</p>
                  <p>{detalleProspecto.colonia}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">calle:</p>
                  <p>{detalleProspecto.calle}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">número:</p>
                  <p>{detalleProspecto.numero}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">código postal:</p>
                  <p>{detalleProspecto.codigoPostal}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">rfc:</p>
                  <p>{detalleProspecto.rfc}</p>
                </div>
                <div className="contenedor-camposM">
                  <p className="description-modal">teléfono:</p>
                  <p>{detalleProspecto.telefono}</p>
                </div>
              </div>
              <div style={{ flexBasis: "50%" }}>
                {detalleProspecto.documentos.map((document) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <p style={{ margin: "auto 0" }}>{document.nombre}</p>
                    <Button
                      variant="contained"
                      onClick={() => abrirUrl(document.fileUrl)}
                    >
                      Abrir
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Typography>
          <Typography>
            <div style={{ textAlign: "center" }}>
              <textarea
                onChange={comentarioRechazo}
                className="comentario-rechazo"
                placeholder="Captura comentario de rechazo."
                style={{ resize: "none", width: "60%", height: "4rem" }}
              />
            </div>
          </Typography>
          <Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                onClick={() => aprobarProspecto()}
                variant="contained"
                color="success"
              >
                Aprobar
              </Button>
              <Button
                onClick={() => rechazarProspecto()}
                disabled={btnEnabled}
                variant="contained"
                color="error"
              >
                Rechazar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cerrarModal()}
              >
                Cancelar
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Listado;
