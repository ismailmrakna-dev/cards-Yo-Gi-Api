
import { creerCards, searchNom, filtreType, showtri, buttonsUpdate, createBtn, createPagination } from "./ui.js"
import { } from "./storage.js"
import { loadData, getData, searchNameApi, filterTypeApi, filterAttributeApi } from "./services/api.js"

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
    filterAttributeApi("WIND")
    searchNameApi("dark")
    let offset1 = 0
    let page1=1
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
        }
        let arrfiltre = []
        arrfiltre = await filterAttributeApi(btnCLick.textContent, 30, offset1)
        createBtn(1)
        creerCards(arrfiltre)
        const prevPage = document.querySelector('.prev-btn')
        const nextPage = document.querySelector('.next-btn')
        const numPage = document.querySelector('.Npage-btn')
        prevPage.addEventListener("click", async (e) => {
            e.stopPropagation()
            if (offset1 - 20 <= 0) {
                offset1 = 0
                page1 = 1
                let arrfiltre = []
                arrfiltre = await filterAttributeApi(btnCLick.textContent, 30, offset1)
            creerCards(arrfiltre)
            numPage.textContent = page1
            }
            else{
            offset1 -= 20
            page1 -= 1
            let arrfiltre = []
            arrfiltre = await filterAttributeApi(btnCLick.textContent, 30, offset1)
            creerCards(arrfiltre)
            numPage.textContent = page1}
        })
        nextPage.addEventListener("click", async (e) => {
            e.stopPropagation()
            offset1 += 20
            page1 += 1
            let arrfiltre = []
            arrfiltre = await filterAttributeApi(btnCLick.textContent, 30, offset1)
            creerCards(arrfiltre)
            numPage.textContent = page1
        })
    })


    // search event
    let searchName = ""
    let offset = 0
    let page = 1

    search.addEventListener("input", async (e) => {
        const name = e.target.value.toLowerCase().trim()
        searchName = name
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
        arrsearch = await searchNameApi(searchName, 30, offset)
        creerCards(arrsearch)
        const prevPage = document.querySelector('.prev-btn')
        const nextPage = document.querySelector('.next-btn')
        const numPage = document.querySelector('.Npage-btn')

        prevPage.addEventListener("click", async (e) => {
            e.stopPropagation()
            if (offset - 20 <= 0) {
                offset = 0
                page = 1
                let arrsearch = []
            arrsearch = await searchNameApi(searchName, 30, offset)
            creerCards(arrsearch)
            numPage.textContent = page
            }
            else{
            offset -= 20
            page -= 1
            let arrsearch = []
            arrsearch = await searchNameApi(searchName, 30, offset)
            creerCards(arrsearch)
            numPage.textContent = page}
        })
        nextPage.addEventListener("click", async (e) => {
            e.stopPropagation()
            offset += 20
            page += 1
            let arrsearch = []
            arrsearch = await searchNameApi(searchName, 30, offset)
            creerCards(arrsearch)
            numPage.textContent = page
        })
    })

}