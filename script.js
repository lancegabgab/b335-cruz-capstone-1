$(document).ready(function () {
    // Mouseenter event
    $(".card").mouseenter(function () {
        $(this).addClass("glow");
    });

    // Mouseleave event
    $(".card").mouseleave(function () {
        $(this).removeClass("glow");
    });
});

//Index.html intro pics animation
$(document).ready(function() {
    var images = $('.fade-image');
    var currentIndex = 0;

    function fadeInOut() {
      var currentImage = images.eq(currentIndex);

      currentImage.fadeIn(200).delay(3000).fadeOut(200, function() {
        currentIndex = (currentIndex + 1) % images.length;
        fadeInOut();
      });
    }

    fadeInOut(); // Start the initial fade in/out
});