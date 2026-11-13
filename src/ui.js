// // =============================================================
// // script.js — Mon Dex
// // =============================================================
// // Les données viennent de data.js (la constante `creatures`).
// // Écrivez votre code ici, fonctionnalité par fonctionnalité.
// // Une carte GitHub Projects et au moins un commit par fonctionnalité.
// loadData()
let equipeMembers = []
const typesCard={
  DARK:"./images/DARK.svg",
  LIGHT:"./images/LIGHT.svg",
  FIRE:"./images/FIRE.svg",
  DIVINE:"./images/DIVINE.svg",
  WATER:"./images/WATER.svg",
  EARTH:"./images/EARTH.svg",
  WIND:"./images/WIND.svg"
  }
export  function creerCards (creatures) {
  const containerCard = document.querySelector("#cardsMonster")
  containerCard.innerHTML=""
  const monsters = creatures.slice()
  monsters.forEach((monst) => {
    let stars = ""
    for (let i = 0; i < monst.stats.level; i++) {
      stars += "⭐"
    }
    const card = document.createElement("article")
    card.className = `cardMonst h-150 flex flex-col gap-3 bg-[url('../images/bg-card.jpg')] bg-cover bg-center rounded-md p-3 pb-4 
        hover:scale-105 hover:shadow-lg hover:shadow-[#F5B942]/50 transition-all duration-300"`
    card.innerHTML = `
          <div class="relative flex h-2/3 items-center text-white justify-center rounded-xl bg-[#191970]">
            <img src="${monst.image}" alt="${monst.name}" class="h-full w-full object-cover rounded-xl">
            <span class="absolute left-3 top-2 font-mono text-sm text-white">${monst.id}</span>
          </div>
          <div class="flex flex-col items-center justify-between gap-2">
            <h3 class="font-display text-xl text-white font-semibold">${monst.name}</h3>
            <div class="flex gap-2 items-center justify-center">
              <span id="sptypecard" class="sptypecard rounded-full bg-[#F5B942] px-3 py-1 text-sm font-bold text-white">${monst.type}</span>
              <span class="rounded-full bg-[#191970] px-3 py-1 text-sm font-bold text-white">${monst.monsterType}</span>
              <span class="rounded-full bg-[#191970] px-3 py-1 text-sm font-bold text-white">${monst.race}</span>
            </div>
          </div>
          <p class="text-sm mx-auto text-white font-bold">ATK: ${monst.stats.atk} | DEF: ${monst.stats.def}</p>
          <p class="text-sm mx-auto font-bold text-white shadow-md">${stars}</p>
        `;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      afficheDetail(monst)
    })
    const addbutton = document.createElement("button")
    addbutton.textContent = "Ajouter à l'équipe"
    addbutton.className = " btn-ajouter bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
    addbutton.setAttribute("dataId", monst.id)
    addbutton.addEventListener("click", (e) => {
      e.stopPropagation();
      addToEquipe(monst);
    });
    card.appendChild(addbutton)
    containerCard.appendChild(card);
  });
}


// // -------------------------------------------------------------
// // 1. AFFICHAGE
// // Supprimez les cartes écrites à la main dans index.html et
// // construisez la grille à partir du tableau `creatures`.
// // -------------------------------------------------------------



