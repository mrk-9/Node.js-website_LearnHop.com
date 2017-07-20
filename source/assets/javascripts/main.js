if (typeof jQuery === "undefined") {
  throw new Error("MyApp requires jQuery");
}

$.MyApp = {}

$(function() {
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });
  

  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

  $.MyApp.activateTooltips = function() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  $.MyApp.activateSliders = function() {
    if($("#logo-slider").length) {
      $('#logo-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

    // Related projects
    if($("#related-projects-slider").length) {
      $('#related-projects-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

    // Team slider
    if($("#team-slider").length) {
      $('#team-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [

          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }


    // Office images
    if($("#office-slider").length) {
      $('#office-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }
  }

  $.MyApp.activateCounter = function() {
    if($(".animated-counters").length) {
      var employee = new CountUp("employee-count", 0, 25);
      employee.start();

      var product = new CountUp("product-count", 0, 12);
      product.start();

      var experience = new CountUp("experience-count", 0, 672);
      experience.start();

      var customer = new CountUp("customer-count", 10000, 15000);
      customer.start();
    }
  }

  $.MyApp.activateGallery = function() {
    var $container = $("#gallery-container");

    $container
    .on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });
  }

  $.MyApp.activateFiltering = function() {
    if($("#filterable-list").length) {
      var $container = $('#filterable-list');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });

      $('#filterable-nav a').click(function(){
        $('#filterable-nav .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });
    }
  }

  $.MyApp.activateScrollAnimations = function() {
    AOS.init();
  }

  // INIT
  $.MyApp.init = function() {
    $.MyApp.activateGallery();
    $.MyApp.activateFiltering();
    $.MyApp.activateTooltips();
    $.MyApp.activateSliders();
    $.MyApp.activateCounter();
    $.MyApp.activateScrollAnimations();
  }


  $.MyApp.init();
})
