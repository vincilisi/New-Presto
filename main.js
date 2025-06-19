let navbar = document.querySelector("#navbar");

window.addEventListener(`scroll`, ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.classList.remove(`bg-cadet`);
        navbar.classList.add(`bg-yankees-blue`);
    }else{
        navbar.classList.remove(`bg-yankees-blue`);
        navbar.classList.add(`bg-cadet`)
    }
} )
