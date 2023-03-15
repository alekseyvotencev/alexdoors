document.addEventListener('DOMContentLoaded', function () {

    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    const getThreeDigitNumber = function (number) {
        if (number < 10) return String('00' + number)
        else if (number > 10 && number < 100) return String('0' + number)
        else return String(number)
    }

    const getTwoDigitNumber = function (number) {
        if (number < 10) return String('0' + number)
        else if (number > 10 && number < 100) return String('0' + number)
        else return String(number)
    }

    // ГЛАВНАЯ

    const mainHeroSwiperThumbs = new Swiper('.main-hero__swiper-thumbs', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        loop: true,
        navigation: {
            nextEl: '.main-hero__swiper__next',
            prevEl: '.main-hero__swiper__prev',
        },
        pagination: {
            el: '.main-hero__swiper-thumbs__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getThreeDigitNumber(index + 1)}</span>`;
            }
        },
    })

    const mainHeroSwiper = new Swiper('.main-hero__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        loop: true,
        pagination: {
            el: '.main-hero__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getThreeDigitNumber(index + 1)}</span>`;
            }
        },
        navigation: {
            nextEl: '.main-hero__swiper__next',
            prevEl: '.main-hero__swiper__prev',
        },
        thumbs: {
            swiper: mainHeroSwiperThumbs
        },
    })

    if (document.querySelector('.main-category__swiper')) {
        document.querySelectorAll('.main-category__swiper').forEach(element => {
            const mainHeroSwiper = new Swiper(element, {
                slidesPerView: 'auto',
                spaceBetween: rem(4),
                pagination: {
                    el: element.querySelector('.main-category__swiper__pagination'),
                    renderBullet: function (index, className) {
                        return `<span class="${className}">${getTwoDigitNumber(index + 1)}</span>`;
                    }
                },
                navigation: {
                    nextEl: element.querySelector('.main-category__swiper__next'),
                    prevEl: element.querySelector('.main-category__swiper__prev'),
                },
            })
        });
    }


    const mainSelectionSwiper = new Swiper('.main-selection__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        loop: true,
        pagination: {
            el: '.main-selection__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getThreeDigitNumber(index + 1)}</span>`;
            }
        },
        navigation: {
            nextEl: '.main-selection__swiper__next',
            prevEl: '.main-selection__swiper__prev',
        },
    })

    const mainReviewsSwiper = new Swiper('.reviews-section__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(4),
        loop: true,
        pagination: {
            el: '.reviews-section__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getTwoDigitNumber(index + 1)}</span>`;
            }
        },
        navigation: {
            nextEl: '.reviews-section__swiper__next',
            prevEl: '.reviews-section__swiper__prev',
        },
    })

    const mainAdvantagesSwiper = new Swiper('.main-advantages__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        pagination: {
            el: '.main-advantages__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getTwoDigitNumber(index + 1)}</span>`;
            }
        },
    })

    // КАТАЛОГ

    const catalogHeroSwiper = new Swiper('.catalog-hero__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        loop: true,
        pagination: {
            el: '.catalog-hero__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getThreeDigitNumber(index + 1)}</span>`;
            }
        },
        navigation: {
            nextEl: '.catalog-hero__swiper__next',
            prevEl: '.catalog-hero__swiper__prev',
        },
    })
})