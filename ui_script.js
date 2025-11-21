export {createNewSet, clearContainer};


const container = document.getElementById("all-sets");

const inputElement = document.getElementById("guess");
if (inputElement) {
    inputElement.addEventListener("input", showDropdown);
    inputElement.addEventListener("blur", hideDropdown);
    inputElement.addEventListener("keyup", filterFunction);
}

function createNewSet(details, solutionDetails) {
    // rodzic: all-sets
    const set = document.createElement("div");
    set.classList.add("set");
    var correct = 0;

    for (let i = 0; i < 5; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.textContent = details[i];
        if(details[i].toLowerCase() == solutionDetails[i].toLowerCase()){
            block.style.background = "rgba(99, 128, 99, 1)";
            correct++;
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

    return correct;
}

function clearContainer(){
    container.innerHTML = '';
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

function showDropdown() {
    document.getElementById("myDropdown").classList.add("show");
}

function hideDropdown(){
    document.getElementById("myDropdown").classList.remove("show");
}

function filterFunction() {
    var input, filter, p, i;
    input = document.getElementById("guess");
    filter = input.value.toUpperCase();
    var div = document.getElementById("myDropdown");
    p = div.getElementsByTagName("p");
    for (i = 0; i < p.length; i++) {
        let txtValue = p[i].textContent || p[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            p[i].style.display = "";
        } else {
            p[i].style.display = "none";
        }
    }
}
