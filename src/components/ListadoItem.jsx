import axios from "axios";
import { baseUrl } from "../constantes/Constantes";

function ListadoItem({ item, onDetalleCargado }) {
  const detalleProspecto = (id) => {
    axios
      .get(baseUrl + "prospectos/" + id)
      .then((response) => {
        onDetalleCargado(response.data);
      })
      .catch((error) => {});
  };
  return (
    <tr
      className="row-body"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid #BDBDBD ",
        borderWidth: "1px 0",
      }}
      onClick={() => detalleProspecto(item.id)}
    >
      <td className="description-row" style={{ width: "100%" }}>
        {item.nombre}
      </td>
      <td className="description-row" style={{ width: "100%" }}>
        {item.apellidoPaterno}
      </td>
      <td className="description-row">{item.apellidoMaterno}</td>
      <td className="description-row">{item.colonia}</td>
      <td className="description-row">{item.calle}</td>
      <td className="description-row">{item.numero}</td>
      <td className="description-row">{item.codigoPostal}</td>
      <td className="description-row">{item.rfc}</td>
      <td className="description-row">{item.telefono}</td>
      <td className="description-row">{item.estatus}</td>
    </tr>
  );
}

export default ListadoItem;
