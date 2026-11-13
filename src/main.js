
import { creerCards, searchNom, filtreType, showtri, buttonsUpdate, createBtn, createPagination } from "./ui.js"
import { } from "./storage.js"
import { loadData, getData, searchNameApi, filterTypeApi } from "./services/api.js"

// let arr1 = []
// arr1 = await getData(0)


const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
    initHomePages()
}

function initHomePages() {
    const filter = document.querySelector("#filters")
    const search = document.querySelector("#search")
   
    

    console.log("Home Page");
    ///  paginagtion creation of cards Monsters
    getData(0)
    const arr = loadData()
    creerCards(arr)
    searchNom()
    filtreType()
    showtri(arr)
    buttonsUpdate()

    ///  paginagtion creation of cards Monsters
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
        buttonsUpdate()
    })
    // filter search in console
    filterTypeApi("water")
    searchNameApi("dark")

    // filter event
    filter.addEventListener("click", async (e) => {
        const btnCLick = e.target.closest(".btn-filter")
        // default Case
        if (!btnCLick) {
            getData(0)
            const arr = loadData()
            creerCards(arr)
            searchNom()
            filtreType()
            showtri(arr)
            buttonsUpdate()
            return
        }
        let arrfiltre = []
        arrfiltre = await filterTypeApi(btnCLick.textContent)
        console.log(arrfiltre)

    })
    // search event
    let searchName = ""
    let start = 0
    let limit = start + 40
    let page = 1

    search.addEventListener("input", async (e) => {
        const name = e.target.value.toLowerCase().trim()
        searchName = name
        console.log(name)
    })

    const btnSearch = document.querySelector("#btn-search")
    btnSearch.addEventListener("click", async (event) => {
        event.stopPropagation()
    
        // default Case
        if (searchName === "") {
            getData(0)
            const arr = loadData()
            creerCards(arr)
            searchNom()
            filtreType()
            showtri(arr)
            buttonsUpdate()
            return
        }
        
        createBtn(1)
        let arrsearch = []
        arrsearch = await searchNameApi(searchName)
        console.log(arrsearch)
        createBtn(1)
        const prevPage=document.querySelector('.prev-btn')
        const nextPage=document.querySelector('.next-btn')
        const numPage=document.querySelector('.Npage-btn')
        createPagination(arrsearch, 0, 40)
        prevPage.addEventListener("click",(e)=>{
            e.stopPropagation()
            // if (!prevPage && prevPage) return
            if (start-40 < 0){
                start=0
                page=1
            }
            else{
                start-=40
                page-=1
            }
            
            createPagination(arrsearch, start, limit)
            numPage.textContent=page
        })
        nextPage.addEventListener("click",(e)=>{
            e.stopPropagation()
            if (!nextPage && prevPage) return
            if (start+40 <= arrsearch.length){
                start+=40
                page+=1
            }
            else{
                limit = arrsearch.length
            }
            console.log(page)
            createPagination(arrsearch, start, limit)
            numPage.textContent=page
        })
        
    })

}