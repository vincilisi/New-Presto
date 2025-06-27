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



window.addEventListener('load', () => {
    const footer = document.getElementById('footer');
    setTimeout(() => {
      footer.classList.add('show');
    }, 400); // leggera attesa per effetto elegante
  });














const opener = document.querySelector('.opener');
const circle = document.querySelector(`.circle`);

let lavoratori = [
    {
        nome : `Vincenzo`,
        description : `Un samurai meticoloso e preciso. Supervisiona ogni pacco in uscita come se fosse una katana da affilare. È il guardiano dell'efficienza: nulla lascia il magazzino senza il suo sigillo. Affidabile e silenzioso, è il cuore dell'organizzazione.`,
        role : `Coordina spedizioni e magazzino`,
        image : "./media/Vincenzo.png"

    },

    {
        nome : `Katerina`,
        description : `Guerriera dal sorriso rassicurante ma pronta all’azione quando serve. Ascolta i clienti con attenzione e risolve i problemi con la precisione di un colpo ben assestato. La sua arma? La diplomazia e un tono sempre impeccabile.`,
        image : "./media/Katerina.png"
    },

    {
        nome : `Fatima`,
        description : `TTranquilla ma potente, crea contenuti visivi che colpiscono nel segno. Ogni banner, immagine o post sui social è una lama lucida che parla del tuo marchio. Si muove tra estetica e strategia con grazia.`,
        role : `Branding, grafica e comunicazione visiva`,
        image : "./media/Fatima.png"
    },

    {
        nome : `Luca`,
        description : `Un samurai taciturno che parla il linguaggio del codice. È lui che tiene in piedi la struttura invisibile dell’e-commerce: server, plugin, checkout. Se c’è un bug, lui lo elimina all’istante. Sguardo deciso, mente affilata.`,
        role : ` Gestione sito, backend e automazioni`,
        image : "./media/Luca.png"
    }
];

lavoratori.forEach((lavoratore)=>{
    let div = document.createElement(`div`);
    div.classList.add(`moved`);
    div.style.backgroundImage = `url(${lavoratore.image})`
    circle.appendChild(div);
})

const movedAll = document.querySelectorAll('.moved');
let check = false;

opener.addEventListener('click', () => {
    check = !check;
    opener.style.transform = check ? 'rotate(45deg)' : 'rotate(0deg)';
    let distance = window.innerWidth <= 600 ? 55 : 150;
    movedAll.forEach((moved, i) => {
        if (check) {
            const angle = (360 * i) / movedAll.length;
            moved.style.transform = `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`;
        } else {
            moved.style.transform = 'rotate(0deg) translate(0px)';
        }
    });
    if (!check) {
        cardWrapper.innerHTML = '';
    }
});


const cardWrapper = document.querySelector(`.cardWrapper`)
movedAll.forEach((moved, idx) => {
    moved.addEventListener('click', () => {
        cardWrapper.innerHTML = '';
        const lavoratore = lavoratori[idx];

       let card = document.createElement('div');
card.classList.add('card-flip');

let inner = document.createElement('div');
inner.classList.add('card-flip-inner');

let front = document.createElement('div');
front.classList.add('card-front');
front.style.backgroundImage = `url(${lavoratore.image})`;

let back = document.createElement('div');
back.classList.add('card-back');
back.innerHTML = `
    <h2>${lavoratore.nome}</h2>
    <h3>${lavoratore.role || ''}</h3>
    <p>${lavoratore.description}</p>
`;

inner.appendChild(front);
inner.appendChild(back);
card.appendChild(inner);
cardWrapper.appendChild(card);

// Flip avanti/indietro
let flipped = false;
card.addEventListener('click', (e) => {
    e.stopPropagation();
    flipped = !flipped;
    card.classList.toggle('flipped', flipped);
});
    });
});
