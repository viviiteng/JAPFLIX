document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    let movieData = null; // almacén de los datos de películas
  
    // carga de datos de películas desde el JSON
    function cargarDatos() {
      fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then((response) => response.json())
        .then((data) => {
          movieData = data; // almacén de los datos cargados
        })
        .catch((error) => {
          console.error("Error al cargar los datos:", error);
        });
    }
  
    // función para mostrar películas según búsqueda
    function mostrarPeliculas() {
      const searchTerm = inputBuscar.value.toLowerCase();
      lista.innerHTML = "";
  
      movieData.forEach((movie, index) => {
        const { title, tagline, vote_average, genres, overview } = movie;
        if (
          title.toLowerCase().includes(searchTerm) ||
          tagline.toLowerCase().includes(searchTerm) ||
          genres.join(" ").toLowerCase().includes(searchTerm) ||
          overview.toLowerCase().includes(searchTerm)
        ) {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item");
  
          const titleElement = document.createElement("h5");
          titleElement.textContent = title;
  
          const taglineElement = document.createElement("p");
          taglineElement.textContent = tagline;
  
          const ratingElement = document.createElement("p");
          ratingElement.textContent = `Rating: ${vote_average}`;
  
          // Asignar el índice como un atributo data-id
          listItem.setAttribute("data-id", index);
  
          listItem.appendChild(titleElement);
          listItem.appendChild(taglineElement);
          listItem.appendChild(ratingElement);
  
          lista.appendChild(listItem);
        }
      });
    }
  
    // Función para mostrar los detalles de la película en el offcanvas
function mostrarDetallesPelicula(pelicula) {
  const movieDetailsContainer = document.getElementById("movieDetails");
  movieDetailsContainer.innerHTML = "";

  // Crear elementos para mostrar los detalles de la película
  const titleElement = document.createElement("h5");
  titleElement.textContent = pelicula.title;

  const overviewElement = document.createElement("p");
  overviewElement.textContent = `${pelicula.overview}`;

  const genreElement = document.createElement("p");
  genreElement.textContent = `${pelicula.genres.map((genre) => genre.name).join(" - ")}`;

  const hrElement = document.createElement("hr");

  // Crear el botón con el desplegable
  const detailsDropdown = document.createElement("div");
  detailsDropdown.classList.add("dropdown", "mt-2");

  // Contenido del desplegable
  detailsDropdown.innerHTML = `
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
    Detalles
  </button>
  <ul class="dropdown-menu dropdown-menu-down" aria-labelledby="dropdownMenuButton">
    <li><strong>Año de lanzamiento:</strong> ${pelicula.release_date.split("-")[0]}</li>
    <li><strong>Duración:</strong> ${pelicula.runtime} minutos</li>
    <li><strong>Presupuesto:</strong> $${pelicula.budget.toLocaleString()}</li>
    <li><strong>Ganancias:</strong> $${pelicula.revenue.toLocaleString()}</li>
  </ul>
`;

  // Agregar elementos al contenedor de detalles
  movieDetailsContainer.appendChild(titleElement);
  movieDetailsContainer.appendChild(overviewElement);
  movieDetailsContainer.appendChild(hrElement);
  movieDetailsContainer.appendChild(genreElement);
  movieDetailsContainer.appendChild(detailsDropdown);

  // Mostrar el offcanvas
  const offcanvasTop = new bootstrap.Offcanvas(document.getElementById("offcanvasTop"));
  offcanvasTop.show();
}

  
    // clic en la lista de películas
    lista.addEventListener("click", function (event) {
      const clickedItem = event.target.closest("li");
      if (clickedItem) {
        // Obtener el índice de la película a partir del atributo data-id
        const index = clickedItem.getAttribute("data-id");
  
        // mostrar  detalles de película en el offcanvas
        mostrarDetallesPelicula(movieData[index]);
      }
    });
  
    // botón de búsqueda al clickear
    btnBuscar.addEventListener("click", function () {
      const searchTerm = inputBuscar.value.trim();
      if (searchTerm !== "") {
        if (movieData === null) {
          cargarDatos();
        } else {
          mostrarPeliculas(); // mostrar pelis con datos cargados
        }
      }
    });
  
    // carga de datos al cargar la página
    cargarDatos();
  });
  