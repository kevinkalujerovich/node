const socket = io();

socket.on("envioProductos", (data) => {
  if (data.length > 0) {
    let html = data
      .map(
        (e, i) => `
  <div class="row pt-2 pb-2" >
    <div class="col-sm pt-2" style=" border-top: 1px solid white">
     ${e.name}
    </div>
    <div class="col-sm pt-2" style=" border-top: 1px solid white" >
    ${e.price}
    </div>
    <div class="col-sm pt-2" style=" border-top: 1px solid white" >
        <img width="50px" height="50px" src=  ${e.thumbnail}>
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

function enviarMensaje() {
  let envio = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("envioProducto", envio);
}