// // -------------------------------------------------------------
// // 2. DÉTAIL
// // Un clic sur une carte ouvre le panneau de détail :
// // image, description, et statistiques affichées en barres.
// // -------------------------------------------------------------
function afficheDetail(monst) {
  const detail = document.querySelector("#detailCard")
  const image = detail.querySelector("img")
  const idMonster = detail.querySelector("#spanId")
  const nom = detail.querySelector("h2")
  const imgType = detail.querySelector("#imgType")
  const type = detail.querySelector("#spanType")
  const monstype = detail.querySelector("#spMonsterType")
  const race = detail.querySelector("#spRace")

  const description = detail.querySelector("#pDescription")
  const effect = detail.querySelector("#spEffect")
  const lvl = detail.querySelector("#pLvl")
  const atk = detail.querySelector("#spAtk")
  const def = detail.querySelector("#spDef")
  const atkVal = detail.querySelector("#spAtkVal")
  const defVal = detail.querySelector("#spDefVal")
  let stars = ""
  for (let i = 0; i < monst.stats.level; i++) {
    stars += "⭐"
  }
  image.src = monst.image
  image.alt = monst.name
  nom.textContent = monst.name
  monstype.textContent = monst.monsterType
  race.textContent = monst.race
  idMonster.textContent = `#${monst.id} . Détail`
  type.textContent = monst.type
  for (const typec in typesCard) {
    if (typec === monst.type) {
      imgType.src = typesCard[typec]
      break
    }
  }


  description.textContent = monst.description
  if (monst.effect === null) {
    effect.textContent = "Aucune Effect"
  }
  else {
    effect.textContent = monst.effect
  }
  lvl.textContent = stars
  atkVal.textContent = monst.stats.atk
  let perA = Math.min((monst.stats.atk / 5000) * 100, 100)
  atk.style.width = perA + "%"
  let perD = Math.min(((monst.stats.def) / 5000) * 100, 100)
  defVal.textContent = monst.stats.def
  def.style.width = perD + "%"

  const detailBt = document.querySelector("#detailCard .btn-show");
  detailBt.innerHTML=""
  const detailBtn=document.createElement("button")
  if (detailBtn) {
    detailBtn.innerHTML=""
    detailBtn.textContent = "Ajouter à l'équipe"
    detailBtn.className = "btn-ajouter bg-[#F5B942] w-full p-4 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
    detailBtn.setAttribute("dataId", monst.id)
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToEquipe(monst);
    });
    detailBt.appendChild(detailBtn)
  }
  // buttonsUpdate();

}

// // -------------------------------------------------------------
// // 3. RECHERCHE
// // La liste se met à jour pendant la saisie d'un nom
// // (sans tenir compte des majuscules).
// // -------------------------------------------------------------
export function searchNom() {
  const search = document.querySelector("#search")
  const cards = document.querySelectorAll(".cardMonst")
  search.addEventListener("input", (event) => {
    const name = event.target.value.toLowerCase().trim()
    cards.forEach((card) => {
      const text = card.querySelector("h3")
      const targCard = text.textContent.toLowerCase()
      if (targCard.includes(name)) {
        card.style.display = ""

      }
      else card.style.display = "none"
    })


  })
}



// // -------------------------------------------------------------
// // 4. FILTRE
// // Les boutons de type n'affichent que les créatures de ce type ;
// // « Tous » réinitialise le filtre.
// // La recherche et le filtre fonctionnent ENSEMBLE.
// // -------------------------------------------------------------
export function filtreType() {
  const filter = document.querySelector("#filters")
  const cards = document.querySelectorAll(".cardMonst")
  filter.addEventListener("click", (event) => {
    const clickbtn = event.target.closest("#btn-filter");
    if (!clickbtn) return
    // 3. Filter the items
    filter.querySelectorAll("#btn-filter").forEach(btn => btn.style.background = "white")
    const sortBtn = document.querySelector("#btn-sort");
    if (sortBtn) {
      sortBtn.style.background = "";
      sortBtn.classList.remove("active");
    }
    clickbtn.style.background = "#F5B942"
    const filterValue = clickbtn.textContent.toLowerCase().trim()
    cards.forEach((card) => {
      if (filterValue === "all") {
        card.style.display = ""
      }
      else {
        const text = card.querySelector("#sptypecard")
        const targCard = text.textContent.toLowerCase()
        if (targCard === filterValue) {
          card.style.display = ""
        }
        else card.style.display = "none"
      }

    })
  })
}



// // -------------------------------------------------------------
// // 5. CRÉER UNE CRÉATURE
// // Validez chaque champ du formulaire avec une expression régulière
// // (voir le tableau du brief). Affichez le message d'erreur sous le
// // champ, et n'ajoutez jamais une créature invalide.
// // -------------------------------------------------------------
// function creerOneCard() {
//   const form = document.querySelector("#creature-form");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     clearError();


//     const {
//       id,
//       name,
//       type,
//       monstertype,
//       race,
//       lvlMonster,
//       atkMonster,
//       defMonster,
//       imgMonster,
//       descMonster,
//       effMonster
//     } = form.elements;

//     let isValid = true;

//     if (!idIsValid(id.value)) {
//       showError(id, "ID invalide (ex: #001)");
//       isValid = false;
//     }

//     if (!nomIsValid(name.value)) {
//       showError(name, "Nom invalide (2-30 caractères)");
//       isValid = false;
//     }

//     if (!typeIsValid(type.value)) {
//       showError(type, "Veuillez choisir un attribut");
//       isValid = false;
//     }

