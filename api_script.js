const inne_lektury = await fetch("./other_books.json").then(r => r.json());

var lektury = ["Makbet", "Skąpiec", "Homer, Iliada", "Antygona", "Rozmowa mistrza Polikarpa ze śmiercią", "Lament Świętokrzyski", "Pieśń o Rolandzie",
    "Dziady, Dziady poema, Dziady czesc III", "Lalka", "Potop", "Zbrodnia i Kara", "Wesele", "Chłopi", "Przedwiośnie", "Ferdydurke", "Borowski, Proszę państwa do gazu", "Inny świat",
    "Zdążyć przed Panem Bogiem", "Dżuma", "Orwell, Rok 1984", "Tango", "Górą \"Edek\"", "Miejsce", "Profesor Andrews w Warszawie", "Podróże z Herodotem", "Balladyna", "Pan Tadeusz",
    "Zemsta", "Dziady, Dziady Poema, Dziady czesc II", "Romeo i Julia", "Borowski, Ludzie, którzy szli", "Gloria Victis, Tom Opowiadań", "Kordian", "Boska Komedia", "Hamlet",
    "Król Edyp", "ballady-i-romanse-switezianka", "Reduta Ordona", "Quo Vadis", "Konrad Wallenrod"
]


async function getBookByName(name){
    let refactoredName = refactorName(name)
    const url =  "https://wolnelektury.pl/api/books/".concat(refactoredName);
    var result;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        result = response.json();
    } catch(error) {
        result = inne_lektury.find(b => 
            b.title.toLowerCase() === name.toLowerCase()
        );
    }
    return result;
}

function refactorName(name){
    let result = "";
    name = name.toLowerCase();
    const polishLetters = new Map([
        ['ł', 'l'],
        ['ą', 'a'],
        ['ę', 'e'],
        ['ś', 's'],
        ['ć', 'c'],
        ['ó', 'o'],
        ['ź', 'z'],
        ['ż', 'z'],
        ['ń', 'n']
    ]);
    for(let ch of name){
        if(ch == ' '){
            result = result.concat('-');
        }
        else if(polishLetters.has(ch)){
            result = result.concat(polishLetters.get(ch));
        }
        else if(ch != ',' && ch != '.' && ch !='\"'){
            result = result.concat(ch);
        }
    }

    return result;
}

async function getBookDetails(name){
    const book = await getBookByName(name);
    if(book != null){
        return [book.title, book.authors[0].name, book.epochs[0].name, book.genres[0].name, book.kinds[0].name]
    }
    return ["X", "X", "X", "X", "X"];
}

document.getElementById("guessForm").addEventListener("submit", async (event) => {
  event.preventDefault();  // <--- stops refresh

  let x = document.getElementById("guess").value;

  if (x === "") {
    alert("Name must be filled out");
    return;
  }

  let details = await getBookDetails(x);
  document.getElementById("name").textContent = details[0];
  document.getElementById("author").textContent = details[1];
  document.getElementById("epoch").textContent = details[2];
  document.getElementById("genre").textContent = details[3];
  document.getElementById("kind").textContent = details[4];

    fitText("name");
    fitText("author");
    fitText("epoch");
    fitText("genre");
    fitText("kind");
});



function fitText(outputSelector){
    const maxFontSize = 50;
    let outputDiv = document.getElementById(outputSelector);
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

// window.addEventListener("DOMContentLoaded", () => {
//     fitText("name");
//     fitText("author");
//     fitText("epoch");
//     fitText("genre");
//     fitText("kind");
// });

