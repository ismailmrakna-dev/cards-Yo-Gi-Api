
import {} from "./ui.js"
import {} from "./storage.js"
import {loadData , getData} from "./services/api.js"
import {creerCards} from "../script.js"
const currentPage=window.location.pathname;

if(currentPage.includes("index.html")){
    initHomePages()
}

function initHomePages(){
    console.log("Home Page");
    getData()

    const arr=loadData()
    let cmp=0
    for( const obj  of arr ){ cmp++
        console.log(cmp, obj)
    }
    creerCards(arr)

}