const socket = io.connect("https://localhost:8080");

const mensaje = async () => {
  const response = await fetch("https://localhost:8080/productos/datos");
  const data = await response.json();
  return data;
};
mensaje().then((data) => {
  if (data) {
    const html = `
    <div class="alert alert-success" role="alert">Bienvenido ${data.user.usuario}
    <button type="submit" class="btn btn-danger mt-2"  onclick="logout()">Logout</button></div>`;
    document.getElementById("login").innerHTML = html;
  }
});

/* fetch("https://localhost:8080/productos/datos")
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      const html = `
      <div class="alert alert-success" role="alert">Bienvenido ${data.user.usuario}
      <button type="submit" class="btn btn-success mt-2"  onclick="logout()">Logout</button></div>`;
      document.getElementById("login").innerHTML = html;
    }
  }); */

socket.on("login", (data) => {
  if (data.length > 0) {
  }
});

socket.on("envioProductos", (data) => {
  if (data.length > 0) {
    let html = data
      .map(
        (e, i) => `
        <div class="row pt-2 pb-3 text-center">
        <div class="col-sm-3 pt-2" style=" border-top: 1px solid white">
         ${e._id}
        </div>
          <div class="col-sm-2 pt-2" style=" border-top: 1px solid white">
          ${e.title}
        </div>
          <div class="col-sm-2 pt-2" style=" border-top: 1px solid white">
          ${e.description}
        </div>
        <div class="col-sm-1 pt-2" style=" border-top: 1px solid white" >
        ${e.codigo}
        </div>
          <div class="col-sm-1 pt-2" style=" border-top: 1px solid white">
          ${e.price}
        </div>  <div class="col-sm-1 pt-2" style=" border-top: 1px solid white">
        ${e.stock}
        </div>
        <div class="col-sm-2 pt-2" style=" border-top: 1px solid white" >
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
const mensajeLogout = async () => {
  const response = await fetch(`https://localhost:8080/productos/logout`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
const logout = () => {
  mensaje().then((data) => {
    {
      const user = data.user.usuario;
      const html = `
    <div class="alert alert-danger" role="alert">Adios ${user}`;
      document.getElementById("login").innerHTML = html;
    }
    setTimeout(function () {
      const html = ``;
      document.getElementById("login").innerHTML = html;
    }, 3000);
  });
  mensajeLogout().then((data) => {
    console.log(data);
  });
};
