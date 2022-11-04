import axios from "axios";
import { useEffect, useState } from "react";
import SpinnerMain from "./SpinnerMain";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { INICIO, LISTADO_PROSPECTOS } from "../constantes/ConstantesRutas";
import DropZone from "./DropZone";
import { soloNumeros } from "../Utils/RegxValidaciones";
import { baseUrl } from "../constantes/Constantes";

function Formulario() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    calle: "",
    colonia: "",
    numero: "",
    codigoPostal: "",
    rfc: "",
    telefono: "",
    documento: [],
  });
  useEffect(() => {
    validaciones();
  }, [formValue]);

  const handleOnChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const limpiarForm = () => {
    setFormValue({
      nombre: (formValue.nombre = ""),
      apellidoPaterno: "",
      apellidoMaterno: "",
      calle: "",
      colonia: "",
      numero: "",
      codigoPostal: "",
      rfc: "",
      telefono: "",
      documento: [],
    });
    form.reset();
  };

  const guardar = () => {
    setCargando(true);
    const { documento, ...formProspecto } = formValue;
    const formdata = new FormData();
    Object.entries(formProspecto).forEach(([key, value]) => {
      formdata.append(key, value.trim().toLowerCase());
    });
    documento?.forEach((file) => {
      formdata.append(file.name.trim().toLowerCase(), file);
    });
    axios
      .post(baseUrl + "prospectos", formdata)
      .then((response) => {
        limpiarForm();
        setCargando(false);
        navigate(LISTADO_PROSPECTOS);
      })
      .catch((error) => {
        limpiarForm();
        setCargando(false);
        setEnableBtn(true);
      });
  };
  const validaciones = () => {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      calle,
      numero,
      codigoPostal,
      colonia,
      rfc,
      telefono,
      documento,
    } = formValue;
    if (
      nombre.length == 0 ||
      apellidoPaterno.length == 0 ||
      apellidoMaterno.length == 0 ||
      calle.length == 0 ||
      numero.length == 0 ||
      codigoPostal.length == 0 ||
      colonia.length == 0 ||
      rfc.length == 0 ||
      telefono.length == 0 ||
      documento.length == 0
    ) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  };
  const cancelarForm = () => {
    navigate(INICIO);
    limpiarForm();
  };
  return (
    <div>
      {cargando && <SpinnerMain />}
      <form
        id="form"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div>
          <div className="campo">
            <input
              type="text"
              className="campo-input"
              name="nombre"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              maxLength="25"
            />
            <label className="label-description">nombre</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="apellidoPaterno"
              onChange={handleOnChange}
              required="required"
              maxLength="25"
              autoComplete="off"
            />
            <label className="label-description">apellido paterno</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="apellidoMaterno"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              maxLength="25"
            />
            <label className="label-description">apellido materno</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="calle"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              maxLength="30"
            />
            <label className="label-description">calle</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="colonia"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              maxLength="20"
            />
            <label className="label-description">colonia</label>
          </div>
        </div>
        <div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="numero"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              onKeyPress={soloNumeros}
              maxLength="7"
            />
            <label className="label-description">número</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="codigoPostal"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              onKeyPress={soloNumeros}
              maxLength="5"
            />
            <label className="label-description">código postal</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="rfc"
              onChange={handleOnChange}
              autoComplete="off"
              required="required"
              maxLength="13"
            />
            <label className="label-description">rfc</label>
          </div>
          <div className="campo">
            <input
              className="campo-input"
              type="text"
              name="telefono"
              onChange={handleOnChange}
              autoComplete="new password"
              required="required"
              onKeyPress={soloNumeros}
              maxLength="10"
            />
            <label className="label-description">teléfono</label>
          </div>
        </div>
        <div>
          <DropZone
            validaciones={validaciones}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        </div>
      </form>
      <div className="acciones">
        <Button
          variant="contained"
          disabled={enableBtn}
          color="success"
          onClick={() => guardar()}
        >
          Guardar
        </Button>
        <Button
          onClick={() => cancelarForm()}
          variant="contained"
          color="error"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default Formulario;
