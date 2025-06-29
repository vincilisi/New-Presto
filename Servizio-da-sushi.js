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

const files = ['servizio-da-sushi.json'];
let allData = [];

let cartCount;
let cartItems = 0;
let cart = [];

Promise.all(
    files.map(file => fetch(`./json/${file}`).then(res => res.json()))
).then(results => {
    allData = results.flat();
    allData.sort((a, b) => a.prezzo - b.prezzo);

    let cardwrapper = document.querySelector(`#cardwrapper`);
    let priceInput = document.querySelector(`#priceInput`);
    let priceValue = document.querySelector(`#priceValue`);
    let textInput = document.querySelector(`#textInput`);

    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cartIcon) {
        cartCount = document.createElement("span");
        cartCount.id = "cart-count";
        cartCount.className = "badge bg-danger ms-1";
        cartCount.style.display = "none";
        cartIcon.parentNode.appendChild(cartCount);

        cartCount.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            showCartDisplay();
        });
    }

    function showcards(array) {
        cardwrapper.innerHTML = "";
        if (array.length === 0) {
            cardwrapper.innerHTML = "<p>Nessuna katana trovata.</p>";
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
                    cart.push(annuncio);
                    if (cartCount) {
                        cartCount.textContent = cartItems;
                        cartCount.style.display = "inline-block";
                    }
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

    function showCartDisplay() {
        const cartDisplay = document.getElementById("cart-display");
        const cartList = document.getElementById("cart-list");
        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartList.innerHTML = "<li>Il carrello è vuoto!</li>";
        } else {
            cart.forEach((item, i) => {
                const li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.marginBottom = "8px";
                li.innerHTML = `
                    <span>${item.nome} - ${item.prezzo}€</span>
                    <button class="btn btn-danger btn-sm" data-index="${i}">Rimuovi</button>
                `;
                cartList.appendChild(li);
            });
        }

        cartDisplay.style.display = "block";

        cartList.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", function() {
                const idx = parseInt(this.getAttribute("data-index"));
                cart.splice(idx, 1);
                cartItems--;
                if (cartCount) {
                    cartCount.textContent = cartItems;
                    if (cartItems === 0) cartCount.style.display = "none";
                }
                showCartDisplay();
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const cartDisplay = document.getElementById("cart-display");
        const closeCart = document.getElementById("close-cart");
        if (closeCart) {
            closeCart.addEventListener("click", () => {
                cartDisplay.style.display = "none";
            });
        }
    });

    function SetRanger() {
        let prices = allData.map(annuncio => annuncio.prezzo);
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

    function GlobalFilter(updateRange = false) {
        if (updateRange) {
            SetRanger();
        }
        let maxPrezzo = Number(priceInput.value);
        let parola = textInput.value.toLowerCase();

        let filtered = allData.filter((annuncio) => {
            let matchPrezzo = annuncio.prezzo <= maxPrezzo;
            let matchWord = annuncio.nome.toLowerCase().includes(parola);
            return matchPrezzo && matchWord;
        });

        showcards(filtered);
    }

    // Inizializzazione solo per prezzo e testo
    SetRanger();
    GlobalFilter();

    priceInput.addEventListener(`input`, () => {
        priceValue.innerHTML = priceInput.value;
        GlobalFilter();
    });

    textInput.addEventListener(`input`, () => {
        GlobalFilter();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartDisplay = document.getElementById("cart-display");
    const closeCart = document.getElementById("close-cart");
    if (closeCart) {
        closeCart.addEventListener("click", () => {
            cartDisplay.style.display = "none";
        });
    }
});