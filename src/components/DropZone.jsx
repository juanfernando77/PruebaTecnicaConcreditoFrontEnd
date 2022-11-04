import { useCallback } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

function DropZone({ formValue, setFormValue }) {
  const onDrop = useCallback((acceptedFiles) => {
    const objUrl = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: generarId(),
      })
    );
    setFormValue((state) => ({
      ...state,
      documento: (formValue.documento = [...state.documento, ...objUrl]),
    }));
  }, []);
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };
  const handleDelete = (id) => {
    const newDocument = formValue.documento.filter((file) => file.id !== id);
    setFormValue((state) => ({
      ...state,
      documento: (formValue.documento = newDocument),
    }));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const selected_images = formValue.documento?.map((file, index) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "80%",
        margin: "8px auto",
      }}
      key={index}
    >
      <p style={{ margin: "0", width: "50%" }}>{file.name}</p>
      <DeleteIcon
        style={{ color: "#F03E3B", cursor: "pointer" }}
        onClick={() => handleDelete(file.id)}
      >
        Eliminar
      </DeleteIcon>
    </div>
  ));

  return (
    <div style={{ marginTop: "1rem" }}>
      <div
        style={{
          border: "1.5px dashed green",
          width: "70%",
          height: "6rem",
          textAlign: "center",
          margin: "auto",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="upload-file" style={{ margin: "2px 0 0 0" }}>
          Arrastra o da click aquí para carga de imagenes.
        </p>
        <UploadFileIcon
          style={{ color: "#00AC68", height: "60px", width: "100px" }}
        />
      </div>
      <div>{selected_images}</div>
    </div>
  );
}

export default DropZone;
