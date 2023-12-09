const digimonListEndpoint = "https://digi-api.com/api/v1/digimon";
const digimonList = $("#digimonList");
const digimonDiccionario = [];

async function fetchPage(page) {
    const url = `${digimonListEndpoint}?page=${page}`;

    fetch(url, { priority: "high" })
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data.content)) {
                data.content.forEach((digimon) => {
                    digimonDiccionario[digimon.name] = digimon.id;
                });

                // Verificar si hay más páginas y hacer la llamada recursiva
                if (page < data.pageable.totalPages - 1) {
                    fetchPage(page + 1);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })
        .catch((error) => {
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
