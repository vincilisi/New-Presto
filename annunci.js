let navbar = document.querySelector("#navbar");
let katana = document.querySelector(`#katana`);
let chek = false;

window.addEventListener(`scroll`, () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        navbar.classList.remove(`bg-cadet`);
        navbar.classList.add(`bg-peach`);
    } else {
        navbar.classList.remove(`bg-peach`);
        navbar.classList.add(`bg-cadet`);
    }
});

katana.addEventListener(`click`, () => {
    if (chek == false) {
        katana.style.transform = (`rotate(-90deg)`);
        chek = true;
    } else {
        katana.style.transform = (`rotate(0deg)`);
        chek = false;
    }
});

const files = ['katana.json', 'kimono.json', 'libro.json', 'servizio-da-sushi.json', 'servizio-da-te.json'];
let allData = [];

let cartCount;
let cartItems = 0;

Promise.all(
    files.map(file => fetch(`./json/${file}`).then(res => res.json()))
).then(results => {
    allData = results.flat();
    allData.sort((a, b) => a.prezzo - b.prezzo);

    let radiowrapper = document.querySelector(`#radiowrapper`);
    let cardwrapper = document.querySelector(`#cardwrapper`);
    let priceInput = document.querySelector(`#priceInput`);
    let priceValue = document.querySelector(`#priceValue`);
    let textInput = document.querySelector(`#textInput`);

    function radiocreate() {
        let categoris = allData.map((annuncio) => annuncio.categoria);
        let uniqueCategories = Array.from(new Set(categoris));
        // Prima opzione: tutte le categorie
        let divAll = document.createElement(`div`);
        divAll.classList.add(`form-check`);
        divAll.innerHTML = `
            <input class="form-check-input" type="radio" name="categoris" id="all" checked>
            <label class="form-check-label" for="all">
                Tutte le categorie
            </label>
        `;
        radiowrapper.appendChild(divAll);

        uniqueCategories.forEach((categoria) => {
            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categoris" id="${categoria}">
                <label class="form-check-label" for="${categoria}">
                    ${categoria}
                </label>
            `;
            radiowrapper.appendChild(div);
        });
    }

    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cartIcon) {
        cartCount = document.createElement("span");
        cartCount.id = "cart-count";
        cartCount.className = "badge bg-danger ms-1";
        cartCount.style.display = "none";
        cartIcon.parentNode.appendChild(cartCount);
    }

    function showcards(array) {
        cardwrapper.innerHTML = "";
        if (array.length === 0) {
            cardwrapper.innerHTML = "<p>Nessun annuncio trovato.</p>";
            return;
        }
        array.forEach((annuncio) => {
            const card = document.createElement("div");
            card.classList.add("card-custom");

            const flipContainer = document.createElement("div");
            flipContainer.classList.add("card-flip-container");

            const front = document.createElement("div");
            front.classList.add("card-face-front");
            front.innerHTML = `
                <img src="${annuncio.immagine}" alt="" style="width:100%; height:100px; object-fit:cover;">
                <h4>${annuncio.nome}</h4>
                <p class="lead">${annuncio.categoria}</p>
                <p>${annuncio.descrizione}</p>
                <p><strong>${annuncio.prezzo}€</strong></p>
            `;

            const back = document.createElement("div");
            back.classList.add("card-face-back");
            back.innerHTML = ` 
                <button class="btn btn-custom2" type="button">Aggiungi Carrello <i class="fa-solid fa-cart-shopping"></i></button>
                <button class="btn btn-custom" type="button">Dettagli</button>`;
            const buttons = back.querySelectorAll("button");
            buttons.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.stopPropagation();
                });
            });

            const addToCartBtn = back.querySelector(".btn-custom2");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", () => {
                    cartItems++;
                    if (cartCount) cartCount.textContent = cartItems;
                    cartCount.style.display = "inline-block"; 
                });
            }

            flipContainer.appendChild(front);
            flipContainer.appendChild(back);
            card.appendChild(flipContainer);

            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
            });

            cardwrapper.appendChild(card);
        });
    }

    // Range per la categoria selezionata o tutte
    function SetRanger(selectedCat) {
        let filtered = (selectedCat === "all")
            ? allData
            : allData.filter(annuncio => annuncio.categoria === selectedCat);
        let prices = filtered.map(annuncio => annuncio.prezzo);
        if (prices.length === 0) {
            priceInput.max = 0;
            priceInput.value = 0;
            priceValue.innerHTML = 0;
            return;
        }
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices[prices.length - 1]);
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }

    // Filtro globale
    function GlobalFilter(updateRange = false) {
        let radiobuttons = document.querySelectorAll(`.form-check-input`);
        let selectedRadio = Array.from(radiobuttons).find((bottone) => bottone.checked);
        let cat = selectedRadio ? selectedRadio.id : "all";

        if (updateRange) {
            SetRanger(cat);
        }

        let maxPrezzo = Number(priceInput.value);
        let parola = textInput.value.toLowerCase();

        let filtered = allData.filter((annuncio) => {
            let matchCat = (cat === "all") ? true : annuncio.categoria.toLowerCase() === cat.toLowerCase();
            let matchPrezzo = annuncio.prezzo <= maxPrezzo;
            let matchWord = annuncio.nome.toLowerCase().includes(parola);
            return matchCat && matchPrezzo && matchWord;
        });

        showcards(filtered);
    }

    radiocreate();

    // Seleziona la prima categoria di default ("all")
    SetRanger("all");
    GlobalFilter();

    // Event listeners
    let radiobuttons = document.querySelectorAll(`.form-check-input`);
    radiobuttons.forEach((button) => {
        button.addEventListener(`change`, () => {
            GlobalFilter(true); // Aggiorna anche il range prezzo
        });
    });

    priceInput.addEventListener(`input`, () => {
        priceValue.innerHTML = priceInput.value;
        GlobalFilter();
    });

    textInput.addEventListener(`input`, () => {
        GlobalFilter();
    });
});