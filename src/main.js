
import { creerCards } from "./ui.js"
import { } from "./storage.js"
import { loadData, getData } from "./services/api.js"


const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
    initHomePages()
}

function initHomePages() {
    console.log("Home Page");
    ///  paginagtion creation of cards Monsters
    getData(0)
    const arr = loadData()
    creerCards(arr)

    document.querySelector('#btns-load').addEventListener("click", (event) => {
        const btnCLick = event.target.closest(".loadMore")
        let offset = btnCLick.textContent
        console.log()
        const obj = {
            "1": 0,
            "2": 20,
            "3": 40,
            "4": 60,
            "5": 80,
            "6": 100,
        }

        getData(obj[offset])
        const arr = loadData()
        console.log(arr)
        creerCards(arr)
    })

}