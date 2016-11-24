// ------------------------------------------------------------------------------------------------------------------
// This is main JS file that contains custom JS scipts and initialization used in this template
// ------------------------------------------------------------------------------------------------------------------
// Theme Name: LUPA: Responsive Multipurpose HTML5 Theme
// Theme URI: http://demo.themirrorimages.eu/lupa
// Author: TheMirrorImages
// Author URI: http://www.themirrorimages.eu
// Version: 1.1
// ------------------------------------------------------------------------------------------------------------------

(function () {
    "use strict";

    $(function ($) {

        var overflow;

        var columnNum;
        var columnWidth;
        var width;
        var height;

        var topPadding = 40;
        var bottomPadding = 40;
        var scrollOffset;


        /*--------------------------------------------------
         SmoothScroll v1.2.1 Licensed under the terms of the MIT license.
         ----------------------------------------------------*/

        (function () {
            var defaultOptions = {
                    frameRate: 150,
                    animationTime: 800,
                    stepSize: 120,
                    pulseAlgorithm: !0,
                    pulseScale: 8,
                    pulseNormalize: 1,
                    accelerationDelta: 20,
                    accelerationMax: 1
                },
                options = defaultOptions,
                direction = {
                    x: 0,
                    y: 0
                },
                root = 0 <= document.compatMode.indexOf("CSS") || !document.body ? document.documentElement : document.body,
                que = [],
                pending = !1,
                lastScroll = +new Date;

            function scrollArray(a, b, c, d) {
                d || (d = 1E3);
                directionCheck(b, c);
                if (1 != options.accelerationMax) {
                    var e = +new Date - lastScroll;
                    e < options.accelerationDelta && (e = (1 + 30 / e) / 2, 1 < e && (e = Math.min(e, options.accelerationMax), b *= e, c *= e));
                    lastScroll = +new Date
                }
                que.push({
                    x: b,
                    y: c,
                    lastX: 0 > b ? 0.99 : -0.99,
                    lastY: 0 > c ? 0.99 : -0.99,
                    start: +new Date
                });
                if (!pending) {
                    var q = a === document.body,
                        p = function (e) {
                            e = +new Date;
                            for (var h = 0, k = 0, l = 0; l < que.length; l++) {
                                var f = que[l],
                                    m = e - f.start,
                                    n = m >= options.animationTime,
                                    g = n ? 1 : m / options.animationTime;
                                options.pulseAlgorithm && (g = pulse(g));
                                m = f.x * g - f.lastX >> 0;
                                g = f.y * g - f.lastY >> 0;
                                h += m;
                                k += g;
                                f.lastX += m;
                                f.lastY += g;
                                n && (que.splice(l, 1), l--)
                            }
                            q ? window.scrollBy(h, k) : (h && (a.scrollLeft += h), k && (a.scrollTop += k));
                            b || c || (que = []);
                            que.length ? requestFrame(p, a, d / options.frameRate + 1) : pending = !1
                        };
                    requestFrame(p, a, 0);
                    pending = !0
                }
            }

            function wheel(a) {
                var b = overflowingAncestor(a.target);
                if (!b || a.defaultPrevented) return !0;
                var c = a.wheelDeltaX || 0,
                    d = a.wheelDeltaY || 0;
                c || d || (d = a.wheelDelta || 0);
                1.2 < Math.abs(c) && (c *= options.stepSize / 120);
                1.2 < Math.abs(d) && (d *= options.stepSize / 120);
                scrollArray(b, -c, -d);
                a.preventDefault()
            }

            var cache = {};
            setInterval(function () {
                cache = {}
            }, 1E4);
            var uniqueID = function () {
                var a = 0;
                return function (b) {
                    return b.uniqueID || (b.uniqueID = a++)
                }
            }();

            function setCache(a, b) {
                for (var c = a.length; c--;) cache[uniqueID(a[c])] = b;
                return b
            }

            function overflowingAncestor(a) {
                var b = [],
                    c = root.scrollHeight;
                do {
                    var d = cache[uniqueID(a)];
                    if (d) return setCache(b, d);
                    b.push(a);
                    if (c === a.scrollHeight) {
                        if (root.clientHeight + 10 < c) return setCache(b, document.body)
                    }
                    else if (a.clientHeight + 10 < a.scrollHeight && (overflow = getComputedStyle(a, "")
                            .getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return setCache(b, a)
                } while (a = a.parentNode)
            }

            function directionCheck(a, b) {
                a = 0 < a ? 1 : -1;
                b = 0 < b ? 1 : -1;
                if (direction.x !== a || direction.y !== b) direction.x = a, direction.y = b, que = [], lastScroll = 0
            }

            var requestFrame = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (a, b, c) {
                        window.setTimeout(a, c || 1E3 / 60)
                    }
            }();

            function pulse_(a) {
                var b;
                a *= options.pulseScale;
                1 > a ? b = a - (1 - Math.exp(-a)) : (b = Math.exp(-1), a = 1 - Math.exp(-(a - 1)), b += a * (1 - b));
                return b * options.pulseNormalize
            }

            function pulse(a) {
                if (1 <= a) return 1;
                if (0 >= a) return 0;
                1 == options.pulseNormalize && (options.pulseNormalize /= pulse_(1));
                return pulse_(a)
            }

            var ischrome = /chrome/.test(navigator.userAgent.toLowerCase());

            if (ischrome) {
                window.addEventListener("mousewheel", wheel, !1);
            }
        })();


        /*--------------------------------------------------
         Full and Fix Portfolio
         ----------------------------------------------------*/

        (function ($) {
            var $container = $('.items'),
                colWidth = function () {
                    var w = $container.width();
                    if (w > 2200) {
                        columnNum = 6;
                    } else if (w > 1199) {
                        columnNum = 4;
                    } else if (w > 899) {
                        columnNum = 3;
                    } else if (w > 639) {
                        columnNum = 2;
                    } else {
                        columnNum = 1;
                    }
                    columnWidth = Math.floor(w / columnNum);
                    $container.find('.item').each(function () {
                        var $item = $(this),
                            multiplier_w = $item.attr('class').match(/item-w(\d)/),
                            multiplier_h = $item.attr('class').match(/item-h(\d)/),
                            multiplier_p = $item.attr('class').match(/item-p(\d)/),
                            m_w = multiplier_w[1],
                            m_h = multiplier_h[1],
                            m_p = multiplier_p[1];
                        if (w < 640 && m_p == 3 && m_w == 2) {
                            m_w = 1;
                            m_h = 1;
                        }
                        width = (multiplier_w ? columnWidth * m_w - 4 : columnWidth - 4) - .1,
                            height = (multiplier_h ? columnWidth * m_h * m_p * 0.25 - 4 : columnWidth - 4) - .1;
                        $item.css({
                            width: width,
                            height: height,
                        });
                        return $item;
                    });
                    return columnWidth;
                },
                isotope = function () {
                    $container.isotope({
                        resizable: false,
                        itemSelector: '.item',
                        masonry: {
                            columnWidth: colWidth(),
                            gutterWidth: 4
                        }
                    });
                };
            isotope();
            $(window).smartresize(isotope);
            $('.filters ul a').click(function () {
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });

            var $optionSets = $('.filters ul'),
                $optionLinks = $optionSets.find('a');

            $optionLinks.click(function () {
                var $this = $(this);
                // don't proceed if already selected
                if ($this.hasClass('selected')) {
                    return false;
                }
                var $optionSet = $this.parents('.filters ul');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');
            });

        }(jQuery));


        /*--------------------------------------------------
         Navigation Menu, Sticky
         ----------------------------------------------------*/

        $(document).ready(function () {

            $('#header').waypoint('sticky');

        });


        /*--------------------------------------------------
         Back to top
         ----------------------------------------------------*/

        $(document).ready(function () {

            var offset = 220;
            var duration = 500;
            jQuery(window).scroll(function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.back-to-top').fadeIn(duration);
                } else {
                    jQuery('.back-to-top').fadeOut(duration);
                }
            });

            jQuery('.back-to-top').click(function (event) {
                event.preventDefault();
                jQuery('html, body').animate({scrollTop: 0}, duration);
                return false;

            });
        });




        // $(document).on("click", "a.download-link", function(event) {
        //     event.preventDefault();
        //     $.fileDownload($(this).attr('href'), {
        //         successCallback: function (url) {
        //
        //             console.log('You just got a file download dialog or ribbon for this URL :' + url);
        //         },
        //         failCallback: function (html, url) {
        //
        //             console.log('Your file download just failed for this URL:' + url + '\r\n' +
        //                 'Here was the resulting error HTML: \r\n' + html
        //             );
        //         }
        //     });
        //     return false; //this is critical to stop the click event which will trigger a normal file download!
        // });


        /*--------------------------------------------------
         Client, Portfolio, Testimonial Carousel
         ----------------------------------------------------*/

        $(document).ready(function () {

            $(".client-cl").owlCarousel({
                navigation: false,
                pagination: false,
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 6,
                itemsDesktop: [1199, 5],
                itemsDesktopSmall: [991, 4],
                itemsTablet: [767, 3],
                itemsMobile: [639, 2]
            });

            $(".testimonial-cl").owlCarousel({
                navigation: false,
                pagination: true,
                autoPlay: 5000, //Set AutoPlay to 5 seconds
                singleItem: true,
                transitionStyle: "goDown"
            });

            $(".team-cl").owlCarousel({
                theme: "owl-team",
                navigation: true,
                pagination: false,
                navigationText: ["&#x34;", "&#x35;"],
                autoPlay: 5000, //Set AutoPlay to 5 seconds
                items: 4,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [991, 3],
                itemsTablet: [767, 2],
                itemsMobile: [490, 1]
            });

            $(".portfolio-cl-full").owlCarousel({
                theme: "owl-portfolio-cl-full",
                navigation: true,
                pagination: false,
                navigationText: ["&#x34;", "&#x35;"],
                itemsScaleUp: false,
                items: 4,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [991, 2],
                itemsTablet: [767, 2],
                itemsMobile: [639, 1]
            });

            $(".slider-cl").owlCarousel({
                theme: "owl-slider",
                navigation: true,
                pagination: false,
                navigationText: ["&#x34;", "&#x35;"],
                autoPlay: 5000, //Set AutoPlay to 5 seconds
                singleItem: true,
                transitionStyle: "fade"
            });
        });


        /*--------------------------------------------------
         Parallax
         ----------------------------------------------------*/

        $(document).ready(function () {

            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
            //if(!isMobile.any())
            //{
            //$('.image1').parallax("50%", 0.5);
            //$('.image2').parallax("50%", 0.5);
            //$('.image3').parallax("50%", 0.5);
            //$('.parallax-image').parallax("50%", 0.2);
            //$('.parallax-image-2').parallax("50%", 0.2);
            //$('.parallax-image-3').parallax("50%", 0.2);
            //$('.parallax-image-4').parallax("50%", 0.2);
            //$('#home-parallax-image').parallax("50%", 0.5);
            //}
        });


        /*--------------------------------------------------
         Counter
         ----------------------------------------------------*/

        jQuery(document).ready(function ($) {

            $('.counter-no').counterUp({
                delay: 10,
                time: 1000
            });
        });


        /*--------------------------------------------------
         Home Super Slider Images
         ----------------------------------------------------*/

        $(window).load(function () {

            $('#slides').superslides({
                animation: 'fade',
                play: 4000,
                pagination: false,
            });
        });


        /*--------------------------------------------------
         Slogan Flex Slider
         ----------------------------------------------------*/

        $(window).load(function () {

            $('.flexslider').flexslider({
                animation: "slide",
                selector: ".flex-slogan > li",
                controlNav: false,
                directionNav: false,
                direction: "vertical",
                slideshowSpeed: 4000,
                keyboard: false,
                touch: false,
            });
            $('.flexslider').flexslider({
                animation: "fade",
                selector: ".flex-slogan2 > li",
                controlNav: false,
                directionNav: false,
                slideshowSpeed: 4000,
                keyboard: false,
                touch: false,
            });
        });


        /* ==============================================
         Animated Object
         =============================================== */

        $(window).load(function () {

            $('.animated').waypoint(function () {
                var object = $(this);
                var anim = object.data('anim');
                var delay = object.data('delay');
                if (delay) {
                    setTimeout(function () {
                        object.addClass(anim);
                        object.removeClass("hid");
                    }, delay);
                } else {
                    object.addClass(anim);
                    object.removeClass("hid");
                }
            }, {
                offset: '90%',
            });
        });


        /*--------------------------------------------------
         Home Video
         ----------------------------------------------------*/

        $(function () {

            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
            if (!isMobile.any()) {
                $(".player").mb_YTPlayer();
            }

        });


        /*--------------------------------------------------
         Lazy Load
         ----------------------------------------------------*/

        $(function () {
            $("img.lazy").lazyload({
                effect: "fadeIn",
            });
        });


        /*--------------------------------------------------
         Gallery
         ----------------------------------------------------*/

        $(document).ready(function () {

            $('.gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: true,
                image: {
                    verticalFit: true
                },
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
            });

            $('.gallery-full').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: true,
                image: {
                    verticalFit: true
                },
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
            });

        });


        /*--------------------------------------------------
         Video
         ----------------------------------------------------*/

        $(document).ready(function () {

            // Target your .container, .wrapper, .post, etc.
            $(".video-wrapper").fitVids();
        });


        /*--------------------------------------------------
         Page Loader
         ----------------------------------------------------*/

        $(window).load(function () {

            $(".loader").delay(500).fadeOut();
            $("#pageloader").delay(1000).fadeOut();
        });


        /*--------------------------------------------------
         Sticky Portfolio Info
         ----------------------------------------------------*/

        $(window).load(function () {
            //scrollOffset = $('#sticky-box').offset().top - $('#header').height();
            //initPortfolioStickyInfo();
            //$(window).scroll(initPortfolioStickyInfo);
            //$(window).resize(initPortfolioStickyInfo);
        });

        function initPortfolioStickyInfo() {
            var scTop = $(this).scrollTop();
            var limitBottom = $('.portfolio-nav').offset().top - $('#sticky-box').height() - $('#header').height() - 20 - bottomPadding - topPadding;

            if ($(window).width() > 991) {
                if (limitBottom - scTop > 0) {
                    if (scTop >= scrollOffset) {
                        $('#sticky-box').css('margin-top', scTop - scrollOffset);
                    } else {
                        $('#sticky-box').css('margin-top', 0);
                    }
                } else {
                    $('#sticky-box').css('margin-top', limitBottom - scrollOffset);
                }
            } else {
                $('#sticky-box').css('margin-top', 0);
            }
        }


    });
// $(function ($) ends
})();
// (function() ends