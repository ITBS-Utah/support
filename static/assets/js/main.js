if (window.scrollY) {
    document.querySelector('.scroll_arrow').classList.add('fadein');
    document.querySelector('.scroll_arrow').classList.remove('fadeout');
} else {
    document.querySelector('.scroll_arrow').classList.add('fadeout');
    document.querySelector('.scroll_arrow').classList.remove('fadein');
}

window.onscroll = function () {
    if (window.scrollY) {
        document.querySelector('.scroll_arrow').classList.add('fadein');
        document.querySelector('.scroll_arrow').classList.remove('fadeout');
    } else {
        document.querySelector('.scroll_arrow').classList.add('fadeout');
        document.querySelector('.scroll_arrow').classList.remove('fadein');
    }
}

document.querySelector('.scroll_arrow').addEventListener('click', (e) => {
    window.scroll(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });