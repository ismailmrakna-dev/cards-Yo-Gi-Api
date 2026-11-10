export async function getData() {
  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0%20:%20https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
    localStorage.setItem("data-api",JSON.stringify(result.data))
 
    
    
  } catch (error) {
    console.error(error.message);
  }
}

export function loadData(){
   return JSON.parse(localStorage.getItem("data-api"))
}
function transObj(obj){
    const ob={

    id: obj.id,

    name: obj.name,

    type: obj.attribute,

    monsterType:obj.frametype,

    race: obj.race,

    stats: { atk: obj.atk, def: obj.def, level: obj.level },

    image: obj.card_images[0].image_url,

    description: obj.desc,

    effect: obj.type,
  }
  return ob
}

