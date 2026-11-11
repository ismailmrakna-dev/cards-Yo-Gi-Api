
import {creerCards} from "./ui.js"
import {} from "./storage.js"
import {loadData , getData} from "./services/api.js"
import { StrictMode } from "react";

const currentPage=window.location.pathname;

if(currentPage.includes("index.html")){
    initHomePages()
}

function initHomePages(){
    console.log("Home Page");
    getData(60)
    document.querySelector('#btns-load').addEventListener("click",(event)=>{
        const btnCLick=event.target.closest(".loadMore")
        let offset=btnCLick.textContent
        const obj={
            "1":0,
            "2":20,
            "3":40,
            "4":60,
            "5":80,
            "6":100,
        }
        console.log(obj[offset])
        getData(obj[offset])
        const arr=loadData()
    let cmp=0
    for( const obj  of arr ){ cmp++
        console.log(cmp, obj)
    }
    creerCards(arr)

    })
}