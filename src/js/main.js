document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const body = document.body;
    const html = document.documentElement;

    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    // функция клика вне элемента
    function clickOutside(elem, needToClose) {
        document.addEventListener('click', function (e) {
            if (e.target !== elem && !elem.contains(e.target)) {
                needToClose.classList.remove('active');
            }
        })
    }

    // функция клика вне элемента
    function clickOutsidePopup(elem, needToClose) {
        document.addEventListener('click', function (e) {
            if (e.target !== elem && !elem.contains(e.target)) {
                closePopupElement(needToClose);
            }
        })
    }

    // функция открытия попапа
    function openPopupElement(element) {
        if (window.innerWidth > 768) {
            let scrollWidth = (window.innerWidth - body.clientWidth);
            body.style.paddingRight = `${scrollWidth}px`;
            header.style.paddingRight = `${scrollWidth}px`
        }
        body.classList.add('lock', 'dark');
        html.classList.add('lock');
        element.classList.add('active');
    }

    // функция закрытия попапа
    function closePopupElement(element) {
        body.classList.remove('lock');
        body.classList.remove('dark');
        html.classList.remove('lock');
        element.classList.remove('active');
        if (window.innerWidth > 768) {
            body.style.paddingRight = '0';
            header.style.paddingRight = '0';
        }
    }

    // телефон и поиск в хедере на главной - белые
    let headerSearch = document.querySelector('.header__search');
    let headerPhone = document.querySelector('.header__phone.desktop');

    if (document.querySelector('.main-hero__right-info')) {

        if (window.innerWidth > 768) {
            let mainHeroThumbs = document.querySelector('.main-hero__swiper-thumbs');

            if (window.scrollY >= rem(5)) {
                header.classList.add('scroll');
                headerSearch.classList.remove('white')
                headerPhone.classList.remove('white');
            } else {
                header.classList.remove('scroll');
                headerSearch.classList.add('white')
                headerPhone.classList.add('white');
            }

            window.addEventListener('scroll', function () {
                if (window.scrollY >= rem(5)) {
                    header.classList.add('scroll');
                    headerSearch.classList.remove('white')
                    headerPhone.classList.remove('white');
                } else {
                    header.classList.remove('scroll');
                    headerSearch.classList.add('white')
                    headerPhone.classList.add('white');
                }
            })
        } else {
            // хедер при скролле
            window.addEventListener('scroll', function () {
                if (window.scrollY >= rem(3)) {
                    header.classList.add('scroll');
                } else {
                    header.classList.remove('scroll');
                }
            })
        }

    } else if (window.innerWidth > 768) {
        // хедер при скролле
        window.addEventListener('scroll', function () {
            if (window.scrollY >= rem(5)) {
                header.classList.add('scroll');
            } else {
                header.classList.remove('scroll');
            }
        })
    } else {
        // хедер при скролле
        window.addEventListener('scroll', function () {
            if (window.scrollY >= rem(3)) {
                header.classList.add('scroll');
            } else {
                header.classList.remove('scroll');
            }
        })
    }

    // поиск в хедере 

    const headerSearchOpen = header.querySelector('.header__search');
    const headerSearchContainer = document.querySelector('.header__search-container');
    headerSearchOpen.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
            document.body.classList.toggle('lock');
        }
        headerSearchContainer.classList.add('active');
        clickOutside(header, headerSearchContainer)
    })

    const inputSearch = headerSearchContainer.querySelector('.header__search-form__input');
    const headerSearchDropdown = headerSearchContainer.querySelector('.header__search-dropdown');
    inputSearch.addEventListener('input', function () {
        if (inputSearch.value) {
            headerSearchDropdown.classList.add('active');
        } else {
            headerSearchDropdown.classList.remove('active');
        }
    })
    const inputSearchClose = headerSearchContainer.querySelector('.header__search-form__close');
    inputSearchClose.addEventListener('click', function (e) {
        e.preventDefault();
        inputSearch.value = '';
        headerSearchContainer.classList.remove('active');
    })


    // мобильное меню 

    const burger = header.querySelector('.header__burger');
    const mobileMenu = header.querySelector('.header__menu');
    burger.addEventListener('click', function () {
        document.body.classList.toggle('lock');
        burger.classList.toggle('active');
        header.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    })

    // кнопка в секции Точь в точь на мобилке

    if (document.querySelector('.selection') && window.innerWidth <= 768) {
        let selectionBtns = document.querySelectorAll('.selection__swiper-slide__btn.btn2');
        selectionBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                let cardPopup = btn.parentElement.querySelector('.selection__swiper-slide__card');
                btn.parentElement.classList.add('dark');
                cardPopup.classList.add('active');
                let cardPopupClose = cardPopup.querySelector('.selection__swiper-slide__card-close');
                cardPopupClose.addEventListener('click', function () {
                    cardPopup.classList.remove('active');
                    btn.parentElement.classList.remove('dark');
                })
            })
        })

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
                const path = e.currentTarget.dataset.path;
                document.querySelectorAll(`[data-target]`).forEach(el => el.classList.remove('active'));
                document.querySelectorAll(`[data-target=${path}]`).forEach(el => el.classList.add('active'));
            })
        })
    }

    // карта на странице Контакты
    if (document.querySelector('#map')) {
        if (window.innerWidth > 768) {
            ymaps.ready(init);
            function init() {
                const myMap = new ymaps.Map("map", {
                    center: [56.832639, 60.627433],
                    zoom: 14
                });
                myMap.controls.remove('searchControl');
                const placemark = new ymaps.Placemark([56.827444, 60.655299], {},
                    {
                        iconLayout: 'default#image',
                        iconImageHref: './src/images/svg/placemark.svg',
                        iconImageSize: [rem(6.5), rem(6.5)],
                        iconImageOffset: [rem(0), rem(-6.5)]
                    })

                myMap.geoObjects.add(placemark);
                myMap.behaviors.disable('scrollZoom');
            }
        } else {
            ymaps.ready(init);
            function init() {
                const myMap = new ymaps.Map("map", {
                    center: [56.832639, 60.627433],
                    zoom: 14,
                });

                myMap.controls.remove('searchControl');

                const placemark = new ymaps.Placemark([56.827444, 60.655299], {},
                    {
                        iconLayout: 'default#image',
                        iconImageHref: './src/images/svg/placemark.svg',
                        iconImageSize: [rem(3), rem(3)],
                        iconImageOffset: [rem(0), rem(-3)]
                    })

                myMap.geoObjects.add(placemark);
                myMap.behaviors.disable('scrollZoom');

            }
        }

    }

    // карта на странице Где купить
    if (document.querySelector('#offices')) {

        if (window.innerWidth > 768) {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('offices', {
                    center: [55.430758, 37.546489],
                    zoom: 4,
                    behaviors: ['default', 'scrollZoom']
                });
                clusterer = new ymaps.Clusterer({
                    preset: 'islands#invertedVioletClusterIcons',
                    groupByCoordinates: false,
                    clusterDisableClickZoom: false,
                    clusterIcons: [{
                        href: './src/images/svg/mapClusterer.svg',
                        size: [rem(16), rem(16)],
                        offset: [-rem(8), -rem(8)]
                    }],
                });

                points = [
                    [55.879758, 38.478688],
                    [55.059564, 38.859781],
                    [55.103065, 38.768817],
                    [55.671209, 37.274784],
                    [55.657281, 37.177793],
                    [55.854436, 37.496138],
                    [55.624378, 37.714321],
                    [54.897976, 38.070431],
                    [55.452640, 38.438686],
                    [54.873699, 37.221954],
                    [55.616015, 37.484406],
                    [54.203525, 37.590237],
                    [55.163168, 37.467985],
                    [55.411900, 37.581244]
                ];
                getPointOptions = function () {
                    return {
                        iconLayout: 'default#image',
                        iconImageHref: './src/images/svg/placemark.svg',
                        iconImageSize: [rem(6.5), rem(6.5)],
                        iconImageOffset: [rem(0), rem(-6.5)]
                    };
                };
                geoObjects = [];
                for (var i = 0, len = points.length; i < len; i++) {
                    geoObjects[i] = new ymaps.Placemark(points[i], {}, getPointOptions());
                }

                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);


            });
        } else {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('offices', {
                    center: [55.430758, 37.546489],
                    zoom: 3,
                    behaviors: ['default', 'scrollZoom']
                });
                clusterer = new ymaps.Clusterer({
                    preset: 'islands#invertedVioletClusterIcons',
                    groupByCoordinates: false,
                    clusterDisableClickZoom: false,
                    clusterIcons: [{
                        href: './src/images/svg/mapClusterer.svg',
                        size: [rem(9), rem(9)],
                        offset: [-rem(4.5), -rem(4.5)]
                    }],
                });

                points = [
                    [55.879758, 38.478688],
                    [55.059564, 38.859781],
                    [55.103065, 38.768817],
                    [55.671209, 37.274784],
                    [55.657281, 37.177793],
                    [55.854436, 37.496138],
                    [55.624378, 37.714321],
                    [54.897976, 38.070431],
                    [55.452640, 38.438686],
                    [54.873699, 37.221954],
                    [55.616015, 37.484406],
                    [54.203525, 37.590237],
                    [55.163168, 37.467985],
                    [55.411900, 37.581244]
                ];
                getPointOptions = function () {
                    return {
                        iconLayout: 'default#image',
                        iconImageHref: './src/images/svg/placemark.svg',
                        iconImageSize: [rem(3), rem(3)],
                        iconImageOffset: [rem(0), rem(-3)]
                    };
                };
                geoObjects = [];
                for (var i = 0, len = points.length; i < len; i++) {
                    geoObjects[i] = new ymaps.Placemark(points[i], {}, getPointOptions());
                }

                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);


            });
        }


    }

    // чекбоксы + радио в фильтрах, чтобы сменился фон, при радио кнопке чтобы текст подставлялся 

    if (document.querySelector('.filters-select')) {
        const filterSelects = document.querySelectorAll('.filters-select');
        filterSelects.forEach(select => {

            const filterForm = select.querySelector('.filters__item');
            select.addEventListener('click', function () {

                filterSelects.forEach(item => {
                    if (item !== select) {
                        item.querySelector('.filters__item').classList.remove('active');
                    }
                })
                filterForm.classList.toggle('active');
                clickOutside(select, filterForm);
            })

            const filterLabels = select.querySelectorAll('.filters__item-label');
            filterLabels.forEach(label => {
                const filterInput = label.querySelector('.filters__item-label__input');
                filterInput.addEventListener('change', function (e) {
                    if (e.target.type === 'checkbox') {
                        if (e.target.checked) e.target.parentElement.classList.add('active');
                        else e.target.parentElement.classList.remove('active');
                    } else if (e.target.type === 'radio') {
                        if (e.target.checked) {
                            select.querySelectorAll('.filters__item-label').forEach(label => label.classList.remove('active'));
                            e.target.parentElement.classList.add('active');
                            const radioValue = e.target.value;
                            select.querySelector('.filters-select__title').innerText = radioValue;
                            select.querySelector('.filters__item').classList.remove('active');
                        }
                    }

                })
            })
        })


    }

    // кнопка Развернуть фмльтры в мобилке
    if (document.querySelector('.filters__btn') && window.innerWidth <= 768) {
        const filtersBtns = document.querySelectorAll('.filters__btn');
        filtersBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                btn.classList.toggle('active');
                if (btn.classList.contains('active')) {
                    btn.querySelector('span').innerText = 'Свернуть фильтры'
                } else {
                    btn.querySelector('span').innerText = 'Развернуть фильтры'
                }
                let content = btn.nextElementSibling;
                content.classList.toggle('open');
                if (content.style.maxHeight) {
                    content.style.maxHeight = null
                } else {
                    content.style.maxHeight = content.scrollHeight / 5 + "rem";
                }
            })
        })
    }

    // сортировка 

    if (document.querySelector('.sorting')) {
        const sortingContainer = document.querySelector('.sorting');
        const sortingBtn = document.querySelector('.sorting__btn');
        const sortingForm = document.querySelector('.sorting__form');

        sortingBtn.addEventListener('click', function () {
            sortingForm.classList.toggle('active');
            clickOutside(sortingContainer, sortingForm);
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
                    sortingBtn.innerText = e.target.value.toLowerCase();
                    sortingForm.classList.remove('active');
                }

                else e.target.parentElement.classList.remove('active');
            })
        })
    }

    // выбор цвета двери в карточке на странице Каталог

    if (document.querySelector('.card__color-list__item-btn')) {
        const cardChooseColorBtns = document.querySelectorAll('.card__color-list__item-btn');
        cardChooseColorBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                btn.parentElement.parentElement.parentElement.querySelectorAll('.card__color-list__item').forEach(item => item.classList.remove('active'));
                btn.parentElement.classList.add('active');
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

    // КАРТОЧКИ ДВЕРЕЙ

    // выбор цвета

    if (document.querySelector('.choose-color-btn')) {
        const colorPopup = document.querySelector('.color-popup');
        const chooseColorBtns = document.querySelectorAll('.choose-color-btn');
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
                element.classList.add('active');
            })
        });
    }

    // выбор опций

    if (document.querySelector('.choose-options-btn')) {
        const optionPopup = document.querySelector('.options-popup');
        const chooseOptionsBtns = document.querySelectorAll('.choose-options-btn');
        const closeOptionPopup = optionPopup.querySelector('.popup__close');

        chooseOptionsBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                openPopupElement(optionPopup);
            })
        })

        closeOptionPopup.addEventListener('click', function () {
            closePopupElement(optionPopup);
        })
    }

    // выбор стекла

    if (document.querySelector('.choose-glass-btn')) {
        const glassPopup = document.querySelector('.glass-popup');

        const chooseglassBtns = document.querySelectorAll('.choose-glass-btn');
        chooseglassBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                openPopupElement(glassPopup);
            })
        })

        const glassClose = glassPopup.querySelector('.popup__close');
        glassClose.addEventListener('click', function () {
            closePopupElement(glassPopup);
        })

        const glassCards = glassPopup.querySelectorAll('.glass-popup__list-item');
        glassCards.forEach(element => {
            element.addEventListener('click', function (e) {
                glassCards.forEach(item => item.classList.remove('active'));
                element.classList.add('active');
            })
        });
    }

    if (document.querySelector('.choose-options2-btn')) {
        const optionPopup2 = document.querySelector('.options-popup2');
        const chooseOptions2Btns = document.querySelectorAll('.choose-options2-btn');
        const closeoptionPopup2 = optionPopup2.querySelector('.popup__close');

        chooseOptions2Btns.forEach(btn => {
            btn.addEventListener('click', function () {
                openPopupElement(optionPopup2);
            })
        })

        closeoptionPopup2.addEventListener('click', function () {
            closePopupElement(optionPopup2);
        })
    }

    // выбор ручек

    if (document.querySelector('.choose-accessories-btn')) {
        const accessoriesPopup = document.querySelector('.accessories-popup');

        document.querySelector('.choose-accessories-btn').addEventListener('click', function () {
            openPopupElement(accessoriesPopup);
        })

        const accessoriesClose = accessoriesPopup.querySelector('.popup__close');
        accessoriesClose.addEventListener('click', function () {
            closePopupElement(accessoriesPopup);
        })

        const accessoriesCards = accessoriesPopup.querySelectorAll('.accessories-popup__list-item');
        accessoriesCards.forEach(element => {
            element.addEventListener('click', function () {
                accessoriesCards.forEach(item => item.classList.remove('active'));
                element.classList.add('active');
            })
        });
    }

    // выбор внешней панели

    if (document.querySelector('.choose-panel-btn')) {
        const panelPopup = document.querySelector('.panel-popup');

        document.querySelector('.choose-panel-btn').addEventListener('click', function () {
            openPopupElement(panelPopup)
        })

        const panelClose = panelPopup.querySelector('.popup__close');
        panelClose.addEventListener('click', function () {
            closePopupElement(panelPopup)
        })

        const panelCards = panelPopup.querySelectorAll('.panel-popup__list-item');
        panelCards.forEach(element => {
            element.addEventListener('click', function (e) {
                panelCards.forEach(item => item.classList.remove('active'));
                element.classList.add('active');
            })
        });
    }


    // МОДАЛКИ

    // закрытие модалок

    if (document.querySelector('.pop-up__close')) {
        const closePopupBtns = document.querySelectorAll('.pop-up__close');
        closePopupBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                closePopupElement(btn.parentElement.parentElement);
            })
        })
    }

    // модалка заявки на замер

    if (document.querySelector('.popup-measuring')) {
        let popupMeasuring = document.querySelector('.popup-measuring');
        let measuringBtn = document.querySelector('.header__btn-measurer');
        measuringBtn.addEventListener('click', function () {
            openPopupElement(popupMeasuring);
            clickOutsidePopup(popupMeasuring.querySelector('.pop-up__body'), popupMeasuring)
        })
    }

    if (document.querySelector('.measurement-section__btn')) {
        let popupMeasuring = document.querySelector('.popup-measuring');
        let measuringSectionBtn = document.querySelector('.measurement-section__btn');
        measuringSectionBtn.addEventListener('click', function () {
            openPopupElement(popupMeasuring)
        })
    }

    // модалка способов оплаты

    if (document.querySelector('.popup-payment')) {
        let popupPayment = document.querySelector('.popup-payment');
        let popupBody = popupPayment.querySelector('.pop-up__body');
        let footerPaymentsWays = document.querySelector('.popup-payment-open');
        footerPaymentsWays.addEventListener('click', function () {
            openPopupElement(popupPayment);
        })
    }

    const popupWindows = document.querySelectorAll('.pop-up');
    popupWindows.forEach(popup => {
        let popupBody = popup.querySelector('.pop-up__body');
        popup.addEventListener('click', function (e) {
            if (e.target !== popupBody && !popupBody.contains(e.target)) {
                console.log(e.target)
                closePopupElement(popup);
            }
        })
    })

    const popupWindows2 = document.querySelectorAll('.popup');
    popupWindows2.forEach(popup => {
        let popupBody = popup.querySelector('.popup__body');
        popup.addEventListener('click', function (e) {
            if (e.target !== popupBody && !popupBody.contains(e.target)) {
                console.log(e.target)
                closePopupElement(popup);
            }
        })
    })

    // модалка успешной заявки на замер

    if (document.querySelector('.popup-measuring-success')) {
        let popupSuccessMeasuring = document.querySelector('.popup-measuring-success');
        let successMeasuringBtn = popupSuccessMeasuring.querySelector('.pop-up__btn');
        successMeasuringBtn.addEventListener('click', function () {
            closePopupElement(successMeasuringBtn.parentElement.parentElement)
        })
    }

    // кнопки квиза

    if (document.querySelector('.quiz__list-item')) {
        const quizItems = document.querySelectorAll('.quiz__list-item');
        quizItems.forEach(item => {
            item.addEventListener('click', function () {
                quizItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            })
        })
    }
})