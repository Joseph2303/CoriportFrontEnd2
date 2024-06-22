const navBar = document.querySelector("nav"),
    menuBtns = document.querySelectorAll(".menu-icon"),
    overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
    });
});


document.addEventListener("click", (event) => {
    const isClickInsideNav = navBar.contains(event.target);
    if (!isClickInsideNav) {
        navBar.classList.remove("open");
    }
});

window.addEventListener('load', function() {
    var preloader = document.querySelector('.preloader');

    preloader.classList.add('hide');

    setTimeout(function() {
        preloader.style.display = 'none';
    }, 600);
});


  