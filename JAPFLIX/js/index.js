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
                    const container=document.getElementById("lista");
                    // Filtrar los productos según el texto de búsqueda
                    const peliculasFiltradas = arrayPeliculas.filter((pelicula) => {
                        const titulo = pelicula.title.toLowerCase();
                        const descripcion = pelicula.overview.toLowerCase();
                        // const genero=pelicula.genres
                        // genero.forEach(element => {
                        //     element
                        // });
                        return titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);
                    });
                    peliculasFiltradas.forEach(element => {
                        const item = document.createElement("div");
                        item.classList.add("pelicula");
                        const titulo = document.createElement("h5");
                        titulo.textContent = element.title;
                        item.appendChild(titulo);
                        const tagline = document.createElement("p");
                        tagline.textContent = element.tagline;
                        item.appendChild(tagline);
                        container.appendChild(item);
                        // const stars = ScoreToEstrellas(comment.score);
               
                    // Limpiar la lista y mostrar los productos filtrados
                    });
                } else {
                    alert("Campo de búsqueda vacío")
                }

            })
        })
        .catch((error) => console.log(error));

});