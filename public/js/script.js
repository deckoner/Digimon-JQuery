const digimonListEndpoint = "https://digi-api.com/api/v1/digimon";
const digimonList = $("#digimonList");
const digimonDiccionario = [];

async function fetchPage(page) {
    const url = `${digimonListEndpoint}?page=${page}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data.content)) {
                data.content.forEach((digimon) => {
                    digimonDiccionario[digimon.name] = digimon.id;
                    console.log(digimon.name);
                });

                // Verificar si hay más páginas y hacer la llamada recursiva
                if (page < data.pageable.totalPages - 1) {
                    fetchPage(page + 1);
                } else {
                    console.log("Entro en este else");
                    return true;
                }
            } else {
                console.log("Entro en el primer error");
                return false;
            }
        }) // Aquí faltaba una llave de cierre
        .catch((error) => {
            console.log("Todo ha fallado");
            return false;
        });
}

function crearLista(exito) {
    const loaderLista = $(".loader");

    if (exito) {
        let elemento;

        for (let name in digimonDiccionario) {
            elemento = `<li>${name} - ID: ${digimonDiccionario[name]}</li>`;
            digimonList.append(elemento);
        }
    } else {
        elemento = "<p class='error'>Error al cargar la lista</p>";
        digimonList.append(elemento);
    }

    loaderLista.removeClass("loader");
    digimonList.show();
}

async function inicio() {
    let exito = await fetchPage(0);
    crearLista(exito);
}

// Obtener la información de la primera página (página 0)
inicio();