//     if (!monsterTypeIsValid(monstertype.value)) {
//       showError(monstertype, "Veuillez choisir un type de monstre");
//       isValid = false;
//     }

//     if (!raceIsValid(race.value)) {
//       showError(race, "Race invalide");
//       isValid = false;
//     }

//     if (!levelIsValid(lvlMonster.value)) {
//       showError(lvlMonster, "Niveau entre 1 et 12");
//       isValid = false;
//     }

//     if (!atkIsValid(atkMonster.value)) {
//       showError(atkMonster, "ATK entre 0 et 9999");
//       isValid = false;
//     }

//     if (!atkIsValid(defMonster.value)) {
//       showError(defMonster, "DEF entre 0 et 9999");
//       isValid = false;
//     }

//     if (!imgIsValid(imgMonster.value)) {
//       showError(imgMonster, "Lien d'image invalide (.png, .jpg...)");
//       isValid = false;
//     }

//     if (!descIsValid(descMonster.value)) {
//       showError(descMonster, "Description entre 10 et 200 caractères");
//       isValid = false;
//     }

//     if (!effectIsValid(effMonster.value)) {
//       showError(effMonster, "Effet entre 10 et 200 caractères (ou vide)");
//       isValid = false;
//     }


//     if (isValid) {
//       const newMonster = {
//         id: id.value,
//         name: name.value.trim(),
//         type: type.value,
//         monsterType: monstertype.value,
//         race: race.value.trim(),
//         stats: {
//           atk: Number(atkMonster.value),
//           def: Number(defMonster.value), level: Number(lvlMonster.value)
//         },
//         image: imgMonster.value.trim(),
//         description: descMonster.value.trim(),
//         effect: effMonster.value.trim() || null
//       };
//       creatures.push(newMonster);
//       saveCreatures()


//       document.querySelector("#cardsMonster").innerHTML = "";
//       creerCards(creatures);

//       form.reset();
//       clearError();

//       alert("Créature ajoutée avec succès !");
//       console.log("Nouvelle créature :", newMonster);
//     }

//   });

// }

// creerOneCard();


// function idIsValid(id) {
//   return /^#\d{3}$/.test(id);
// }

// function nomIsValid(nom) {
//   return /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 '-]{1,29}$/.test(nom);
// }

// function typeIsValid(type) {
//   const valid = ["DARK", "LIGHT", "FIRE", "WATER", "EARTH", "WIND", "DIVINE"];
//   return valid.includes(type);
// }

// function monsterTypeIsValid(type) {
//   const valid = ["Normal", "Effect", "Fusion", "Ritual"];
//   return valid.includes(type);
// }

// function raceIsValid(race) {
//   return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ '-]{1,20}$/.test(race);
// }

// function levelIsValid(level) {
//   return /^([1-9]|1[0-2])$/.test(level);
// }

// function atkIsValid(value) {
//   return /^\d{1,4}$/.test(value) && Number(value) <= 9999;
// }

// function imgIsValid(img) {
//   return /^https?:\/\/.+\.(png|jpg|jpeg|webp|gif)$/i.test(img);
// }

// function descIsValid(text) {
//   const len = text.trim().length;
//   return len >= 10 && len <= 200;
// }

// function effectIsValid(text) {
//   if (text.trim() === "") return true; // optional
//   const len = text.trim().length;
//   return len >= 10 && len <= 200;
// }


// function showError(input, message) {
//   const errorSpan = input.parentElement.querySelector(".error-message");
//   errorSpan.textContent = message;
//   errorSpan.style.color = "#ff4d4d";
// }

// function clearError() {
//   document.querySelectorAll(".error-message").forEach(span => {
//     span.textContent = "";
//   });
// }



// // -------------------------------------------------------------
// // 6. MON ÉQUIPE
// // Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// // écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// // -------------------------------------------------------------

