
import { creerCards, searchNom,filtreType } from "./ui.js"
import { } from "./storage.js"
import { loadData, getData ,searchNameApi } from "./services/api.js"


const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
    initHomePages()
}

function initHomePages() {
    console.log("Home Page");
    ///  paginagtion creation of cards Monsters
    

    // document.querySelector('#btns-load').addEventListener("click", (event) => {
    //     const btnCLick = event.target.closest(".loadMore")
    //     let offset = btnCLick.textContent
    //     console.log()
    //     const obj = {
    //         "1": 0,
    //         "2": 20,
    //         "3": 40,
    //         "4": 60,
    //         "5": 80,
    //         "6": 100,
    //     }

    //     getData(obj[offset])
    //     const arr = loadData()
    //     console.log(arr)
    //     creerCards(arr)

    //     //// call search & filter function
    //     searchNom()
    //     filtreType()
    // })
    // getData(0)
    // const arr = loadData()
    // creerCards(arr)
    // searchNom()
    // filtreType()
    

}