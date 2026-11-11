export async function getData() {
  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const data=result.data.map((obj)=>transObj(obj))
    localStorage.setItem("data-api",JSON.stringify(data))
 
    
    
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

    monsterType:obj.frametype, //fix

    race: obj.race, //fix

    stats: { atk: obj.atk ?? 0, def: obj.def ?? 0, level: obj.level ?? 0 }, //no fix

    image: obj.card_images[0].image_url, //fix

    description: obj.desc, //fix

    effect: obj.type, // fix
  }
  return ob
}

