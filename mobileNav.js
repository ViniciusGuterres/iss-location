// when click on the burgue icon, show the mobile nav
let burgue = document. querySelector('.burgue-nav');
let mobileNav = document.querySelector('.mobile-nav');
let valid = true;

burgue.addEventListener("click", () => {

    mobileNav.style.display = valid ? "block" : "none";
    valid = !valid;

});