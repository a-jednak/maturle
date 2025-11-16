import getBookDetails from "./api_script.js";

const lektury = ["Makbet", "Skąpiec", "Homer, Iliada", "Antygona", "Rozmowa mistrza Polikarpa ze śmiercią", "Lament Świętokrzyski", "Pieśń o Rolandzie",
    "Dziady, Dziady poema, Dziady czesc III", "Lalka", "Potop", "Zbrodnia i Kara", "Wesele", "Chłopi", "Przedwiośnie", "Ferdydurke", "Borowski, Proszę państwa do gazu", "Inny świat",
    "Zdążyć przed Panem Bogiem", "Dżuma", "Orwell, Rok 1984", "Tango", "Górą \"Edek\"", "Miejsce", "Profesor Andrews w Warszawie", "Podróże z Herodotem", "Balladyna", "Pan Tadeusz",
    "Zemsta", "Dziady, Dziady Poema, Dziady czesc II", "Romeo i Julia", "Borowski, Ludzie, którzy szli", "Gloria Victis, Tom Opowiadań", "Kordian", "Boska Komedia", "Hamlet",
    "Król Edyp", "ballady-i-romanse-switezianka", "Reduta Ordona", "Quo Vadis", "Konrad Wallenrod", "Borowski, Proszę państwa do gazu"
]
var inneLektury;
var solution;
var solutionDetails;

(async () => {
    console.log("STARTING UP")
    inneLektury = await fetch("./other_books.json").then(r => r.json());
    solution = await getRandomBook();
    solutionDetails = await getBookDetails(solution);

    console.log(solution, solutionDetails);

    const input = document.getElementById("guess");
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


const input = document.getElementById("guess");
const container = document.getElementById("all-sets");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        createNewSet(input.value);
        input.value = "";
    }
});

async function createNewSet(title) {
    // rodzic: all-sets
    const set = document.createElement("div");
    set.classList.add("set");

    let details = await getBookDetails(title);

    for (let i = 0; i < 5; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.textContent = details[i];
        if(details[i] == solutionDetails[i]){
            block.style.background = "rgba(99, 128, 99, 1)";
        }

        set.appendChild(block);

        requestAnimationFrame(() => fitText(block));
    }

    // dodajemy na górę listy
    container.prepend(set);

    // mały timeout, żeby animacja mogła się odpalić
    setTimeout(() => {
        set.classList.add("show");
    }, 10);
}

function fitText(outputSelector){
    const maxFontSize = 50;
    let outputDiv = outputSelector;
    let width = outputDiv.clientWidth;
    let contentWidth = outputDiv.scrollWidth;
    let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'),10);
    // if content's width is bigger then elements width - overflow
    if (contentWidth > width || outputDiv.scrollHeight > outputDiv.clientHeight){
        while ((contentWidth > width || outputDiv.scrollHeight > outputDiv.clientHeight) && fontSize > 5) {
        fontSize--;
        outputDiv.style.fontSize = fontSize + 'px';

        // aktualizacja wymiarów
        width = outputDiv.clientWidth;
        contentWidth = outputDiv.scrollWidth;
    } 
    }
}


