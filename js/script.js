const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";

const mereinfo = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

let data;
let filter = "alle";

const toggleButton = document.getElementById('toggle-button');
const naviList = document.getElementById('navi-list');

const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
hentData;

function filtrerRetter() {
filter = this.dataset.kategori;
document.querySelector(".valgt").classList.remove("valgt");
this.classList.add("valgt");
vis(data);
}

toggleButton.addEventListener('click', () => {
naviList.classList.toggle('active')
})

async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  data = await respons.json();
  vis(data);
}

function vis() {
const main = document.querySelector("main");
const template = document.querySelector("template").content;
main.textContent = "";

  data.forEach((ret) => {
    //console.log("Kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
    const klon = template.cloneNode(true);
    klon.querySelector("article").addEventListener("click", () => visRet(ret));
    klon.querySelector(".billedlink").src = "images/" + ret.billednavn + "-md.jpg";
    klon.querySelector(".navn").textContent = ret.navn;
    klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse + ".";
    klon.querySelector(".pris").textContent = ret.pris + " kr.";
    main.appendChild(klon);
    }
  });
}

function visRet(ret) {
  console.log(ret);
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".billedlink").src = "images/" + ret.billednavn + "-md.jpg";
  popop.querySelector(".navn").textContent = ret.navn;
  popop.querySelector(".pris").textContent = ret.pris + " kr.";
  popop.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
  popop.addEventListener("click", () => (popop.style.display="none"));
}
hentData();