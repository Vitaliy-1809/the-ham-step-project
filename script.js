// Tabs - Our Services section & Our Amazing Work section

let tabs = document.querySelectorAll('.tab-container');

tabs.forEach((tab) => {

    tab.addEventListener('click', (event) => {
        if (!event.target.closest('.js-tab-trigger')) return;

        let activeTab = tab.querySelector('.js-tab-trigger.active');
        activeTab.classList.remove('active');
        event.target.classList.add('active');

        let id = event.target.getAttribute('data-tab');
        let contentToShow = tab.querySelectorAll('.js-tab-content');

        if (id) {
            let contentToHide = contentToShow;
            contentToShow = tab.querySelectorAll(`.js-tab-content[data-tab="${id}"]`);

            contentToHide.forEach((el) => {
                el.classList.add('hidden');
            });
        }

        contentToShow.forEach((el) => {
            el.classList.remove('hidden');
        });

        if (tab.classList.contains('tab-images')) {
            let button = tab.querySelector('.load-more-btn');

            if (contentToShow.length <= 12) {
                button.classList.add('hidden');
            } else {
                button.classList.remove('hidden');
                tabImagesHide(tab);
            }
        }
    });

    if (tab.classList.contains('tab-images')) {

        tabImagesHide(tab);

        let button = tab.querySelector('.load-more-btn');
        button.addEventListener('click', () => {
            let id = tab.querySelector('.js-tab-trigger.active').getAttribute('data-tab');
            let contentToShow;

            if (id) {
                contentToShow = tab.querySelectorAll(`.js-tab-content[data-tab="${id}"].hidden`);
            } else {
                contentToShow = tab.querySelectorAll('.js-tab-content.hidden');
            }

            // Loader

            let loader = tab.querySelector('.loader');
            loader.classList.remove('hidden');
            button.classList.add('hidden');

            setTimeout(() => {
                loader.classList.add('hidden');
                button.classList.remove('hidden');

                contentToShow.forEach((el, i) => {
                    if (i < 12) {
                        el.classList.remove('hidden');
                    }
                });

                if (contentToShow.length <= 12) {
                    button.classList.add('hidden');
                }

            }, 2000);

        });

    }

});

function tabImagesHide(tab) {
    let images = tab.querySelectorAll('.js-tab-content:not(.hidden)');

    images.forEach((el, i) => {
        if (i >= 12) {
            el.classList.add('hidden');
        }
    });
}


// Swiper (carousel) - What People Say About theHam

let slidesCount = document.querySelectorAll('.gallery-thumbs .swiper-slide').length;

let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: slidesCount > 4 * 2,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

let galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs,
    },
});


// Masonry - Gallery of best images

window.onload = () => {
    function updateMasonry() {
        let grid = document.querySelector('.masonry-block');

        let msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            gutter: 20,
            columnWidth: 370,
            percentPosition: true
        });
    }

    function galleryImagesHide(grid) {
        let galleryImages = grid.querySelectorAll('.grid-item:not(.hidden)');

        galleryImages.forEach((el, i) => {
            if (i >= 8) {
                el.classList.add('hidden');
            }
        });
    }

    let grids = document.querySelectorAll('.masonry-container');

    grids.forEach((grid) => {

        galleryImagesHide(grid);

        updateMasonry(grid);

        let button = grid.querySelector('.load-more-btn');

        button.addEventListener('click', () => {
            let contentToShow = grid.querySelectorAll('.grid-item');

            // Loader

            let loader = grid.querySelector('.loader');
            loader.classList.remove('hidden');
            button.classList.add('hidden');

            setTimeout(() => {
                loader.classList.add('hidden');

                contentToShow.forEach((el) => {
                    el.classList.remove('hidden');
                });

                updateMasonry(grid);
            }, 2000);

        });

    });
}