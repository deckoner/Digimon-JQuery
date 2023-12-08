const digimonListEndpoint = "https://digi-api.com/api/v1/digimon";
const digimonList = $("#digimonList");

function fetchPage(page) {
    const loaderLista = $(".loader");
    const url = `${digimonListEndpoint}?page=${page}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data.content)) {
                data.content.forEach((digimon) => {
                    const listItem = `<li>${digimon.name} - ID: ${digimon.id}</li>`;
                    digimonList.append(listItem);
                });

                // Verificar si hay más páginas y hacer la llamada recursiva
                if (page < data.pageable.totalPages - 1) {
                    fetchPage(page + 1);
                } else {
                    loaderLista.removeClass("loader");
                    digimonList.show();
                }
            } else {
                console.error("Data format is not as expected:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching Digimon list:", error);
        });
}

// Obtener la información de la primera página (página 0)
fetchPage(0);
