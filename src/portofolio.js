// Even link ketika di klik
import $ from "jquery";

// parallax fungsi scroll
$(window).mousemove(function () {
  var wScroll = $(this).scrollTop();

  // portofolio

  if (wScroll > $(".portofolio").offset().top - 250) {
    $(".portofolio .img-thumbnail").each(function (i) {
      setTimeout(function () {
        $(".portofolio .img-thumbnail").eq(i).addClass("muncul");
      }, 300 * (i + 1));
    });
  }
});
