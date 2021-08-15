import Swiper from 'swiper/bundle';

// const shipSlider = document.getElementById('shipSlider')
// new Swiper(shipSlider, {
// If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//     },

// Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// });



new Swiper('.shipSlider', {
    loop: true,
    slidesPerView: 1,
    preloadImages: false,
    lazy: {
        loadOnTransitionStart: false,
        loadPrevNext: true
    },

    // Включать если slides per view больше 1
    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,


    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
        // type: 'progressbar'
    },


    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    grabCursor: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
    },

    thumbs: {
        swiper: {
            el: '.shipSlider-mini',
            slidesPerView: 12,
            breakpoints: {
                320: {
                    slidesPerView: 4,
                },
                480: {
                    slidesPerView: 5,
                },
                990: {
                    slidesPerView: 6,
                },
                1100: {
                    slidesPerView: 7,
                },
                1280: {
                    slidesPerView: 8,
                }
            },
        },

    },





    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});
