// async function getBooks(){
//     const url =  "https://wolnelektury.pl/api/books";
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);
//     } catch(error) {
//         console.log(error);
//     }
// }
var lektury = ["Biblia", "Mitologia", "Makbet", "Skąpiec", "Homer, Iliada", "Antygona", "Rozmowa mistrza Polikarpa ze śmiercią", "Lament Świętokrzyski", "Pieśń o Rolandzie",
    "Dziady, Dziady poema, Dziady czesc III", "Lalka", "Potop", "Zbrodnia i Kara", "Wesele", "Chłopi", "Przedwiośnie", "Ferdydurke", "Borowski, Proszę państwa do gazu", "Inny świat",
    "Zdążyć przed Panem Bogiem", "Dżuma", "Orwell, Rok 1984", "Tango", "Górą \"Edek\"", "Miejsce", "Profesor Andrews w Warszawie", "Podróże z Herodotem", "Balladyna", "Pan Tadeusz",
    "Zemsta", "Dziady, Dziady Poema, Dziady czesc II", "Romeo i Julia", "Borowski, Ludzie, którzy szli", "Gloria Victis, Tom Opowiadań", "Kordian", "Boska Komedia", "Hamlet"
]

// Czego nie ma na wolnelektury:
// Biblia, Mitologia, Zbrodnia i Kara, Ferdydurke, Inny świat, Zdążyć przed Panem Bogiem, Dżuma, Tango Mrożka, Górą edek, Miejsce, Profesor Andrews w Warszawie, Podróże z Herodotem
// mogę ręcznie je dodać w formie mapy(tytuł, details)
// zamiast mitologii i biblii moze daj po prostu jakies ksiegi/fragmenty

async function getBookByName(name){
    let refactored_name = refactorName(name)
    const url =  "https://wolnelektury.pl/api/books/".concat(refactored_name);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = response.json();
        // console.log(result);
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
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
        return [book.title, book.epochs[0].name, book.genres[0].name, book.kinds[0].name, book.authors[0].name]
    }
    return [name, name, name, name, name];
}

// async function submitGuess() {
//   let x = document.getElementById("guess").value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   }
//   let details = await getBookDetails(x);
//   document.getElementById("details").textContent = details;
// }

document.getElementById("guessForm").addEventListener("submit", async (event) => {
  event.preventDefault();  // <--- stops refresh

  let x = document.getElementById("guess").value;

  if (x === "") {
    alert("Name must be filled out");
    return;
  }

  let details = await getBookDetails(x);
  document.getElementById("details").textContent = details;
});



// getBooks();

// console.log(refactorName("Twój Stary Pijany Żaczek"))
// var pan_tadeusz = await getBookByName("dziady-dziady-poema-dziady-czesc-iii");
// console.log(pan_tadeusz)

// for(var title of lektury){
//     var dets = await getBookDetails(title);
//     console.log(title);
//     console.log(dets);
// }

