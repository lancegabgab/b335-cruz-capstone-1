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