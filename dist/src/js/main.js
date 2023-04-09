document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');

    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    // телефон и поиск в хедере на главной - белые

    if (document.querySelector('.main-hero__right-info')) {

        if (window.innerWidth > 768) {
            document.querySelectorAll('.header__search svg path').forEach(element => {
                element.style.stroke = '#FFFFFF';
            })
        }

        document.querySelector('.header__phone.desktop').style.color = '#FFFFFF';
    }

    if (document.querySelector('.categories')) {
        const categories = document.querySelector('.categories');
        const categoriesBtns = categories.querySelectorAll('.categories__btn')
        categoriesBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                categoriesBtns.forEach(el => {
                    el.classList.remove('active');
                })
                e.currentTarget.classList.add('active');
            })
        })
    }

    if (document.querySelector('#map')) {
        ymaps.ready(init);
        function init() {
            const myMap = new ymaps.Map("map", {
                center: [56.832639, 60.627433],
                zoom: 14
            });

            const placemark = new ymaps.Placemark([56.827444, 60.655299], {},
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/src/images/svg/placemark.svg',
                    iconImageSize: [rem(6.5), rem(6.5)],
                    iconImageOffset: [rem(0), rem(-6.5)]
                })

            myMap.geoObjects.add(placemark);
            myMap.behaviors.disable('scrollZoom');

        }
    }

    // чекбоксы в фильтрах, чтобы сменился фон

    if (document.querySelector('.filters')) {
        const filterSelects = document.querySelectorAll('.filters-select');
        filterSelects.forEach(select => {
            const filterForm = select.querySelector('.filters__item');
            select.addEventListener('click', function () {
                filterForm.classList.toggle('active');
                // НАДО ЗАКРЫТЬ ВСЕ ОСТАЛЬНЫЕ
            })
        })

        const filterLabels = document.querySelectorAll('.filters__item-label');
        filterLabels.forEach(label => {
            const filterInput = label.querySelector('.filters__item-label__input');
            filterInput.addEventListener('change', function (e) {
                if (e.target.checked) e.target.parentElement.classList.add('active');
                else e.target.parentElement.classList.remove('active');
            })
        })
    }


    // сортировка 

    if (document.querySelector('.sorting')) {
        const sortingInput = document.querySelector('.sorting__input');
        const sortingForm = document.querySelector('.sorting__form');

        sortingInput.size = sortingInput.value.length;

        sortingInput.addEventListener('input', function () {
            sortingInput.size = sortingInput.value.length;
        })

        sortingInput.addEventListener('click', function () {
            sortingForm.classList.toggle('active');
        })

        const sortingLabels = document.querySelectorAll('.sorting__form-label');

        sortingLabels.forEach(label => {

            const sortingLabelInput = label.querySelector('.sorting__form-label__input');

            sortingLabelInput.addEventListener('change', function (e) {
                sortingLabels.forEach(el => {
                    el.classList.remove('active');
                })

                if (e.target.checked) {
                    e.target.parentElement.classList.add('active');
                    sortingInput.value = e.target.value.toLowerCase();
                    sortingInput.size = sortingInput.value.length;
                    sortingForm.classList.remove('active');
                }
                else e.target.parentElement.classList.remove('active');
            })
        })
    }

    // переворачивание фоток дверей

    if (document.querySelector('.flip-btn')) {
        const flipBtns = document.querySelectorAll('.flip-btn');
        const flipImg = document.querySelector('.flip-img');
        const flipText = document.querySelector('.flip-text');
        flipBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                flipImg.classList.toggle('flip');
                flipText.classList.toggle('flip');
            })
        })
    }





    // ОТЗЫВЫ

    // сворачивание/разворачивание отзыва

    if (document.querySelector('.reviews__item')) {
        const reviewsArr = document.querySelectorAll('.reviews__item');
        reviewsArr.forEach(item => {
            const reviewText = item.querySelector('.reviews__item-description');
            const showMoreBtn = item.querySelector('.reviews__item-btn');
            const reviewOriginalText = item.querySelector('.reviews__item-description').innerText;
            if (reviewOriginalText.length > 209) {

                reviewText.innerHTML = reviewOriginalText.substring(0, 209) + '&#8230;';
                showMoreBtn.classList.add('active');

                showMoreBtn.addEventListener('click', function (e) {
                    switch (reviewText.innerHTML.slice(-1)) {

                        case '…': {
                            reviewText.innerHTML = reviewOriginalText;
                            e.target.innerText = 'Свернуть';
                            break;
                        }

                        default: {
                            reviewText.innerHTML = reviewOriginalText.substring(0, 209) + '&#8230;';
                            e.target.innerText = 'Читать подробнее';
                            break;
                        }
                    }

                })
            }
        })
    }


    // КАРТОЧКА МЕЖКОМНАТНОЙ ДВЕРИ

    // выбор полотна и тд

    if (document.querySelector('.canvas-popup')) {
        const canvasPopup = document.querySelector('.canvas-popup');
        document.querySelector('.interior__card-left__options-item.canvas').addEventListener('click', function () {
            let scrollWidth = (window.innerWidth - document.body.clientWidth);
            header.style.paddingRight = `${scrollWidth}px`
            document.body.style.paddingRight = `${scrollWidth}px`;
            document.body.classList.add('lock', 'dark');
            canvasPopup.classList.add('active');
        })

        const canvasClose = canvasPopup.querySelector('.popup__close');
        canvasClose.addEventListener('click', function () {
            header.style.paddingRight = `0`
            document.body.style.paddingRight = `0`;
            document.body.classList.remove('lock', 'dark');
            canvasPopup.classList.remove('active');
        })

        const popupSelects = canvasPopup.querySelector('.popup-select');
        popupSelects.addEventListener('click', function () {
            const popupFilterItem = popupSelects.querySelector('.filters__item');
            popupFilterItem.classList.toggle('active');

            if (popupFilterItem.querySelector('.filters__item-label__input').checked) {
                popupFilterItem.querySelector('.filters__item-label__input').parentElement.classList.add('active');
            } else popupFilterItem.querySelector('.filters__item-label__input').parentElement.classList.remove('active');
        })


    }

    // выбор ручек

    if (document.querySelector('.options-popup')) {
        const optionsPopup = document.querySelector('.options-popup');

        document.querySelector('.interior__card-left__options-item.options').addEventListener('click', function () {
            let scrollWidth = (window.innerWidth - document.body.clientWidth);
            header.style.paddingRight = `${scrollWidth}px`
            document.body.style.paddingRight = `${scrollWidth}px`;
            document.body.classList.add('lock', 'dark');
            optionsPopup.classList.add('active');
        })

        const optionsClose = optionsPopup.querySelector('.popup__close');
        optionsClose.addEventListener('click', function () {
            header.style.paddingRight = `0`
            document.body.style.paddingRight = `0`;
            document.body.classList.remove('lock', 'dark');
            optionsPopup.classList.remove('active');
        })

        const optionsCards = optionsPopup.querySelectorAll('.options-popup__list-item');
        optionsCards.forEach(element => {
            element.addEventListener('click', function (e) {
                optionsCards.forEach(item => item.classList.remove('active'));
                if (e.target !== element.querySelector('.card-btn')) {
                    element.classList.add('active');
                }
            })
        });
    }

    // выбор внешней панели

    if (document.querySelector('.panel-popup')) {
        const panelPopup = document.querySelector('.panel-popup');

        document.querySelector('.interior__card-left__options-item.panel').addEventListener('click', function () {
            let scrollWidth = (window.innerWidth - document.body.clientWidth);
            header.style.paddingRight = `${scrollWidth}px`
            document.body.style.paddingRight = `${scrollWidth}px`;
            document.body.classList.add('lock', 'dark');
            panelPopup.classList.add('active');
        })

        const panelClose = panelPopup.querySelector('.popup__close');
        panelClose.addEventListener('click', function () {
            header.style.paddingRight = `0`
            document.body.style.paddingRight = `0`;
            document.body.classList.remove('lock', 'dark');
            panelPopup.classList.remove('active');
        })

        const panelCards = panelPopup.querySelectorAll('.panel-popup__list-item');
        panelCards.forEach(element => {
            element.addEventListener('click', function (e) {
                panelCards.forEach(item => item.classList.remove('active'));
                if (e.target !== element.querySelector('.card-btn')) {
                    element.classList.add('active');
                }
            })
        });
    }

    // выбор цвета

    if (document.querySelector('.color-popup')) {
        const colorPopup = document.querySelector('.color-popup');

        const chooseColorBtns = document.querySelectorAll('.interior__card-left__options-color-list-item > button');
        chooseColorBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                let scrollWidth = (window.innerWidth - document.body.clientWidth);
                header.style.paddingRight = `${scrollWidth}px`
                document.body.style.paddingRight = `${scrollWidth}px`;
                document.body.classList.add('lock', 'dark');
                colorPopup.classList.add('active');
            })
        })

        const colorClose = colorPopup.querySelector('.popup__close');
        colorClose.addEventListener('click', function () {
            header.style.paddingRight = `0`
            document.body.style.paddingRight = `0`;
            document.body.classList.remove('lock', 'dark');
            colorPopup.classList.remove('active');
        })

        const colorCards = colorPopup.querySelectorAll('.color-popup__list-item');
        colorCards.forEach(element => {
            element.addEventListener('click', function (e) {
                colorCards.forEach(item => item.classList.remove('active'));
                if (e.target !== element.querySelector('.card-btn')) {
                    element.classList.add('active');
                }
            })
        });
    }

    // выбор стекла


    if (document.querySelector('.glass-popup')) {
        const glassPopup = document.querySelector('.glass-popup');

        const chooseglassBtns = document.querySelectorAll('.interior__card-left__options-glass-list-item > button');
        chooseglassBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                let scrollWidth = (window.innerWidth - document.body.clientWidth);
                header.style.paddingRight = `${scrollWidth}px`
                document.body.style.paddingRight = `${scrollWidth}px`;
                document.body.classList.add('lock', 'dark');
                glassPopup.classList.add('active');
            })
        })

        const glassClose = glassPopup.querySelector('.popup__close');
        glassClose.addEventListener('click', function () {
            header.style.paddingRight = `0`
            document.body.style.paddingRight = `0`;
            document.body.classList.remove('lock', 'dark');
            glassPopup.classList.remove('active');
        })

        const glassCards = glassPopup.querySelectorAll('.glass-popup__list-item');
        glassCards.forEach(element => {
            element.addEventListener('click', function (e) {
                glassCards.forEach(item => item.classList.remove('active'));
                if (e.target !== element.querySelector('.card-btn')) {
                    element.classList.add('active');
                }
            })
        });
    }
})