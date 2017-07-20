$(function() {
  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.scrollToTop(), this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      return $(this.oldContainer).animate({
        opacity: 0,
        top: "-100px"
       }).promise();
    },

    scrollToTop: function() {
      return $("body").animate({scrollTop: 0}).promise();
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : 0,
        top: "-100px",
      });

      $el.animate({ opacity: 1, top: 0 }, 400, function() {
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  var protocol = window.location.protocol;

  if(protocol == "http:" || protocol == "https:") {
    Barba.Prefetch.init();
    Barba.Pjax.start();
    Barba.Dispatcher.on("transitionCompleted", function() {
      $.MyApp.init();
    })
  } else {
    console.log("Please serve this page from a web server to see AJAX page transitions")
  }


})
