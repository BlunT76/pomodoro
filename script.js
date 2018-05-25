/*décider de la tâche à effectuer ;
démarrer le minuteur (25 minutes) ;
travailler sur la tâche jusqu'à ce que le minuteur sonne et la noter comme faite ;
prendre une courte pause (5 minutes) ;
tous les quatre pomodori prendre une pause un peu plus longue (15-20 minutes).
Bonus : utilisez la méthode Pomodoro pour travailler sur ce projet.*/

var pomo = function () {
    this.tache = true;
    this.current_todo;
    this.count = 0;
    this.currentTime = 1500;
    this.minute = 25;
    this.seconde = 0;
    this.paused = true;
    var that = this;
    
    this.startJob = function () {
        console.log("start")
        this.paused = false;
        $("#start").prop("disabled", true);
        //affiche la tache
        var value = $('#todo').val();
        if (value != "") {
            this.current_todo = $('<div class="todo-item">' + value + '</div>');
            this.current_todo.attr('id', this.count++);
            $('#todo-list').append(this.current_todo);
            $("#todo").val("");
            $("#todo").prop('disabled', true);
        }
        stopCountdown = window.setInterval(function () {
            that.countdown();
        }, 1000);

        if (this.paused) {
            this.paused = false;
        }


    };
    //methode pour mettre en pause le pomodoro
    this.pauseJob = function (pause) {
        console.log("pause");
        window.clearInterval(pause);
        $("#start").prop("disabled", false);
    };
    //methode qui stoppe le pomodoro, via le bouton stop ou la fin du compte a rebours
    this.stopJob = function (stop) {
        console.log("stop");
        if (!this.paused) {
            audio.play();
            this.paused = true;
        }

        window.clearInterval(stop);
        $(this.current_todo).css("text-decoration", "line-through");
        if (this.tache) {
            this.currentTime = 300;
            this.tache = false;
            $("#time").text("5 : 00");
            $("#todo").prop('disabled', true);
            //that.startJob()
        } else {
            this.currentTime = 1500;
            this.tache = true;
            $("#time").text("25 : 00");
            $("#todo").prop('disabled', false);
        }

        if ($("#start").prop("disabled") == true) {
            $("#start").prop("disabled", false);
        }
    };
    //methode compte a rebours
    this.countdown = function () {
        //demarre le compte a rebours
        if (this.currentTime > 0) {
            this.currentTime--;
            this.minute = Math.floor(this.currentTime / 60);
            this.seconde = Math.floor(this.currentTime - this.minute * 60);
            
            //affiche le temps
            if (this.seconde > 9) {
                $("#time").text(this.minute + " : " + this.seconde);
            } else {
                $("#time").text(this.minute + " : 0" + this.seconde);
            }
        } else {
            //quand le temps est ecoulé on stoppe
            if ($("#start").prop("disabled") == true) {
                $("#start").prop("disabled", false);
                that.stopJob(stopCountdown);
            }
        }
    };
}
var stopCountdown;
var count = 0;
var audio = new Audio('ASDIC.ogg');
var pomo1 = new pomo();

//Gestion des boutons start pause stop
$(document).ready(function () {
    //BOUTON START
    $('#start').click(function () {
        pomo1.startJob();
    });

    //BOUTON STOP
    $("#stop").click(function () {
        pomo1.stopJob(stopCountdown);
    });

    //BOUTON PAUSE
    $("#pause").click(function () {
        pomo1.pauseJob(stopCountdown);
    });

    $('#todo').val('');
});
