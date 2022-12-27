if (window.pageYOffset > document.querySelector('#top').offsetTop) {
    document.querySelector('.scroll_arrow').classList.add('fadein');
    document.querySelector('.scroll_arrow').classList.remove('fadeout');
} else {
    document.querySelector('.scroll_arrow').classList.add('fadeout');
    document.querySelector('.scroll_arrow').classList.remove('fadein');
}

window.onscroll = function () {
    if (window.pageYOffset > document.querySelector('#top').offsetTop) {
        document.querySelector('.scroll_arrow').classList.add('fadein');
        document.querySelector('.scroll_arrow').classList.remove('fadeout');
    } else {
        document.querySelector('.scroll_arrow').classList.add('fadeout');
        document.querySelector('.scroll_arrow').classList.remove('fadein');
    }
}

document.querySelector('.scroll_arrow').addEventListener('click', (e) => {
    window.scrollTo(0, 0);
});