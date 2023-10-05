document.addEventListener("DOMContentLoaded", () => {
    const link = "https://japceibal.github.io/japflix_api/movies-data.json"
    let arrayPeliculas = [];
    fetch(link)
        .then(response => response.json())
        .then((data) => {
            arrayPeliculas = data;

            const btn = document.getElementById("btnBuscar");
            const input = document.getElementById("inputBuscar");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (input.value) {
                    // campo buscador
                    const textoBusqueda = input.value.toLowerCase();

                    // Filtrar los productos según el texto de búsqueda
                    const peliculasFiltradas = arrayPeliculas.filter((pelicula) => {
                        const titulo = pelicula.title.toLowerCase();
                        const descripcion = pelicula.overview.toLowerCase();
                        const genero=pelicula.genres
                        genero.forEach(element => {
                            element
                        });
                        return titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda) || genero.includes(textoBusqueda);
                    });
                    console.log(peliculasFiltradas);
                    // Limpiar la lista y mostrar los productos filtrados

                } else {
                    alert("Campo de búsqueda vacío")
                }

            })
        })
        .catch((error) => console.log(error));

});