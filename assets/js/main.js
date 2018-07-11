$(function() {
    let nameUser = "",
        ekrani,
        navigation,
        btnLeft,
        ekranStart,
        btnRight,
        timerInterval,
        timerHTML,
        pozicijaPitanja = 0,
        sec = 0,
        min = 0,
        h = 0,
        brPoena = 0;


    $('.kviz-start').click(function() {
        nameUser = $('input[type="text"][name="nameUser"]').val();
        if (nameUser.length > 0) {
            //TODO Startuj kviz
            startKviz(pozicijaPitanja, true);
            $('.kviz-takmicar-name').html(`Takmicar: ${nameUser}`);


        } else {
            //
            let formLogin = ekranStart.find('.form-group');


            if (formLogin.find(".alert-danger").length == 0) {
                formLogin.append('<div id="alert-start" role="alert" class="alert alert-danger">Ime je Obavezno</div>');
            }
        }


    });

   
    function startKviz(pozicija, direction) {

        switch (pozicija) {
            case 0:
                if (direction) {
                    ekranStart.fadeOut("slow");
                    $(ekrani[0]).removeClass('invisible').fadeIn('slow');
                    navigation.show();
                    btnRight.show();
                    timer('start');

                } else {
                    $(ekrani[1]).fadeOut();
                    $(ekrani[0]).fadeIn();
                    btnLeft.hide();
                }
                break;
            case 1:
                if (direction) {
                    // check za prvo pitanje
                   

                    $(ekrani[0]).fadeOut();
                    $(ekrani[1]).fadeIn();
                    btnLeft.show();
                    
                } else {
                    $(ekrani[2]).fadeOut();
                    $(ekrani[1]).fadeIn();
                }
                break;

            case 2:
                if (direction) {

                    $(ekrani[1]).fadeOut();
                    $(ekrani[2]).fadeIn();
                } else {
                    $(ekrani[3]).fadeOut();
                    $(ekrani[2]).fadeIn();
                }
                break;

            case 3:
                if (direction) {
                    // chek za trece pitanje
                    checkCorrectAnswer($('input[type="number"][name="pitanje3"]').val(), 2);
                    $(ekrani[2]).fadeOut();
                    $(ekrani[3]).fadeIn();
                } else {}
                break;
            case 4:

                $(ekrani[3]).fadeOut();
                $(ekrani[4]).fadeIn();
                btnLeft.hide();
                btnRight.hide();
                navigation.hide();
                timer('stop');
                $(ekrani[4]).find(".card-title").html('Takmicar: ' + nameUser);
                $(ekrani[4]).find(".broj-poena").html('Osvojili ste: ' + brPoena + ' poena');
                $(ekrani[4]).find(".trajanje-kviza").html('Kviz je trajao ' + timerHTML.html());
                break;
        }
    }


    function timer(options) {
        if (options === 'start') {
            timerInterval = setInterval(() => {
                sec++;
                if (sec > 60) {
                    min++;
                    sec = 0;
                }
                if (min > 60) {

                    min = 0;
                    h++;
                }

                if (h > 12) {

                    h = 0;
                    min = 0;
                    sec = 0;
                }
                timerHTML.html(`${h<=9?'0' + h: h}:${min<=9?'0' + min: min}:${sec<=9?'0' + sec: sec}`);
            }, 1000);
        } else if (options === 'stop') {
            clearInterval(timerInterval);
        }
    }



    function initKviz() {

        ekrani = $('div.ekran');
        ekrani.hide();
        // $.each(ekrani, function(index,item){
        //      $(item).hide();
        //    })
        timerHTML = $('.kviz-timer span.timer');
        navigation = $('div.container-fluid .navigation');
        btnLeft = $('.kviz-btn-left');
        btnRight = $('.kviz-btn-right');
        ekranStart = $('.kviz-start-ekran');
        btnLeft.hide();
        btnRight.hide();
        navigation.hide();
        pozicijaPitanja = 0;
        sec = 0;
        min = 0;
        h = 0;
        brPoena = 0;
        ekranStart.fadeIn('fast').show();
        $('input[type="text"][name="nameUser"]').val('');
        $('#alert-start').remove();




    }

    initKviz();

    btnRight.click(function() {

        pozicijaPitanja += 1;
        startKviz(pozicijaPitanja, true);

    });

    btnLeft.click(function() {
        pozicijaPitanja -= 1;
        startKviz(pozicijaPitanja, false);
    });

     $('input[type="radio"][name="pitanje1"]').click(function(){
        checkCorrectAnswer($(this).val(), 2);
        btnRight.trigger('click');
     });

    $('button[name="pitanje4"]').click(function() {
        checkCorrectAnswer($(this).val(), 3);
        btnRight.trigger('click');
    });

    $('input[type="checkbox"][name="pitanje2"]').click(function() {
        checkCorrectAnswer($(this).val(), 3);
        btnRight.trigger('click');
    });

    $('button[type="reset"]').on('click', function() {
        initKviz();
    });

    function checkCorrectAnswer(answer, correctAnswer) {

        answer = Number(answer);
        if (answer === correctAnswer) {
            brPoena += 5;
        } else {

        }
        console.log(answer, correctAnswer);
    }

    $('button#btn-pause').click(function() {
        $('div#modalPaused').modal('show');
        timer('stop');
        $('#modalPaused').find('.modal-body').html(`Trenutno vreme je: ${h<=9?'0' + h: h}:${min<=9?'0' + min: min}:${sec<=9?'0' + sec: sec}`);
    });

    $('div#modalPaused').on('hidden.bs.modal', function(e) {
        timer('start');
    });


});