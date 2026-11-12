
import { creerCards, searchNom,filtreType, showtri ,addToEquipe, removeFromTeam ,buttonsUpdate,teamdisplay} from "./ui.js"
import { } from "./storage.js"
import { loadData, getData ,searchNameApi,filterTypeApi } from "./services/api.js"

let arr1 = [] 
arr1= await getData(0)


const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
    initHomePages()
}

function initHomePages() {
    console.log("Home Page");
    ///  paginagtion creation of cards Monsters
    
    filterTypeApi("water")
    searchNameApi("dark")
    document.querySelector('#btns-load').addEventListener("click", (event) => {
        const btnCLick = event.target.closest(".loadMore")
        let offset = btnCLick.textContent
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
        creerCards(arr)

        //// call search & filter function
        searchNom()
        filtreType()
        showtri(arr)
        teamdisplay()
        buttonsUpdate()

    })
    getData(0)
    const arr = loadData()
    creerCards(arr)
    searchNom()
    filtreType()
    showtri(arr)
    teamdisplay()
    buttonsUpdate()

}