export function addToEquipe(monst) {
  const message = document.querySelector('#teamMessage')
  let alreadyAdded = false
  for (let i = 0; i < equipeMembers.length; i++) {
    if (equipeMembers[i].id === monst.id) {
      alreadyAdded = true
      break
    }
  }
  if (alreadyAdded) {
    message.textContent = `${monst.name} Est déjà dans votre equipe`
    message.style.color = "#f87171"
    return
  }
  if (equipeMembers.length >= 6) {
    message.textContent = "votre equipe est Pleine (Max:6 Cards)"
    message.style.color = "#f87171"
    return
  }

  equipeMembers.push(monst)
  // saveTeam()
  message.textContent = `${monst.name} a été ajouté à votre equipe`
  message.style.color = "#4ade80"
  teamdisplay()
  buttonsUpdate()
}
export function teamdisplay() {
  const equipeCont = document.querySelector("#team #teamspace")
  const title = document.querySelector("#team h2")
  if (title) {
    title.textContent = `Mon équipe (${equipeMembers.length}/6)`;
    const equipe = document.querySelector("#team-count")
    equipe.textContent = `${equipeMembers.length}`
  }
  equipeCont.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    const part = document.createElement("div")
    part.className = "relative bg-blue-900 rounded-xl aspect-square overflow-hidden flex items-center justify-center"
    if (equipeMembers[i]) {
      part.innerHTML = `
        <img src="${equipeMembers[i].image}" alt="${equipeMembers[i].name}" class="w-full h-full object-cover">
        `;
      const del = document.createElement("button")
      del.textContent = "X"
      del.className = "btn-del absolute top-2 right-2 bg-[#F5B942] rounded-full p-2 w-6 h-6 flex items-center justify-content text-xs fond-bold hover:bg-[#E5A932]"
      del.setAttribute("dataId", equipeMembers[i].id)
      del.addEventListener("click", () => {
        removeFromTeam(equipeMembers[i].id);
      });
      part.appendChild(del)
    }
    else {
      part.innerHTML = `<div class="absolute top-2 left-2 bg-[#F5B942] rounded-full w-6 h-6 flex items-center justify-content text-xs fond-bold">
      </div>`
    }
    equipeCont.appendChild(part)
  }

}


export function removeFromTeam(idcard) {
  const message = document.querySelector("#teamMessage");

  let name = "";
  for (let i = 0; i < equipeMembers.length; i++) {
    if (equipeMembers[i].id === idcard) {
      name = equipeMembers[i].name;
      break;
    }
  }

  // Keep only the cards that are NOT the one we want to delete
  equipeMembers = equipeMembers.filter(m => m.id !== idcard);

  if (name) {
    message.textContent = `${name} a été retiré de l'équipe.`;
    message.style.color = "#fbbf24";
  }

  teamdisplay();
  buttonsUpdate();
}

// // -------------------------------------------------------------
// // 7. RÈGLES DE L'ÉQUIPE
// // 6 créatures au maximum, pas de doublon, un message clair quand
// // une action est refusée, et un compteur (x/6).
// // -------------------------------------------------------------

export function buttonsUpdate() {
  const buttons = document.querySelectorAll(".btn-ajouter")
  buttons.forEach((btn) => {
    const idmonster = btn.getAttribute("dataId")
    let inTeam = false
    for (let i = 0; i < equipeMembers.length; i++) {
      if (equipeMembers[i].id === idmonster) {
        inTeam = true
        break
      }
    }
    if (equipeMembers.length >= 6) {
      btn.textContent = "Equipe Complet"
      btn.disabled = true;
      btn.classList.add("opacity-50", "cursor-not-allowed")
      return
    }
    else if (inTeam) {
      btn.textContent = "Déja ajouté"
      btn.disabled = true;
      btn.classList.add("opacity-50", "cursor-not-allowed")
    }
    else {
      btn.textContent = "Ajouter à l'équipe"
      btn.disabled = false;
      btn.classList.remove("opacity-50", "cursor-not-allowed")
    }
  })
}
// // -------------------------------------------------------------
// // BONUS : LocalStorage, Fetch API, tri, comparaison
// // -------------------------------------------------------------

// //show tri
export function showtri(creatures) {
  const containerCard = document.querySelector("#cardsMonster");
  const copy = creatures.slice();
  copy.sort((a, b) => (b.stats.atk + b.stats.def) - (a.stats.atk + a.stats.def));
  const filter = document.querySelector("#filters");
  const clickbtn = document.querySelector("#btn-sort");

  if (!clickbtn) {
    containerCard.innerHTML = "";
    filtreType();
    creerCards(creatures);
    return;
  }

  clickbtn.addEventListener("click", () => {
    containerCard.innerHTML = "";
    filter.querySelectorAll(".btn-filter").forEach(btn => {
      btn.style.background = "";
      btn.classList.remove("active");
    });
    clickbtn.style.background = "#F5B942";
    clickbtn.classList.add("active");
    creerCards(copy);
    filtreType();
    buttonsUpdate();
  });
}

