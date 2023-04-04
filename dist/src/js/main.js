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

    if (document.querySelector('.canvas-popup')) {
        canvasPopup = document.querySelector('.canvas-popup');
        document.querySelectorAll('.interior__card-left__options-item').forEach(item => {
            item.addEventListener('click', function () {
                document.body.classList.add('lock');
                canvasPopup.classList.add('active');
            })
        })

        const canvasClose = canvasPopup.querySelector('.popup__close');
        canvasClose.addEventListener('click', function () {
            document.body.classList.remove('lock');
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


})