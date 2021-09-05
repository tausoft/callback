$(function () {
    $("#datepicker").datepicker({ 
        startDate: '+1d',
        autoclose: true, 
        todayHighlight: true,
        format: "dd/mm/yyyy",
        dateFormat: 'dd/mm/yyyy',
        weekStart: 1,
        daysOfWeekDisabled: "0",
    }).datepicker('update');

    var date = $('div#datepicker').datepicker('getDate');
    var unselect = document.getElementsByName('time_selector');

    if(date == 'Invalid Date'){
        for (i = 0; i < unselect.length; i++){
            unselect[i].classList.add('utime-disabled');
            unselect[i].classList.remove('utime-notselected');
            unselect[i].classList.remove('utime-selected');
        }
    }

    document.getElementById("datetime-select").innerHTML = 'Not selected';
});


function onDateChange() {
    var date = $('div#datepicker').datepicker('getDate');
    var dateF = $.datepicker.formatDate('yy-mm-dd', date);
    var dateY = $.datepicker.formatDate('yy', date);
    var dateM = $.datepicker.formatDate('mm', date);
    var dateD = $.datepicker.formatDate('dd', date);
    var unselect = document.getElementsByName('time_selector');
    document.getElementById("datetime-select").innerHTML = 'Not selected';

    if(date == 'Invalid Date'){
        for (i = 0; i < unselect.length; i++){
            unselect[i].classList.add('utime-disabled');
            unselect[i].classList.remove('utime-notselected');
            unselect[i].classList.remove('utime-selected');
        }
    } else {
        for (i = 0; i < unselect.length; i++){
            unselect[i].classList.add('utime-notselected');
            unselect[i].classList.remove('utime-disabled');
            unselect[i].classList.remove('utime-selected');
        }
    }

    $.ajax({
        url: '/ajax/update_date/',
        data : { 'date': dateF, 'year': dateY, 'month': dateM, 'day': dateD },
        success: function (data){
            document.getElementById("time-select").innerHTML = data.message;
            if (data.saturday == 1){
                document.getElementById("saturday-off").style.display = "none";
                document.getElementById("saturday-on").style.display = "block";
            } else {
                document.getElementById("saturday-on").style.display = "none";
                document.getElementById("saturday-off").style.display = "block";
            }
        }
    });
}

function selectMeMain(clicked_id){
    var selected = document.getElementById(clicked_id);
    var unselect = document.getElementsByName('time_selector');
    var date = $('div#datepicker').datepicker('getDate');
    var dateF = $.datepicker.formatDate('dd-mm-yy', date);
    var dateDj = $.datepicker.formatDate('yy-mm-dd', date);
    var time = document.getElementById(clicked_id).innerHTML;

    if(selected.classList.contains('utime-notselected')){
        for (i = 0; i < unselect.length; i++){
            if (unselect[i].classList.contains('utime-disabled') == false) {
                unselect[i].classList.add('utime-notselected');
                unselect[i].classList.remove('utime-selected');
            }
        }
        selected.classList.add('utime-selected');
        selected.classList.remove('utime-notselected');
        document.getElementById("datetime-select").innerHTML = dateF + ' ' + time;
        document.getElementById("date-select").innerHTML = dateDj;
        document.getElementById("time-select").innerHTML = time;
    } else if(selected.classList.contains('utime-selected')){
        for (i = 0; i < unselect.length; i++){
            if (unselect[i].classList.contains('utime-disabled') == false) {
                unselect[i].classList.add('utime-notselected');
                unselect[i].classList.remove('utime-selected');
            }
        }
        selected.classList.add('utime-notselected');
        selected.classList.remove('utime-selected');
        document.getElementById("datetime-select").innerHTML = 'Not selected';
    } else {
        document.getElementById("datetime-select").innerHTML = 'Not selected';
        if(date == 'Invalid Date'){
            alert('Plese select date first.')
        } else {
            var date = $('div#datepicker').datepicker('getDate');
            var dateF = $.datepicker.formatDate('yy-mm-dd', date);
            alert('Date ' + dateF + ' is unavailable for callback. Please choose another timeframe.')
        }
    }
}

var formemailtrigger = false;
var formnametrigger = false;
var formsubjecttrigger = false;
var formmessagetrigger = false;

var btn = document.getElementById("modalBtn");

function validateEmailRE(email) {
    var re = /(.+)@(.+){2,}\.(.+){2,}/;
    return re.test(email);
}

function validateEmail() {
    var email = $("#uemail-input").val();

    if (validateEmailRE(email)) {
        document.getElementById("uemail-input").style.borderBottom = "2px solid lightgray";
        formemailtrigger = true;
    } else {
        document.getElementById("uemail-input").style.borderBottom = "2px solid red";
        formemailtrigger = false;
    }
    if (formnametrigger == false || formemailtrigger == false || formsubjecttrigger == false || formmessagetrigger == false) {
        btn.classList.add('unext-disabled');
        btn.classList.remove('unext-enabled');
    } else {
        btn.classList.add('unext-enabled');
        btn.classList.remove('unext-disabled');
    }
    return false;
}

