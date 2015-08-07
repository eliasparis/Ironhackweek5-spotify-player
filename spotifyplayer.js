function getSong(event){
	event.preventDefault();

	$('#progress-bar').attr('value', 0)
	function searchString(){
		search = $('#search').val();
		return searchString = search.replace(" ","+");
	}

	var request = $.get('https://api.spotify.com/v1/search?q='+searchString()+'&type=track');

	function handleResult(songs){
		
		var thesong = songs.tracks.items[0]
		$('.title').text(thesong.name)
		$('.author').text('<button type="button" class="btn" data-toggle="modal" data-target="#myModal">
  '+ thesong.artists[0].name +
'</button>')
		$('.cover').html('<img src="' + thesong.album.images[0].url + '">')
		$('.audiodiv').html('<audio src="'+ thesong.preview_url +'" class="js-player"></audio>')
	}

	function handleError(){
		console.log('Request wrong executed')
	}

	request.done(handleResult);
	request.fail(handleError);
}

$('#searchform').submit(getSong);

function playActions(){	

	if ($('.btn-play').hasClass('playing')){
		$('.js-player').trigger('pause');
		$('.btn-play').removeClass('playing');
	}else{
		$('.js-player').trigger('play');
		$('.btn-play').addClass('playing');
	}

	$('.js-player').on('timeupdate', printTime);
}

$('.btn-play').on('click',playActions);


function printTime () {
  var current = $('.js-player').prop('currentTime');
  $('#progress-bar').attr('value', current)
  console.log('Current time: ' + current);
}

