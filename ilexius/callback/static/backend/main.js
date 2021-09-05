

function myModal(clicked_id) {
    var selected = document.getElementById(clicked_id)
    var modal = document.getElementById("myModal" + clicked_id);
    modal.style.display = "block";
    selected.style.cursor = "default";

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        selected.style.cursor = "pointer";
        }
    }

    window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
        selected.style.cursor = "pointer";
        }
    })
}


$(document).ready(function() {
    $('.newmessagebtn').on('click', function (e) {
        e.preventDefault();
        var item_id = e.target.id;
        var comment_get = $('#commentInput' + item_id).val();

        $.ajax({
            url: '/ajax/new_comment/',
            data : { 'comment_get' : comment_get, 'item_id' : item_id},
            success: function (data){
                $('#comment' + item_id).prepend(
                    '<p class="textblackleft" id="user_jquery" style="color: gray; border-top: 1px solid lightgray;"></p>',
                    '<p class="textblackleft" id="commentnew_jquery" style="text-align:justify;"></p>'
                    )
                $('#commentnew_jquery').text(data.message);
                var txt = 'just now';
                var paragraph = document.getElementById('user_jquery');
                paragraph.innerHTML = "author: guest <span style='float:right;'>"+txt+"</span>";
                $('#commentInput' + item_id).val('');
                $('#user_jquery').attr('id','user_jquery' + item_id);
                $('#commentnew_jquery').attr('id','commentnew_jquery' + item_id);
            },
        });
    });

    var upC = document.getElementById('up-callback');
	var downC = document.getElementById('down-callback');
    var noC = document.getElementById('no-callback');
    var upS = document.getElementById('up-sub');
	var downS = document.getElementById('down-sub');
    var noS = document.getElementById('no-sub');
	
	if (backend_sort_trigger == 1){
		downC.hidden = true;
		upC.hidden = false;
        noC.hidden = true;
        noS.hidden = false;
        downS.hidden = true;
		upS.hidden = true;
	} else if (backend_sort_trigger == 0){
		downC.hidden = false;
		upC.hidden = true;
        noC.hidden = true;
        noS.hidden = false;
        downS.hidden = true;
		upS.hidden = true;
	} else if (backend_sort_trigger == 3){
		downS.hidden = true;
		upS.hidden = false;
        noS.hidden = true;
        noC.hidden = false;
        downC.hidden = true;
		upC.hidden = true;
	}  else if (backend_sort_trigger == 2){
		downS.hidden = false;
		upS.hidden = true;
        noS.hidden = true;
        noC.hidden = false;
        downC.hidden = true;
		upC.hidden = true;
	}
    
});


function myComment(clicked_id) {
    var comment = document.getElementById("item_comments" + clicked_id);
    document.getElementById("comments" + clicked_id).innerHTML = comment.value;
}


function sortList(){
	var upC = document.getElementById('up-callback');
	var downC = document.getElementById('down-callback');
    var noC = document.getElementById('no-callback');
    var upS = document.getElementById('up-sub');
	var downS = document.getElementById('down-sub');
    var noS = document.getElementById('no-sub');
	
	if (backend_sort_trigger == 1){
		downC.hidden = true;
		upC.hidden = false;
        noC.hidden = true;
        noS.hidden = false;
        downS.hidden = true;
		upS.hidden = true;
	} else if (backend_sort_trigger == 0){
		downC.hidden = false;
		upC.hidden = true;
        noC.hidden = true;
        noS.hidden = false;
        downS.hidden = true;
		upS.hidden = true;
	} else if (backend_sort_trigger == 3){
		downS.hidden = true;
		upS.hidden = false;
        noS.hidden = true;
        noC.hidden = false;
        downC.hidden = true;
		upC.hidden = true;
	}  else if (backend_sort_trigger == 2){
		downS.hidden = false;
		upS.hidden = true;
        noS.hidden = true;
        noC.hidden = false;
        downC.hidden = true;
		upC.hidden = true;
	}
}