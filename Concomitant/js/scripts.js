$(document).ready(
    function() {
        // Carousel settings
        $('.carousel').carousel({
            pause: false,
            interval: 3000
        })

        // Height variables //
        var controlHeight = "40px";
        var carouselHeight = "360px";
        var thumbnailHeight = "0";
        var thumbnailSizerHeight = "0";
        // Scrollbar in css ( 20px )


        var $carouselWrapper = $("<div id='carouselWrapper'></div>");
        $(" #carousel ").wrap($carouselWrapper);


        //////////////////////////
        // Images to background //
        //////////////////////////
        var $carouselImgs = $(" .carousel-item > img ");
        var $carouselDivs = $(" .carousel-item ");
        var tempImg;

        // Carousel afbeeldingen > achtergrond
        $($carouselDivs).css({ "background-size": "contain", "background-position": "center", "background-repeat": "no-repeat", "width": "100%", "height": carouselHeight });

        for (var i = $carouselImgs.length - 1; i >= 0; i--) {

            tempImg = $($carouselImgs[i]).attr("src");
            $($carouselDivs[i]).css("background-image", "url('" + tempImg + "')");
        }

        $($carouselImgs).remove();

        //////////////
        // Controls //
        //////////////
        var $thumbImgs = [];
        $thumbImgs = $(".carousel-inner > img").detach();
        var $controlBar = $("<div id='controlBar'></div>");

        $($controlBar).append("<a ><img src='img/leftarrow.png' alt='vorige afbeelding'></a>");

        for (var i = 0; i < $thumbImgs.length; i++) {
            var $slideLink = $(" <a href='#carousel'><img src='img/sliderpasif.png' alt='slideshow pauseren'></a>");

            $($slideLink).attr({
                "role": "button",
                "data-slide-to": i,
            });

            $($slideLink).on("click", function() { $(".carousel").carousel("pause") });
            $($controlBar).append($slideLink);

        }

        $($controlBar).append("<a ><img src='img/rightarrow.png' alt='volgende afbeelding'></a>");
        // $($controlBar).append("<a href='#controlBar'><img src='https://i.imgur.com/yvMPYBL.png' alt='volledig scherm'></a>");

        $($controlBar).css({ "height": controlHeight, "margin": "0 auto", "width": "50%", "min-width": "200px", "line-height": controlHeight, "z-index": "100", "position": "relative" });

        $($controlBar).insertAfter("#carousel");

        $("#controlBar > a").css({ "padding": "0 10px" });


        $("html").on("click", "#controlBar > a:first-of-type", function() { $(".carousel").carousel("prev"); });

        $("html").on("click", "#controlBar > a:last-of-type", function() { $(".carousel").carousel("next"); });




        ////////////////
        // Thumbnails //
        ////////////////
        // var $thumbImgs = [];
        // $thumbImgs = $(".carousel-inner > img").detach();

        if ($thumbImgs.length == 0) {
            alert("Geen thumbnails gevonden!");
        } else {

            var $thumbDiv = $("<div class='thumbnails'></div>");
            var $thumbSizer = $("<div class='thumbSizer'></div>");


            // Thumbnails toevoegen
            for (var i = 0; i < $thumbImgs.length; i++) {

                var $slideLink = $(" <a href='#carousel'></a>");

                $($slideLink).attr({
                    "role": "button",
                    "data-slide-to": i,
                });

                $($slideLink).on("click", function() { $(".carousel").carousel("pause") });

                $($slideLink).append($thumbImgs[i]);
                $($thumbDiv).append($slideLink);
            }

            var $carousel = $("#carousel");
            $($carousel).css({ "overflow": "hidden" });

            $thumbDiv.css({ "vertical-align": "middle", "height": thumbnailSizerHeight, "width": "100%", "overflow-x": "hidden", "overflow-y": "hidden", "white-space": "nowrap" });



            $thumbSizer.css({ "margin-top": "2vh", "display": "inline-flex", "align-items": "center", "justify-content": "center", "width": thumbnailHeight, "height": thumbnailHeight });
            $("div.thumbnails > a").wrap($thumbSizer);
            $("div.thumbSizer > a > img").removeClass("hidden-xs-up");
            $("div.thumbSizer > a > img").addClass("img-thumbnail");

            $("div.carousel").css("height", carouselHeight);

        }

        ////////////////
        // Fullscreen //
        ////////////////
        var currentFull = false;


        // CSS for fullscreen
        $("#controlBar > a").css({ "background-color": "rgba(254, 254, 254, 0.5)", "border-radius": "8px", "display": "inline-block", "height": controlHeight, "position": "relative" });

        var x = window.matchMedia("(max-width: 700px)");

        x.addListener(function(x) {
            if (x.matches) { // If media query matches
                $("#controlBar").css("width", "100%");
                $("div.carousel").css("height", "100px");

                $(".carousel-item").css({ "height": "100px", "width": "100%" });
            } else {
                $("#controlBar").css("width", "50%");
                $("div.carousel").css("height", carouselHeight);

                $(".carousel-item").css({ "height": carouselHeight, "width": "100%" });
            }
        });

        // $("html").on("click", "#controlBar > a:last-of-type", function() {

        //     if (currentFull == false) {
        //         var $fullscreenDiv = $("<div class='fullscreen'></div>");

        //         $("body").css("overflow", "hidden");
        //         $($fullscreenDiv).css({ "position": "fixed", "width": "100%", "height": "101vh", "background-color": "rgba(0, 0, 0, 0.9)", "z-index": "50" });

        //         $($fullscreenDiv).append($controlBar);
        //         $($fullscreenDiv).append($carousel);
        //         $($fullscreenDiv).append($thumbDiv);

        //         $($carousel).css({ "position": "relative", "top": "-" + controlHeight, "height": "100vh" });
        //         $($carouselDivs).css({ "height": "100vh" });
        //         $($thumbDiv).css({ "position": "fixed", "bottom": "0" });

        //         $("body").prepend($fullscreenDiv);

        //         $("#controlBar > a:last-of-type > img").attr("src", "https://i.imgur.com/Im75hMj.png");

        //         currentFull = true;

        //     } else {
        //         $("#carouselWrapper").append($controlBar);
        //         $("#carouselWrapper").append($carousel);
        //         $("#carouselWrapper").append($thumbDiv);

        //         $($carousel).css({ "position": "static", "height": carouselHeight });
        //         $($carouselDivs).css({ "height": carouselHeight });
        //         $($thumbDiv).css({ "position": "static" });

        //         $("#controlBar > a:last-of-type > img").attr("src", "https://i.imgur.com/yvMPYBL.png");

        //         $("body").css("overflow", "auto");
        //         $("div.fullscreen").remove();

        //         currentFull = false;
        //     }
        // });


    });