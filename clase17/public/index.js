const socket = io();
socket.on("envioProductos", (data) => {
  if (data.length > 0) {
    let html = data
      .map(
        (e, i) => `
        <div class="row pt-2 pb-3 text-center">
        <div class="col-sm pt-2" style=" border-top: 1px solid white">
         ${e.id}
        </div>
          <div class="col-sm pt-2" style=" border-top: 1px solid white">
          ${e.title}
        </div>
          <div class="col-sm pt-2" style=" border-top: 1px solid white">
          ${e.description}
        </div>
        <div class="col-sm pt-2" style=" border-top: 1px solid white" >
        ${e.codigo}
        </div>
          <div class="col-sm pt-2" style=" border-top: 1px solid white">
          ${e.price}
        </div>  <div class="col-sm pt-2" style=" border-top: 1px solid white">
        ${e.stock}
        </div>
          <div class="col-sm pt-2" style=" border-top: 1px solid white">
          ${e.timestamp}
        </div>
        <div class="col-sm pt-2" style=" border-top: 1px solid white" >
            <img width="50px" height="50px" src= ${e.thumbnail}>
        </div>
      </div>
`
      )
      .join(" ");
    document.getElementById("productos").innerHTML = html;
  } else {
    document.getElementById("productos").innerHTML = "No hay productos";
  }
});

socket.on("mensajes", (data) => {
  render(data);
});

let render = (data) => {
  let html = data
    .map(
      (e, i) => `
      <div>
          <strong class="text-primary font-weight-bold">${e.usuario}</strong>
          <span class="text-danger">[${e.fecha},${e.hora}]</span>
          <em class="text-success">${e.mensaje}</em>
      </div>
  `
    )
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
};

function enviarMensaje(e) {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let envio = {
    usuario: document.getElementById("usuario").value,
    mensaje: document.getElementById("texto").value,
    fecha: dd.toString() + "/" + mm.toString() + "/" + yyyy.toString(),
    hora:
      today.getHours().toString() +
      ":" +
      today.getMinutes().toString() +
      ":" +
      today.getSeconds().toString(),
  };
  socket.emit("nuevo-mensaje", envio);
  return false;
}
