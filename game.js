import getBookDetails from "./api_script.js";
import {createNewSet, clearContainer} from "./ui_script.js";

const lektury = ["Makbet", "Skąpiec", "Homer, Iliada", "Antygona", "Rozmowa mistrza Polikarpa ze śmiercią", "Lament Świętokrzyski", "Pieśń o Rolandzie",
    "Dziady, Dziady poema, Dziady część III", "Lalka", "Potop", "Zbrodnia i Kara", "Wesele", "Chłopi", "Przedwiośnie", "Ferdydurke", "Borowski, Proszę państwa do gazu", "Inny świat",
    "Zdążyć przed Panem Bogiem", "Dżuma", "Orwell, Rok 1984", "Tango", "Górą \"Edek\"", "Miejsce", "Profesor Andrews w Warszawie", "Podróże z Herodotem", "Balladyna", "Pan Tadeusz",
    "Zemsta", "Dziady, Dziady Poema, Dziady część II", "Romeo i Julia", "Borowski, Ludzie, którzy szli", "Gloria Victis, Tom Opowiadań", "Kordian", "Boska Komedia", "Hamlet",
    "Król Edyp", "Ballady i Romanse, Świtezianka", "Reduta Ordona", "Quo Vadis", "Konrad Wallenrod", "Borowski, Proszę państwa do gazu"
]
var inneLektury;
var solution;
var solutionDetails;
var points = 0;
const input = document.getElementById("guess");

(async () => {
    console.log("STARTING UP")
    inneLektury = await fetch("./other_books.json").then(r => r.json());
    solution = await getRandomBook();
    solutionDetails = await getBookDetails(solution);
    console.log(solution, solutionDetails);
    input.disabled = false; // enable input after loading data
})();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function mergeLektury(){
    let lekturyAdd = inneLektury.map(t => t.title);
    return lektury.concat(lekturyAdd);
}

async function getRandomBook(){
    let allBooks = await mergeLektury();
    let x = getRandomInt(allBooks.length)
    return allBooks[x]
}

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        submitInput(input.value);
        input.value = "";
        points = 0;
    }
});

async function submitInput(title) {
    let details = await getBookDetails(title);

    let correct = createNewSet(details, solutionDetails);
   
    if(correct==5){
        setTimeout(() => {
            input.disabled = true;
            dialog.showModal(); 
        }, 800);
    }
}

async function playAgain() {
    solution = await getRandomBook();
    solutionDetails = await getBookDetails(solution);
    clearContainer();
    points = 0;
    input.disabled = false;
    console.log(solution, solutionDetails);
}

const dialog = document.querySelector("dialog");
const againButton = document.querySelector("dialog button");

againButton.addEventListener("click", async () => {
    playAgain();
    dialog.close();
})

document.getElementById("again").addEventListener("click", async () => {
    playAgain();
})


