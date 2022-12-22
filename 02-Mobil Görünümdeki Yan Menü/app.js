const nav = document.querySelector(".nav__links");
const hamburger = document.querySelector(".hamburger");
const icon = document.querySelector(".bx-menu");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("show")
    if(nav.classList.contains("show"))
        icon.style = `color: white`
    else
        icon.style = `color: black`
    
})