function validateName() {
    var uname = $("#uname-input").val();
    if(uname.length > 1) {
        document.getElementById("uname-input").style.borderBottom = "2px solid lightgray";
        formnametrigger = true;
    } else {
        document.getElementById("uname-input").style.borderBottom = "2px solid red";
        formnametrigger = false;
    }
    if (formnametrigger == false || formemailtrigger == false || formsubjecttrigger == false || formmessagetrigger == false) {
        btn.classList.add('unext-disabled');
        btn.classList.remove('unext-enabled');
    } else {
        btn.classList.add('unext-enabled');
        btn.classList.remove('unext-disabled');
    }
}

function validateSubject() {
    var uname = $("#usubject-input").val();
    if(uname.length != 0) {
        document.getElementById("usubject-input").style.borderBottom = "2px solid lightgray";
        formsubjecttrigger = true;
    } else {
        document.getElementById("usubject-input").style.borderBottom = "2px solid red";
        formsubjecttrigger = false;
    }
    if (formnametrigger == false || formemailtrigger == false || formsubjecttrigger == false || formmessagetrigger == false) {
        btn.classList.add('unext-disabled');
        btn.classList.remove('unext-enabled');
    } else {
        btn.classList.add('unext-enabled');
        btn.classList.remove('unext-disabled');
    }
}

function validateMessage() {
    var uname = $("#umessage-input").val();
    if(uname.length > 1) {
        document.getElementById("umessage-input").style.borderBottom = "2px solid lightgray";
        formmessagetrigger = true;
    } else {
        document.getElementById("umessage-input").style.borderBottom = "2px solid red";
        formmessagetrigger = false;
    }
    if (formnametrigger == false || formemailtrigger == false || formsubjecttrigger == false || formmessagetrigger == false) {
        btn.classList.add('unext-disabled');
        btn.classList.remove('unext-enabled');
    } else {
        btn.classList.add('unext-enabled');
        btn.classList.remove('unext-disabled');
    }
}



var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    var uname = document.getElementById("uname-input").value;
    var uphone = document.getElementById("uphone-input").value;
    var ucompany = document.getElementById("ucompany-input").value;
    var uemail = document.getElementById("uemail-input").value;
    var usubject = document.getElementById("usubject-input").value;
    var umessage = document.getElementById("umessage-input").value;
    var udatetime = document.getElementById("datetime-select").innerHTML
    var udate = document.getElementById("date-select").innerHTML
    var utime = document.getElementById("time-select").innerHTML
    utime = utime.replace(/\s/g, '');

    if (formnametrigger == false || formemailtrigger == false || formsubjecttrigger == false || formmessagetrigger == false) {
        var textString = 'Please fill out mandatory fields in order to continue. \n\n';
        if (formnametrigger == false) {
            document.getElementById("uname-input").style.borderBottom = "2px solid red";
            var nameString = 'Name field is mandatory and should be at least 2 characters long! \n';
        } else {
            var nameString = '';
        }
        textString += nameString
        if (formemailtrigger == false) {
            document.getElementById("uemail-input").style.borderBottom = "2px solid red";
            var emailString = 'Email field is mandatory and should be in the right format (e.g. example@gmail.com)! \n';
        } else {
            var emailString = '';
        }
        textString += emailString;
        if (formsubjecttrigger == false) {
            document.getElementById("usubject-input").style.borderBottom = "2px solid red";
            var subjectString = 'Subject field is mandatory and should be at least 1 characters long! \n';
        } else {
            var subjectString = '';
        }
        textString += subjectString;
        if (formmessagetrigger == false) {
            document.getElementById("umessage-input").style.borderBottom = "2px solid red";
            var messageString = 'Message field is mandatory and should be at least 2 characters long! \n';
        } else {
            var messageString = '';
        }
        textString += messageString;
        alert(textString);
    } else {
        modal.style.display = "block";
        document.getElementById("uname").innerHTML = uname;
        document.getElementById("name").value = uname;
        if (uphone == '') {
            document.getElementById("uphone").innerHTML = 'Not specified';
            document.getElementById("phone").value = 'Not specified';
        } else {
            document.getElementById("uphone").innerHTML = uphone;
            document.getElementById("phone").value = uphone;
        }
        if (ucompany == '') {
            document.getElementById("ucompany").innerHTML = 'Not specified';
            document.getElementById("company").value = 'Not specified';
        } else {
            document.getElementById("ucompany").innerHTML = ucompany;
            document.getElementById("company").value = ucompany;
        }
        document.getElementById("uemail").innerHTML = uemail;
        document.getElementById("email").value = uemail;
        document.getElementById("usubject").innerHTML = usubject;
        document.getElementById("subject").value = usubject;
        document.getElementById("umessage").innerHTML = umessage;
        document.getElementById("message").value = umessage;
        document.getElementById("udatetime").innerHTML = udatetime;
        
        if (udatetime != "Not selected") {
            document.getElementById("date").value = udate;
            document.getElementById("time").value = utime;
        } else {
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
        }
        } 

}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = "none";
    }
})