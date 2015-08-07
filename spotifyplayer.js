function getSong(event){
	event.preventDefault();

	function searchString(){
		search = $('#search').val();
		return searchString = search.replace(" ","+");
	}

	var request = $.get('https://api.spotify.com/v1/search?q='+searchString()+'&type=track');

	function handleResult(songs){
		
		var thesong = songs.tracks.items[0]
		$('.title').text(thesong.name)
		$('.author').text(thesong.artists[0].name)
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
}

$('.btn-play').on('click',playActions);
