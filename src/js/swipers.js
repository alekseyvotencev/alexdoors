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
        pagination: {
            clickable: true,
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
        }
    })
    mainHeroSwiper.controller.control = mainHeroSwiperThumbs;
    mainHeroSwiperThumbs.controller.control = mainHeroSwiper;


    if (document.querySelector('.door-category__swiper')) {
        document.querySelectorAll('.door-category__swiper').forEach(element => {
            const doorHeroSwiper = new Swiper(element, {
                slidesPerView: 'auto',
                spaceBetween: rem(4),
                loop: true,
                pagination: {
                    clickable: true,
                    el: element.querySelector('.door-category__swiper__pagination'),
                    renderBullet: function (index, className) {
                        return `<span class="${className}">${getTwoDigitNumber(index + 1)}</span>`;
                    }
                },
                navigation: {
                    nextEl: element.querySelector('.door-category__swiper__next'),
                    prevEl: element.querySelector('.door-category__swiper__prev'),
                },
            })
        });
    }

    const mainSelectionSwiper = new Swiper('.selection__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        loop: true,
        pagination: {
            clickable: true,
            el: '.selection__swiper__pagination',
            renderBullet: function (index, className) {
                return `<span class="${className}">${getThreeDigitNumber(index + 1)}</span>`;
            }
        },
        navigation: {
            nextEl: '.selection__swiper__next',
            prevEl: '.selection__swiper__prev',
        },
    })

    const mainReviewsSwiper = new Swiper('.reviews-section__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(4),
        loop: true,
        pagination: {
            clickable: true,
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
            clickable: true,
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
            clickable: true,
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

    // Карточка товара (аксессуары) 

    const accessoryPageSwiper = new Swiper('.accessory-page__content-left .swiper-container', {
        loop: true,
        pagination: {
            clickable: true,
            el: '.accessory-page__content-left .pagination',
        },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: rem(4),
                allowTouchMove: false
            },
            320: {
                slidesPerView: 1,
                spaceBetween: rem(4),
                allowTouchMove: true
            }
        }
    })
})