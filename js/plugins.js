
$(window).load(function(){

    $(".cs3").cs3({
        responsive: true,
        effects : 'random-2d, galaxy, explosion, random-canvas',
        // effectsGroupLock : {
        //     support3d : 'threeD',
        //     support2d : 'canvas,twoD',
        //     supportCanvasNoCSS3 : 'canvas'
        //     },
        captions:{
            enabled: true,
            multi: false,
            duration: 300
        },
        navigation: {
            next: ".cs3-slide-next",
            prev: ".cs3-slide-prev",
            hideOnStart: true,
            showOnlyOnHover: false
        },
        touch:{
            enabled: true,
            effect : 'slide-s'
        },
        autoplay : {
            enabled : true,
            delay : 2000,
            disableOnInteraction : true
        }
    });
//ONEPAGE-SCROLL

    // $(".main").onepage_scroll({
    //     sectionContainer: ".section-page",     // sectionContainer accepts any kind of selector in case you don't want to use section
    //     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
    //                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    //     animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
    //     pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
    //     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    //     beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
    //     afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
    //     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    //     keyboard: true,                  // You can activate the keyboard controls
    //     responsiveFallback: 600,        // You can fallback to normal page scroll by defining the width of the browser in which
    //     // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
    //     // the browser's width is less than 600, the fallback will kick in.
    //     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    // });
    var galleryShark = $('.gallery-shark');
    var gallerySharkText = $('.gallery-shark__text .section_header');
    try {
        galleryShark.ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.01,
            interactive: true
        });
    $('.gallery-shark__btn').on('mouseover', function(event){
        galleryShark.ripples('set', 'interactive', false);
        galleryShark.addClass('gallery-shark-scale');
        gallerySharkText.addClass('animated');

    }).on('mouseleave', function(event){
        galleryShark.ripples('set', 'interactive', true);
        galleryShark.removeClass('gallery-shark-scale');
        gallerySharkText.removeClass('animated');
        });
    }
    catch (e) {
        $('.error').show().text(e);
    }

    // Automatic drops
    setInterval(function() {
        var $el = galleryShark;
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 20;
        var strength = 0.03 + Math.random() * 0.03;
        $el.ripples('drop', x, y, dropRadius, strength);
    }, 2000);


