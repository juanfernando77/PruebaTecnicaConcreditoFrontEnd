export const soloNumeros = (e) => {
  const validacion = /[0-9]+/g;
  if (!validacion.test(e.key)) {
    e.preventDefault();
  }
};