export function createBtn(number){
  const btnCont=document.querySelector('#btns-load')
  btnCont.innerHTML=""
  btnCont.innerHTML=`<button class="prev-btn p-4 bg-[#F5B942] rounded-xl hover:bg-[#F5B942]/90" type="button">prev</button>
          <button class="Npage-btn p-4 bg-[#F5B942] rounded-xl hover:bg-[#F5B942]/90" type="button">${number}</button>
          <button class="next-btn p-4 bg-[#F5B942] rounded-xl hover:bg-[#F5B942]/90" type="button">next</button>`
}
export async function createPagination(array, start=0, limit=0){
      let arr =await array.slice(start, limit)
      creerCards(arr)
}

// // comparaison 2 cards
// function fillCompareSelects() {
//   const select1 = document.querySelector("#card1");
//   const select2 = document.querySelector("#card2");

//   select1.innerHTML = `<option value="">Choisir la première carte</option>`;
//   select2.innerHTML = `<option value="">Choisir la deuxième carte</option>`;
//   creatures.forEach((c) => {
//     const option1 = document.createElement("option");
//     option1.value = c.id;
//     option1.textContent = c.name;
//     const option2 = document.createElement("option");
//     option2.value = c.id;
//     option2.textContent = c.name;

//     select1.appendChild(option1);
//     select2.appendChild(option2);
//   });
// }
// fillCompareSelects()
// function compareCards() {
//   const id1 = document.querySelector("#card1").value;
//   const id2 = document.querySelector("#card2").value;
//   const resultDiv = document.querySelector("#compare-result");

//   if (!id1 || !id2) {
//     alert("Veuillez choisir deux cartes");
//     return;
//   }

//   if (id1 === id2) {
//     alert("Veuillez choisir deux cartes différentes");
//     return;
//   }

//   const card1 = creatures.find(c => c.id === id1);
//   const card2 = creatures.find(c => c.id === id2);

//   function winner(val1, val2) {
//     if (val1 > val2) return "text-green-400 font-bold";
//     if (val1 < val2) return "text-red-400";
//     return "text-yellow-400";
//   }

//   resultDiv.innerHTML = `
//     <div class="font-bold text-[#F5B942]">Statistique</div>
//     <div class="font-bold">${card1.name}</div>
//     <div class="font-bold">${card2.name}</div>

//     <div>ATK</div>
//     <div class="${winner(card1.stats.atk, card2.stats.atk)}">${card1.stats.atk}</div>
//     <div class="${winner(card2.stats.atk, card1.stats.atk)}">${card2.stats.atk}</div>

//     <div>DEF</div>
//     <div class="${winner(card1.stats.def, card2.stats.def)}">${card1.stats.def}</div>
//     <div class="${winner(card2.stats.def, card1.stats.def)}">${card2.stats.def}</div>

//     <div>Niveau</div>
//     <div class="${winner(card1.stats.level, card2.stats.level)}">${card1.stats.level}</div>
//     <div class="${winner(card2.stats.level, card1.stats.level)}">${card2.stats.level}</div>

//     <div>Total (ATK+DEF)</div>
//     <div class="${winner(card1.stats.atk + card1.stats.def, card2.stats.atk + card2.stats.def)}">
//       ${card1.atk + card1.def}
//     </div>
//     <div class="${winner(card2.stats.atk + card2.stats.def, card1.stats.atk + card1.stats.def)}">
//       ${card2.stats.atk + card2.stats.def}
//     </div>
//   `;

//   resultDiv.classList.remove("hidden");
// }


// document.querySelector("#btn-compare")?.addEventListener("click", compareCards);


// // localStorage

// // Save team to LocalStorage
// export function saveTeam() {
//   localStorage.setItem("YoGiOh-team", JSON.stringify(equipeMembers));
// }
// function saveCreatures() {
//   localStorage.setItem("YoGiOh-creatures", JSON.stringify(creatures));
// }


// function loadData() {
//   const savedTeam = localStorage.getItem("YoGiOh-team");
//   if (savedTeam) {
//     equipeMembers = JSON.parse(savedTeam);
//   }
//   // const savedCreatures = localStorage.getItem("yugioh-creatures");
//   // if (savedCreatures) {
//   //   creatures = JSON.parse(savedCreatures);
//   // }
// }

