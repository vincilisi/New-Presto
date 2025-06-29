document.addEventListener("DOMContentLoaded", () => {
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

let first = document.querySelector(`#first-number`);
let second = document.querySelector(`#second-number`);
let third = document.querySelector(`#third-number`);
let numberh3 = document.querySelector(`#numerih3`);

let conferm = true;

function creatInterval(n, item, time){
    let counter = 0;

    let interval = setInterval(()=>{
        if(counter < n){
        counter++
        item.innerHTML   = counter;
    }else{
        clearInterval(interval)
    }
    }, time)

    setTimeout(()=>{
        conferm = true;
    }, 8800);

}

let observer = new IntersectionObserver( (entries)=>{

    entries.forEach( (entry)=>{

        if(entry.isIntersecting && conferm){
            creatInterval(100, first, 100);
            creatInterval(200, second, 50);
            creatInterval(300, third, 25);
            conferm = false;
        }

    })

} );

observer.observe(numberh3);


let reviws =[
    {
        user: `Davide G`,
        description: `Un angolo di Giappone nel cuore della città! Ho trovato snack introvabili, washi tape adorabili e una selezione di tè verde incredibile. Personale gentilissimo. Tornerò sicuramente!`,
        rank: 5
    },
    {
        user: `Martina R.`,
        description: `Ampia scelta di gadget anime e ramen istantanei. Prezzi un po' alti, ma l’atmosfera è super autentica. Mi sembrava di passeggiare ad Akihabara!`,
        rank: 4
    },
    {
        user: `Luca M`,
        description: `Purtroppo deluso. Mi aspettavo più varietà e autenticità. Alcuni prodotti sembravano made in China più che made in Japan. Punti bonus per il design del negozio.`,
        rank: 2
    },
    {
        user: `Elena T`,
        description: `Prodotti interessanti, soprattutto l’angolo dedicato all’artigianato giapponese. Però il sito è un po’ caotico e ho avuto problemi con una spedizione.`,
        rank: 3
    },
    
]

let swiperWrapper = document.querySelector(`.swiper-wrapper`);

reviws.forEach((recensione)=>{
    let div = document.createElement(`div`);
    div.classList.add(`swiper-slide`);
    div.innerHTML = `
    <div class = "card">
    <p class="lead text-center">${recensione.description}</p>
        <h4 class="text-center">${recensione.user}</h4>
        <div class="d-flex justify-content-center star">
        </div>
        </div>`;
        swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll(`.star`);

stars.forEach((star, index)=>{

    for(let i = 1; i < reviws[index].rank; i++){
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-solid`,  `fa-star`);
        star.appendChild(icon)
    }
    
    let difference = 5 - reviws[index].rank;

     for(let i = 1; i <difference; i++){
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-regular`,  `fa-star`);
        star.appendChild(icon)
    }
});
});