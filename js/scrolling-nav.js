(function(){
  "use strict";

    $(function() {
        $('.scroll').bind('click', function(event) {
            var $anchor = $(this);
            var headerH = $('#header').height();
            $('html, body').stop().animate({
                scrollTop : $($anchor.attr('href')).offset().top
            }, 1200, 'easeInOutExpo');
            event.preventDefault();
        });
    });

})();
// (function() ends