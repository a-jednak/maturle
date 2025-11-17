export default getBookDetails;

const inneLektury = await fetch("./other_books.json").then(r => r.json());

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
        result = inneLektury.find(b => 
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




