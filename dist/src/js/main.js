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

    if (document.querySelector('.filters')) {
        const filters = document.querySelector('.filters');
        const filtersBtns = filters.querySelectorAll('.filters__btn')
        filtersBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                filtersBtns.forEach(el => {
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


})