//POP-UP FUTURE-EVENTS
    var popupW = $('.pop-up').outerWidth();
    var popupH = $('.pop-up').outerHeight();

    var speed = 1,
        pieceW = 30,
        pieceH = 30,
        pieces = popupW/pieceW * popupH/pieceH;


    for (var i = pieces - 1; i >= 0; i--) {
        $('.pop-up').prepend('<div class="piece" style="width:'+pieceW+'px; height:'+pieceH+'px"></div>');
    };

    function breakGlass(from){
        if (from === "reverse"){
            $('.piece').each(function(){
                TweenLite.to($(this), speed, {x:0, y:0, rotationX:0, rotationY:0, opacity: 1, z: 0});
                TweenLite.to($('.pop-up .pop-up_content'),0.2,{opacity:1, delay: speed});
            });
            return;
        }

        if(!from){
            TweenLite.to($('.pop-up .pop-up_content'),0.2,{opacity:0});
            setTimeout(function(){$('.pop-up-wrap').hide();},800);
        } else {
            TweenLite.from($('.pop-up .pop-up_content'),0.5,{opacity:0, delay: speed});
        }

        $('.piece').each(function(){
            var distX = getRandomArbitrary(-250, 250),
                distY = getRandomArbitrary(-250, 250),
                rotY  = getRandomArbitrary(-720, 720),
                rotX  = getRandomArbitrary(-720, 720),
                z = getRandomArbitrary(-500, 500);

            if(!from){
                TweenLite.to($(this), speed, {x:distX, y:distY, rotationX:rotX, rotationY:rotY, opacity: 0, z: z});
            } else {
                TweenLite.from($(this), speed, {x:distX, y:distY, rotationX:rotX, rotationY:rotY, opacity: 0, z: z});
            }
        });
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    $('.close').on('click',function(e){
        e.preventDefault();
        $(this).hide();
        breakGlass();
        $('body').css('overflow', 'visible');
    });
    $('.future-events_item').click(function(){
        var popupWrap = $('.pop-up-wrap');
        $('body').css('overflow', 'hidden');
        popupWrap.show();
        breakGlass('reverse');
        setTimeout(function(){$('.close').show();},800);
    });
    breakGlass();

///GALLERY_SHARK

    $.fn.preload = function(options) {
        var opts    = $.extend({}, $.fn.preload.defaults, options);
        o           = $.meta ? $.extend({}, opts, this.data()) : opts;
        var c       = this.length,
            l       = 0;
        return this.each(function() {
            var $i  = $(this);
            $('<img alt="">').load(function(i){
                ++l;
                if(l == c) o.onComplete();
            }).attr('src',$i.attr('src'));
        });
    };
    $.fn.preload.defaults = {
        onComplete  : function(){return false;}
    };


    var $tf_bg				= $('#tf_bg'),
        $tf_bg_images		= $tf_bg.find('img'),
        $tf_bg_img			= $tf_bg_images.eq(0),
        $tf_thumbs			= $('#tf_thumbs'),
        total				= $tf_bg_images.length,
        current				= 0,
        $tf_content_wrapper	= $('#tf_content_wrapper'),
        $tf_next			= $('#tf_next'),
        $tf_prev			= $('#tf_prev'),
        $tf_loading			= $('#tf_loading');
    var wrap =  $('.gallery-shark-wrap');
    //preload the images
    $('.gallery-shark__btn').click(function(){
        galleryShark.ripples('pause');
        galleryShark.css('visibility', 'hidden');

        wrap.css('height', '100vh');
        $(window).scrollTop(wrap.offset().top);
        $("body").css("overflow","hidden");
        $('.tf_gallery').fadeIn();
        $tf_bg_images.preload({
            onComplete  : function(){
                $tf_loading.hide();
                init();
            }
        });
    });

    //shows the first image and initializes events
    function init(){
        //get dimentions for the image, based on the windows size
        var dim	= getImageDim($tf_bg_img);
        //set the returned values and show the image
        $tf_bg_img.css({
            width	: dim.width,
            height	: dim.height,
            left	: dim.left,
            top		: dim.top
        }).fadeIn();

        //resizing the window resizes the $tf_bg_img
        $(window).bind('resize',function(){
            var dim	= getImageDim($tf_bg_img);
            $tf_bg_img.css({
                width	: dim.width,
                height	: dim.height,
                left	: dim.left,
                top		: dim.top
            });
        });

        //expand and fit the image to the screen
        $('#tf_zoom').on('click',
            function(){
                if($tf_bg_img.is(':animated'))
                    return false;

                var $this	= $(this);
                if($this.hasClass('tf_zoom')){
                    resize($tf_bg_img);
                    $this.addClass('tf_fullscreen')
                        .removeClass('tf_zoom');
                }
                else{
                    var dim	= getImageDim($tf_bg_img);
                    $tf_bg_img.animate({
                        width	: dim.width,
                        height	: dim.height,
                        top		: dim.top,
                        left	: dim.left
                    },350);
                    $this.addClass('tf_zoom')
                        .removeClass('tf_fullscreen');
                }
            }
        );

        //click the arrow down, scrolls down
        $tf_next.bind('click',function(){
            if($tf_bg_img.is(':animated'))
                return false;
            scroll('tb');
        });

        //click the arrow up, scrolls up
        $tf_prev.bind('click',function(){
            if($tf_bg_img.is(':animated'))
                return false;
            scroll('bt');
        });
        //
        //mousewheel events - down / up button trigger the scroll down / up
        $('.tf_gallery').mousewheel(function(e, delta) {
            if($tf_bg_img.is(':animated'))
                return false;

            if(delta > 0)
                scroll('bt');
            else
                scroll('tb');
            return false;
        });

        // //key events - down / up button trigger the scroll down / up
        // $(document).keydown(function(e){
        //     if($tf_bg_img.is(':animated'))
        //         return false;
        //
        //     switch(e.which){
        //         case 38:
        //             scroll('bt');
        //             break;
        //
        //         case 40:
        //             scroll('tb');
        //             break;
        //     }
        // });
    }

    // $tf_thumbs.flip({
    //     axis	: 'x',
    //     speed: 400,
    //     front: ".tf_thumbs__img",
    //     trigger: 'click',
    //     reverse : false,
    //     onBefore	: function(){
    //         //the new thumb is set here
    //         var content	= '';
    //         content		+='<img src="' + $tf_bg_images.eq(current).attr('longdesc') + '" alt="Thumb' + (current+1) + '"/>';
    //         $tf_thumbs.html(content);
    //     }
    // });
    //show next / prev image
    $tf_thumbs.flip({axis: 'x',
        speed: 500,
        trigger: 'manual'
    });
    var flip = $tf_thumbs.data("flip-model");
    function scroll(dir){
        //if dir is "tb" (top -> bottom) increment current,
        //else if "bt" decrement it
        current	= (dir == 'tb')?current + 1:current - 1;
        var con_next = (dir == 'tb')?current - 1:current + 1;

        //we want a circular slideshow,
        //so we need to check the limits of current
        if(current == total) current = 0;
        else if(current < 0) current = total - 1;
        if(con_next  >= total) con_next  = 0;
        else if(con_next  < 0) con_next  = total - 1;
        //flip the thumb
        var content_current	= '';
        var content_next ="";
        content_current +='<img src="' + $tf_bg_images.eq(current).attr('longdesc') + '" alt="Thumb' + (current+1) + '" class="tf_thumbs__img"/>';
        content_next +='<img src="' + $tf_bg_images.eq(con_next).attr('longdesc') + '" alt="Thumb' + (con_next+1) + '" class="tf_thumbs__img"/>';
        $tf_thumbs.find('.front').html(content_current);
        $tf_thumbs.find('.back').html(content_current);
        $tf_thumbs.find('.front').css('transition', "all ease 0.5s");
        $tf_thumbs.find('.back').css('transition', "all ease 0.5s");
        //console.log(": " + flip.isFlipped);
        if(!flip.isFlipped){
            $tf_thumbs.find('.front').css('transition', "none");
            $tf_thumbs.find('.back').css('transition', "none");
        }
        $tf_thumbs.flip(true);
            if(dir == 'tb'){
                    $tf_thumbs.find('.front').css('transition', "all ease 0.5s");
                    $tf_thumbs.find('.back').css('transition', "all ease 0.5s");
                    $tf_thumbs.flip(false);

                setTimeout(function(){
                    $tf_thumbs.find('.front').html(content_next);
                    $tf_thumbs.find('.front').css('transition', 'none');
                    $tf_thumbs.find('.back').css('transition', 'none');
                    $tf_thumbs.flip(true);
                    console.log("down: " + flip.isFlipped);
                }, 500);

            }else{
                $tf_thumbs.flip(true);
                //console.log("up: " + flip.isFlipped);
                $tf_thumbs.find('.front').css('transition', 'none');
                $tf_thumbs.find('.back').css('transition', 'none');
                $tf_thumbs.find('.front').html(content_current);
                $tf_thumbs.find('.back').html(content_next);

                setTimeout(function(){
                    $tf_thumbs.find('.front').css('transition', "all ease 0.5s");
                    $tf_thumbs.find('.back').css('transition', "all ease 0.5s");
                    $tf_thumbs.flip(false);
                    console.log(flip.isFlipped);
                }, 400);
                console.log(flip.isFlipped);
            }




        //we get the next image
        var $tf_bg_img_next	= $tf_bg_images.eq(current),
            //its dimentions
            dim				= getImageDim($tf_bg_img_next),
            //the top should be one that makes the image out of the viewport
            //the image should be positioned up or down depending on the direction
            top	= (dir == 'tb')?$(window).height() + 'px':-parseFloat(dim.height,10) + 'px';

        //set the returned values and show the next image
        $tf_bg_img_next.css({
            width	: dim.width,
            height	: dim.height,
            left	: dim.left,
            top		: top
        }).show();

        //now slide it to the viewport
        $tf_bg_img_next.stop().animate({
            top 	: dim.top
        },1000);

        //we want the old image to slide in the same direction, out of the viewport
        var slideTo	= (dir == 'tb')?-$tf_bg_img.height() + 'px':$(window).height() + 'px';
        $tf_bg_img.stop().animate({
            top 	: slideTo
        },1000,function(){
            //hide it
            $(this).hide();
            //the $tf_bg_img is now the shown image
            $tf_bg_img	= $tf_bg_img_next;
            //show the description for the new image
            $tf_content_wrapper.children()
                .eq(current)
                .show();
        });
        //hide the current description
        $tf_content_wrapper.children(':visible')
            .hide()

    }

    //animate the image to fit in the viewport
    function resize($img){
        var w_w	= $(window).width(),
            w_h	= $(window).height(),
            i_w	= $img.width(),
            i_h	= $img.height(),
            r_i	= i_h / i_w,
            new_w,new_h;

        if(i_w > i_h){
            new_w	= w_w;
            new_h	= w_w * r_i;

            if(new_h > w_h){
                new_h	= w_h;
                new_w	= w_h / r_i;
            }
        }
        else{
            new_h	= w_w * r_i;
            new_w	= w_w;
        }

        $img.animate({
            width	: new_w + 'px',
            height	: new_h + 'px',
            top		: '0px',
            left	: '0px'
        },350);
    }

    //get dimentions of the image,
    //in order to make it full size and centered
    function getImageDim($img){
        var w_w	= $(window).width(),
            w_h	= $(window).height(),
            r_w	= w_h / w_w,
            i_w	= $img.width(),
            i_h	= $img.height(),
            r_i	= i_h / i_w,
            new_w,new_h,
            new_left,new_top;

        if(r_w > r_i){
            new_h	= w_h;
            new_w	= w_h / r_i;
        }
        else{
            new_h	= w_w * r_i;
            new_w	= w_w;
        }


        return {
            width	: new_w + 'px',
            height	: new_h + 'px',
            left	: (w_w - new_w) / 2 + 'px',
            top		: (w_h - new_h) / 2 + 'px'
        };
    }

    $('.gallery_close_shark').click(function(){
        wrap.css('height', '100%');
        $("body").css("overflow-y","visible");
        $('.tf_gallery').fadeOut();
        galleryShark.ripples('play');
        galleryShark.css('visibility', 'visible');
    });
    var fotorama = $('.fotorama');
    $('.gallery_close_bottom').click(function(){
        $('.gallery_fotorama-block').fadeOut();
        fotorama.destroy();
    });

    $('.gallery_item').on('click', function(e){
        e.preventDefault();

        $('.gallery_fotorama-block').fadeIn();
        fotorama.fotorama({
            width: '100%',
            height: $(window).outerHeight()-188,
            fit: 'cover',
            nav: 'thumbs',
            autoplay: false,
            arrows: true,
            click: true,
            swipe: true
        });
    });
});