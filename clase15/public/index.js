const cards = (parametro) => {
  if (parametro.length > 0) {
    const html = parametro
      .map(
        (e) => `
        <div class="col-sm-3 mt-1 mb-1">
          <div class="card" style="width: 15rem;">
          <img src=${e.thumbnail} height="200px" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${e.title}</h5>
            <p class="card-title">Description:<br>${e.description}</p>
            <p class="card-title">Stock:<br>${e.stock}</p>
            <p class="card-title">ID:<br>${e.id}</p>
              </div>
            <button type="button" class="btn btn-danger" onclick="verProducto(${e.id})">Ver producto</button>         
              <button type="button" class="btn btn-danger" onclick="actualizarProducto(${e.id})">Actualizar producto</button>         
              <button type="button" class="btn btn-danger" onclick="eliminarProducto(${e.id})">Eliminar producto</button>         
              <button type="button" class="btn btn-danger" onclick="agregarProductoCarrito(${e.id})">Agregar al carrito</button>         
              <div class="card-footer">
          <p class="card-text">$${e.price}</p>
          </div>
        </div>
        </div>
  `
      )
      .join(" ");

    document.getElementById("listaDeProductos").innerHTML = html;
  } else {
    const html = `<h2 class="text-center mt-5">No hay productos en el carrito</h2>`;

    document.getElementById("listaDeProductos").innerHTML = html;
  }
};
const cardsCarrito = (parametro) => {
  if (parametro.length > 0) {
    const html = parametro
      .map(
        (e) => `
          <div class="col-sm-3 mt-1 mb-1">
            <div class="card" style="width: 15rem;">
            <img src=${e.thumbnail} height="200px" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p class="card-title">Description:<br>${e.description}</p>
              <p class="card-title">Stock:<br>${e.stock}</p>
              <p class="card-title">ID:<br>${e.id}</p>
                </div>
                <button type="button" class="btn btn-danger" onclick="verProductoCarrito(${e.id})">Ver producto del carrito</button>         
                <button type="button" class="btn btn-danger" onclick="eliminarProductoCarrito(${e.id})">Eliminar producto del carrito</button>         
                <div class="card-footer">
            <p class="card-text">$${e.price}</p>
            </div>
          </div>
          </div>
    `
      )
      .join(" ");

    document.getElementById("listaDeProductos").innerHTML = html;
  } else {
    const html = `<h2 class="text-center mt-5">No hay productos en el carrito</h2>`;

    document.getElementById("listaDeProductos").innerHTML = html;
  }
};
//api productos
const mostrarProductos = () => {
  fetch("http://localhost:8080/productos/listar")
    .then((response) => response.json())
    .then((data) => {
      cards(data);
    });
};
const verProducto = (parametro) => {
  fetch(`http://localhost:8080/productos/listar/${parametro}`)
    .then((response) => response.json())
    .then((json) => cards([json]));
};
const actualizarProducto = (parametro) => {
  var data = {
    title: "actualizado desde html",
    description: "actualizado desde html",
    codigo: "100",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/old_glasses_people_man_grandfather_avatar_beard-512.png",
    price: "1",
    stock: "1",
    id: parametro,
    timestamp: Date.now(),
  };
  fetch(`http://localhost:8080/productos/actualizar/${parametro}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => cards(json));
};
const eliminarProducto = (parametro) => {
  fetch(`http://localhost:8080/productos/borrar/${parametro}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => cards(json));
};

//api carrito

const mostrarCarrito = () => {
  fetch("http://localhost:8080/carrito/listar")
    .then((response) => response.json())
    .then((data) => {
      cardsCarrito(data);
    });
};
const verProductoCarrito = (parametro) => {
  fetch(`http://localhost:8080/carrito/listar/${parametro}`)
    .then((response) => response.json())
    .then((json) => cardsCarrito([json]));
};
const agregarProductoCarrito = (parametro) => {
  fetch(`http://localhost:8080/carrito/agregar/${parametro}`, {
    method: "POST",
  });
};

const eliminarProductoCarrito = (parametro) => {
  fetch(`http://localhost:8080/carrito/borrar/${parametro}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => cardsCarrito(json));
};
