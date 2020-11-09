jQuery(document).ready(function ($) {

    $('#contact').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    stringLength: {
                        min: 2
                    },
                    notEmpty: {
                        message: 'Name field is required'
                    }
                }
            },
            email: {
                validators: {
                    stringCase: {
                        message: 'The Email must be in lowercase',
                        'case': 'lower'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Not a valid Email, Please enter valid email address.'
                    },
                    notEmpty: {
                        message: 'The Email is required and cannot be empty.'
                    },
                    stringLength: {
                        max: 150,
                        message: 'The Email must less than 150 characters'
                    }
                }
            },
            phone_number:{
                validators: {
                    notEmpty: {
                        message: 'The Phone Number field is required.'
                    },
                    numeric: {
                        message: 'Invalid Phone Number'
                    }
                }

            },
            project:{
                validators: {
                    notEmpty: {
                        message: 'Please tell us about your project'
                    },
                    stringLength: {
                        min: 10
                    }
                }

            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var urlPath = $form.attr('action');
        $.ajax({
            url: urlPath,
            data: $form.serialize(),
            method: 'POST',
            dataType: 'json',
            success: function (resp) {
                console.log(resp);
                $('#contact').bootstrapValidator('resetForm', true);
                if (resp.flag == 'error') {
                    swal("Whoops!", resp.message, "error");
                }
                else{
                    swal("Great!", resp.message, "success");
                }
            }
        });
    });



    $('#skylarkSlider').carousel({
        interval: 20000
    });
    $('#skylarkSlider').on('slide.bs.carousel', function () {
        $("#skylarkSlider .custom-animation").addClass('hide-me');
    });

    $('#skylarkSlider').on('slid.bs.carousel', function () {
        $("#skylarkSlider .active").find('.custom-animation').addClass('hide-me');
        var animate_action =  $("#skylarkSlider .active").find('.custom-animation').attr('data-animate');
        $("#skylarkSlider .active").find('.custom-animation').removeClass(animate_action).addClass(animate_action + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#skylarkSlider .active").find('.custom-animation').removeClass(animate_action + ' hide-me');
        });
    });

    var animate_action =  $("#skylarkSlider .active").find('.custom-animation').attr('data-animate');
    $("#skylarkSlider .active").find('.custom-animation').removeClass(animate_action).addClass(animate_action + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $("#skylarkSlider .active").find('.custom-animation').removeClass(animate_action + ' hide-me');
    });

    $(window).on('scroll', function () {
        var animate_action =  $('.sticky-header').find('.static_inner_header').attr('data-animate');
        if ($(window).scrollTop() >= $('.static_inner_header').height()) {
            if(! $('.sticky-header').hasClass('sticky-header-visible'))
            {
                $('.sticky-header').addClass('sticky-header-visible');
                $('.sticky-header').find('.static_inner_header').removeClass(animate_action).addClass(animate_action + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $('.sticky-header').find('.static_inner_header').removeClass(animate_action);
                });
            }  
        } else {
            $('.sticky-header').removeClass('sticky-header-visible');
            $('.sticky-header').find('.static_inner_header').removeClass(animate_action);
        }
    });




    $('.menu-animate').hover(function(){
        var animate_action =  $(this).parents('li').find('ul.sub-menu').attr('data-animate');
        $(this).parents('li').find('ul.sub-menu').removeClass(animate_action).addClass(animate_action + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).parents('li').find('ul.sub-menu').removeClass(animate_action);
        });
    });

    $('nav#menu').mmenu({
        extensions:  ["position-right"]
    });

    $("#hometestmonial").owlCarousel({
        navigation : true, // Show next and prev buttons
        slideSpeed :300,
        paginationSpeed :250,
        items : 1,
        singleItem:true,
        loop:true,
        nav:true,
        autoplay:true,
        autoplayHoverPause:true,
    });

    $("#portfolio-work").owlCarousel({
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        loop:true,
        nav:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:4,
                nav:true,
                loop:false
            }
        }
    });

    $('.grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        // use element for option
        columnWidth: '.grid-sizer',
        percentPosition: true,
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50 ) {
            $('.scrolltop:hidden').stop(true, true).fadeIn();
        } else {
            $('.scrolltop').stop(true, true).fadeOut();
        }
    });

    $(".scroll_custom").on('click', function(event){
        event.preventDefault();
        var data_target = $(this).attr('data-scrroll-to');
        $("html,body").animate({
            scrollTop:$(data_target).offset().top
          },1000);
          return false
    });

    $(window).on('load',function(){
        $('#menu').removeClass('hide-menu-mobile');
    });


});