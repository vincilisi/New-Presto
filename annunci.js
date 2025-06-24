let navbar = document.querySelector("#navbar");
let katana = document.querySelector(`#katana`);
let chek = false

window.addEventListener(`scroll`, ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.classList.remove(`bg-cadet`);
        navbar.classList.add(`bg-peach`);
    }else{
        navbar.classList.remove(`bg-peach`);
        navbar.classList.add(`bg-cadet`)
    }
} );

katana.addEventListener(`click`, ()=>{
    if(chek == false){
        katana.style.transform = (`rotate(-90deg)`)
        chek = true
    }else{
        katana.style.transform = (`rotate(0deg)`)
        chek = false
    }
})






















const files = ['katana.json', 'kimono.json', 'libro.json', 'servizio-da-sushi.json', 'servizio-da-te.json'];
let allData = [];

Promise.all(
  files.map(file => fetch(`./json/${file}`).then(res => res.json()))
).then(results => {
    allData = results.flat();
    allData.sort((a,b) => a.prezzo - b.prezzo);

    let radiowrapper = document.querySelector(`#radiowrapper`);
    let cardwrapper = document.querySelector(`#cardwrapper`);

    function radiocreate(){
        let categoris = allData.map((annuncio)=>annuncio.categoria);
        let uniqueCategories = Array.from(new Set(categoris));
        uniqueCategories.forEach((categoria)=>{
            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML =`
            <input class="form-check-input" type="radio" name="categoris" id="${categoria}">
            <label class="form-check-label" for="${categoria}">
                ${categoria}
            </label>
            `;
            radiowrapper.appendChild(div)
        })
    }

    function showcards(array){
        cardwrapper.innerHTML = "";
        array.forEach((annuncio) =>{
            let div = document.createElement(`div`);
            div.classList.add(`card-custom`);
            div.innerHTML=`
            <img src="${annuncio.immagine}" alt="">
            <h4>${annuncio.nome}</h4>
            <p class="lead">${annuncio.categoria}</p>
            <p class="lead">${annuncio.descrizione}</p>
            <p class="lead">${annuncio.prezzo}€</p>`;
            cardwrapper.appendChild(div)
        });
    }

    function FilterByCategory(cat){
        if(cat != `All`){
        let filtered = allData.filter((annuncio) => annuncio.categoria == cat)
        showcards(filtered);
    }else{
        showcards(allData);
    }
}

    radiocreate();
    showcards(allData);

    let radiobuttons = document.querySelectorAll(`.form-check-input`);
    radiobuttons.forEach((button)=>{
        button.addEventListener(`click`, ()=>{
            FilterByCategory(button.id)
        })
    });


    let priceInput = document.querySelector(`#priceInput`);
    let priceValue = document.querySelector(`#priceValue`);

    function SetRanger(){

    let price = allData.map((annuncio)=>annuncio.prezzo);
    price.sort((a,b)=>a - b); 
    let maxPrice =Math.ceil( price.pop());
    priceInput.max = maxPrice;
    priceInput.value = maxPrice;
    priceValue.innerHTML = maxPrice;
    }

    SetRanger();

    function FilterByPrice(){
        let filtered = allData.filter((annuncio) => annuncio.prezzo <= priceInput.value);
        showcards(filtered)
        
    }
    priceInput.addEventListener(`input`, ()=>{
        priceValue.innerHTML = priceInput.value
        FilterByPrice();
    });


    let textInput = document.querySelector(`#textInput`);
    function FilterByWord(parola){
    let filtered = allData.filter((annuncio) =>
        annuncio.nome.toLowerCase().includes(parola.toLowerCase())
    );
    showcards(filtered);
}

textInput.addEventListener(`input`, ()=>{
    FilterByWord(textInput.value)
});

});



