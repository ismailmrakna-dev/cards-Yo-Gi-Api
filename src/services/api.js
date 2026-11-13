export async function getData(offset=0) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=40&offset=${offset}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const data=result.data.map((obj)=>transObj(obj))
    localStorage.setItem("data-api",JSON.stringify(data))
    return data
    
  } catch (error) {
    console.error(error.message);
  }
}

export function loadData(){
   return JSON.parse(localStorage.getItem("data-api"))
}
function transObj(obj){
    const ob={

    id: obj.id, //fix

    name: obj.name, //fix

    type: obj.attribute ?? null, //no fix

    monsterType:obj.frameType, //fix

    race: obj.race, //fix

    stats: { atk: obj.atk ?? 0, def: obj.def ?? 0, level: obj.level ?? 0 }, //no fix

    image: obj.card_images[0].image_url, //fix

    description: obj.desc, //fix

    effect: obj.type, // fix
  }
  return ob
}


// search from api Data

export async function searchNameApi(name){
     const url="https://db.ygoprodeck.com/api/v7/cardinfo.php";
     const response= await fetch(url)
     if(!response.ok){
      throw new Error(`Response Error: ${response.status}`)
     }
     const result=await response.json()
     const arr=result.data.map((obj)=>transObj(obj))
     const searchTarget=arr.filter(monst =>  monst.name.toLowerCase().includes(name.toLowerCase()));
     return searchTarget
}
   export async function filterTypeApi(type){
     const url="https://db.ygoprodeck.com/api/v7/cardinfo.php";
     try {
     const response= await fetch(url)
     if(!response.ok){
      throw new Error(`Response Error: ${response.status}`)
     }
     const result = await response.json()
     let arr=result.data.map((obj) => transObj(obj))
     
     
     const filterTarget=arr.filter((monst) =>{ 
      if(!monst.type) return false
      return monst.type.toLowerCase() === type.toLowerCase()});
      return filterTarget
    } catch (error) {
    console.error(error.message);
  }
}