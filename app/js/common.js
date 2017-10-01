$(function() {

    //smooth scroll
    $('#navbar a[href*="#"]')
    // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top-60
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
    });

	// Custom JS
    //top slider
    $('.main-slider, .review__slider, .numbers__slider').owlCarousel({
        items: 1,
        responsive: false,
        navigation: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navigationText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>']
    });

    $('.rewards__slider').owlCarousel({
        items: 4,
        responsive: false,
        navigation: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navigationText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>']
    });


    //numbers-slider
    function sliderResize(){
      var item = $('.number-slider__list .owl-item.active'),
          parent = item.parent(),
          siblings = parent.children('.owl-item');
      for (var i = 0; i < siblings.length; i++) {
          siblings.removeClass('next center prev');
      }
      item.addClass('center');
      item.next().addClass('next');
      item.prev().addClass('prev');
    };

    $('.number-slider__list').owlCarousel({
        items: 1,
        addClassActive: true,
        afterAction: sliderResize,
        stagePadding: 50,
        responsive: false,
        navigation: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navigationText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>']
    });



    //tabs
    $('.tab-button').on('click', function (e) {
        var $this = $(this),
            container = $this.closest('.tabs'),
            items = container.find('.tab-button'),
            contentItems = container.find('.tabs-content__item'),
            section = $this.closest('.section'),
            tab_id = $this.attr('data-tab'),
            innerTab = container.find('.inner-tabs');
        e.preventDefault();
        items.removeClass('active');
        contentItems.removeClass('active').css({
            display: 'none'
        });
        $this.addClass('active');
        container.find(".tabs-content__item[data-tab="+ tab_id +"]").fadeIn("slow").addClass('active');
        if (innerTab.length > 0) {
            innerTab.find('.tab-button').first().addClass('active');
            innerTab.find('.tabs-content__item').first().addClass('active');
        }
    });
    $('.apartment-tabs__pane-list').owlCarousel({
        responsive: false,
        items: 7,
        loop: false,
        navigation: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navigationText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>']
    });
    $('.tab-control').on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            container = $this.closest('.apartment-tabs__content'),
            items = container.find('.tabs-content__item'),
            activeTab = container.find('.active'),
            tab_id = activeTab.attr('data-tab'),
            section = $this.closest('.section'),
            littleTabs = section.find('.tab-button'),
            carousel = section.find('.apartment-tabs__pane-list'),
            nextTabId,
            lastId = '00' + (parseInt(items.last().attr('data-tab')) + 1),
            owlTabs = carousel.data('owlCarousel');
        if ($this.hasClass('control-next')) 
            nextTabId = '00' + (parseInt(tab_id) + 1);
        else 
            nextTabId = '00' + (parseInt(tab_id - 1));
        if (nextTabId === '000') nextTabId = '00' + items.length;
        if (nextTabId === lastId) nextTabId = '001';
        littleTabs.removeClass('active');
        carousel.find(".tab-button[data-tab="+ nextTabId +"]").addClass('active');
        if ($this.hasClass('control-next')) owlTabs.next();
        if ((parseInt(nextTabId) > 6) && $this.hasClass('control-prev')) owlTabs.prev();
        items.removeClass('active').css({
            display: 'none'
        });
        container.find(".tabs-content__item[data-tab="+ nextTabId +"]").fadeIn("slow").addClass('active');
    })

    //clients logo toggle visible

    $('.toggle-button').on('click', function(e){
        e.preventDefault();
        var hiddenList = $('#hidden'),
            $this = $(this);
        hiddenList.toggleClass('hidden');
        $this.toggleClass('show');
        if ($this.hasClass('show')) {
            $this.html('Показать еще')
        } else {
            $this.html('Скрыть');
        }
    });

    //SEO show text

    $('.show-button').on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            linkId = $this.attr('href'),
            hiddenText = $(linkId);
        hiddenText.toggleClass('hidden-text');
    });


    //scroll

    (function(){
        var scrollpos = window.scrollY;
        var nav = document.getElementById("navbar");
        var windowheight = window.innerHeight;
        var headerheight = document.getElementById("navbar").offsetHeight;

        function add_class_on_scroll() {
            nav.classList.add("navbar-fixed-top");
        }

        function remove_class_on_scroll() {
            nav.classList.remove("navbar-fixed-top");
        }

        window.addEventListener('scroll', function() {
            scrollpos = window.scrollY;
            if (scrollpos > (windowheight + headerheight)) {
                add_class_on_scroll();
            } else {
                remove_class_on_scroll();
            }
        });
    })();

    //MAP



    ymaps.ready(init);
    var myMap,
        myPlacemark;
    //map
    //do not touch
    function init(){
        myMap = new ymaps.Map("map", {
            center: [51.840033,107.578067],
            zoom: 14,
            controls: ['zoomControl', 'rulerControl', 'typeSelector'],
            behaviors: ['default', 'scrollZoom']
        });

        myMap.behaviors.disable("scrollZoom");

        myPlacemark = new ymaps.Placemark([51.839767, 107.577594], {
                hintContent: 'HOSTEL House',
                balloonContent: 'HOSTEL House: ул. Смолина 54а, ТЦ Аврора, 3 этаж'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/hostel.sass.png',
                iconImageSize: [32, 34],
                iconImageOffset: [-20, -20]
            });

        myMap.geoObjects.add(myPlacemark);

        var myPolyline1  = new ymaps.Polyline([
                [51.84103, 107.583131],
                [51.841452, 107.582401],
                [51.841499, 107.582396],
                [51.8419474, 107.582626],
                [51.842788, 107.581205],
                [51.841007, 107.578684],
                [51.840482, 107.579612],
                [51.840299, 107.579365],
                [51.840216, 107.579461],
                [51.839146, 107.577519],
                [51.839608, 107.577471]
            ], {
                balloonContent: "Пешком от ЖД вокзала 7 минут"
            }, {
                balloonCloseButton: true,
                strokeColor: "6600FF80",
                strokeWidth: 5
            }
        );

        myMap.geoObjects.add(myPolyline1);


        var myPolyline11  = new ymaps.Polyline([
                [51.840957, 107.583233],
                [51.840296, 107.584327],
                [51.840286, 107.584483],
                [51.840392, 107.585314],
                [51.838834, 107.58791],
                [51.837611, 107.58989],
                [51.837122, 107.590507],
                [51.835748, 107.591859],
                [51.834467, 107.589198],
                [51.834739, 107.588876],
                [51.835391, 107.58864],
                [51.835696, 107.588479],
                [51.835858, 107.588189],
                [51.836042, 107.587562],
                [51.836061, 107.587111],
                [51.836265, 107.586859],
                [51.838701, 107.582935],
                [51.840915, 107.579347],
                [51.841194, 107.578745],
                [51.841289, 107.578238],
                [51.841372, 107.577149],
                [51.841354, 107.577037],
                [51.841276, 107.576967],
                [51.840716, 107.577039],
                [51.839531, 107.577155],
                [51.839561, 107.577439]
            ], {
                balloonContent: "На автомобиле от ЖД вокзала 4 минуты"
            }, {
                balloonCloseButton: true,
                strokeColor: "3366FF",
                strokeWidth: 5
            }
        );

        myMap.geoObjects.add(myPolyline11);


        var myPolyline2  = new ymaps.Polyline([

                [51.804062, 107.443995],
                [51.803124, 107.444365],
                [51.803004, 107.44452],
                [51.802928, 107.44474],
                [51.802333, 107.4479],
                [51.802243, 107.448463],
                [51.800936, 107.456258],
                [51.800769, 107.457156],
                [51.800643, 107.458259],
                [51.798355, 107.4716],
                [51.798085, 107.473158],
                [51.797961, 107.474461],
                [51.797925, 107.4756],
                [51.797917, 107.476186],
                [51.797916, 107.476814],
                [51.797932, 107.47746],
                [51.797982, 107.478084],
                [51.798165, 107.479961],
                [51.798162, 107.479969],
                [51.798554, 107.483493],
                [51.798854, 107.485907],
                [51.799173, 107.48882],
                [51.799313, 107.490134],
                [51.799479, 107.491196],
                [51.799582, 107.49158],
                [51.799685, 107.491845],
                [51.799852, 107.492199],
                [51.800031, 107.492387],
                [51.800237, 107.492591],
                [51.800483, 107.492688],
                [51.800786, 107.492688],
                [51.801089, 107.492591],
                [51.801987, 107.49221],
                [51.802575, 107.491985],
                [51.802793, 107.491915],
                [51.803004, 107.49192],
                [51.803417, 107.492022],
                [51.803842, 107.492167],
                [51.808305, 107.495745],
                [51.816043, 107.502006],
                [51.817682, 107.503282],
                [51.818972, 107.504023],
                [51.820624, 107.50494],
                [51.822928, 107.50619],
                [51.82809, 107.50899],
                [51.829389, 107.509741],
                [51.830721, 107.510449],
                [51.833481, 107.511871],
                [51.834591, 107.512504],
                [51.835306, 107.512938],
                [51.836156, 107.513705],
                [51.836661, 107.514285],
                [51.83783, 107.516248],
                [51.839001, 107.518292],
                [51.839739, 107.519566],
                [51.84051, 107.520963],
                [51.841561,  107.524322],
                [51.84213, 107.526129],
                [51.842266, 107.526612],
                [51.842368, 107.527095],
                [51.842487, 107.528071],
                [51.842508, 107.52886],
                [51.84248, 107.529734],
                [51.842264, 107.531735],
                [51.84191, 107.535115],
                [51.841796, 107.536552],
                [51.841693, 107.549524],
                [51.841799, 107.55025],
                [51.842593, 107.552438],
                [51.843153, 107.554068],
                [51.843351, 107.555011],
                [51.84352, 107.5558],
                [51.843736, 107.556653],
                [51.844439, 107.558659],
                [51.845637, 107.562033],
                [51.84628, 107.56378],
                [51.846638, 107.564696],
                [51.846865, 107.565373],
                [51.846855, 107.565696],
                [51.846813, 107.565912],
                [51.846691, 107.566281],
                [51.846522, 107.566671],
                [51.846159, 107.567344],
                [51.845973, 107.567667],
                [51.84574, 107.568322],
                [51.845557, 107.569047],
                [51.845355, 107.569739],
                [51.845112, 107.570406],
                [51.844765, 107.571158],
                [51.844398, 107.571845],
                [51.842155, 107.57542],
                [51.841298, 107.576861],
                [51.841233, 107.576948],
                [51.840424, 107.577035],
                [51.83946, 107.577129],
                [51.839487, 107.577456]
            ], {
                balloonContent: "На автомобиле от аэропорта 15 минут"
            }, {
                balloonCloseButton: true,
                strokeColor: "33CC00",
                strokeWidth: 5
            }
        );

        myMap.geoObjects.add(myPolyline2);


        var myPolyline3  = new ymaps.Polyline([
                [51.833314, 107.574212],
                [51.832682, 107.574384],
                [51.832593, 107.574566],
                [51.832682, 107.575049],
                [51.832606, 107.575248],
                [51.831818, 107.575607],
                [51.831975, 107.576755],
                [51.831225, 107.57701],
                [51.831133, 107.57721],
                [51.83108, 107.57926],
                [51.831762, 107.578949],
                [51.832038, 107.579518],
                [51.832131, 107.580188],
                [51.834238, 107.578826],
                [51.835316, 107.57812],
                [51.836401, 107.57749],
                [51.837561, 107.577324],
                [51.839392, 107.577152],
                [51.839412, 107.577495]
            ], {
                balloonContent: "На автомобиле от автовокзала 2 минуты"
            }, {
                balloonCloseButton: true,
                strokeColor: "FF6600",
                strokeWidth: 5
            }
        );

        myMap.geoObjects.add(myPolyline3);



        var myPlacemark1 = new ymaps.Placemark([51.840839, 107.582853], {
                hintContent: 'ЖД вокзал',
                balloonContent: 'ЖД вокзал: ул. Революции 1905 года, 35'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/karta_1.png',
                iconImageSize: [30, 30],
                iconImageOffset: [-16, -18]
            });
        myMap.geoObjects.add(myPlacemark1);

        var myPlacemark2 = new ymaps.Placemark([51.804863, 107.443512], {
                hintContent: 'Аэропорт',
                balloonContent: 'Аэропорт: пос. Аэропорт, 10'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/karta_2.png',
                iconImageSize: [30, 30],
                iconImageOffset: [-11, -18]
            });
        myMap.geoObjects.add(myPlacemark2);

        var myPlacemark3 = new ymaps.Placemark([51.83284, 107.573969], {
                hintContent: 'Автовокзал',
                balloonContent: 'Автовокзал: ул.Корабельная, 32 к15'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/karta_3.png',
                iconImageSize: [30, 30],
                iconImageOffset: [-16, 10]
            });
        myMap.geoObjects.add(myPlacemark3);


        var myPlacemark4 = new ymaps.Placemark([51.834758, 107.584682], {
                hintContent: 'Площадь Советов',
                balloonContent: 'Площадь Советов, центральная площадь города Улан-Удэ'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/lenin.png',
                iconImageSize: [35, 40],
            });
        myMap.geoObjects.add(myPlacemark4);

        myPolyline3.options.set('visible', true);
    }
    console.log('ok');
});
