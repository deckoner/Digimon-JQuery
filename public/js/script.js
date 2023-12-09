const digimonListEndpoint = "https://digi-api.com/api/v1/digimon";
const digimonList = $("#digimonList");
const digimonDiccionario = [];

async function fetchPage(page) {
    const url = `${digimonListEndpoint}?page=${page}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (Array.isArray(data.content)) {
        data.content.forEach((digimon) => {
            digimonDiccionario[digimon.name] = digimon.id;
        });
  
        if (page < data.pageable.totalPages - 1) {
            return fetchPage(page + 1);
        } else {
            console.log("Entro en este else");
            return true;
        }
    } else {
        console.log("Entro en el primer error");
        return false;
    }
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