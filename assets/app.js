(function() {
  $(function() {
    var after_me, scroll_to, toggle_top_button, top_button_visible;
    $('#back_to_top').hide();
    top_button_visible = false;
    toggle_top_button = function(option) {
      if (option.show && top_button_visible) {
        return;
      }
      if (!option.show && !top_button_visible) {
        return;
      }
      top_button_visible = option.show;
      if (top_button_visible) {
        return $('#back_to_top').show();
      } else {
        return $('#back_to_top').hide();
      }
    };
    after_me = $("#me").height();
    $(document).on("scroll", function() {
      var top;
      top = $(document).scrollTop();
      if (top > after_me - 100) {
        return toggle_top_button({
          show: true
        });
      } else {
        return toggle_top_button({
          show: false
        });
      }
    });
    scroll_to = function(value) {
      if (typeof value === "string") {
        value = $(value).offset().top;
      }
      return $("body").animate({
        scrollTop: "" + value + "px"
      }, "fast");
    };
    $('#back_to_top').on('click', function(e) {
      e.preventDefault();
      return scroll_to(0);
    });
    return $('#me .button, #current .button').on('click', function(e) {
      e.preventDefault();
      return scroll_to($(this).attr('href'));
    });
  });

}).call(this);
