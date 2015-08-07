function getSong(event){
	$('.btn-play').removeClass('playing');
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
		$('.author').text(thesong.artists[0].name)
		$('.author').attr('num', thesong.artists[0].id)
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
		$('.btn-play').toggleClass('playing');
	}

	$('.js-player').on('timeupdate', printTime);
}

$('.btn-play').on('click',playActions);

function printTime () {
  var current = $('.js-player').prop('currentTime');
  $('#progress-bar').attr('value', current)
  console.log('Current time: ' + current);
}

function showModal(event){
	
	event.preventDefault();
	var idartist = $('.author').attr('num')
	var request = $.get('https://api.spotify.com/v1/artists/'+ idartist);

	function handleResult(info){
		$('#myModalLabel').text(info.name);

		html = [
			'<div>',
				'<div><img src="' + info.images[0].url+ '" style="max-height: 500px; max-width: 550px;"></div>',
				'<div><p>Popularity : <b>' + info.popularity + '</b></p></div>',
				'<div><p>Followers : <b>' + info.followers.total + '</b></p></div>',
				'<div><a href="' + info.external_urls.spotify + '" target="_blank" >Open in Spotify</div>',
			'</div>'
		].join('\n');

		$('.modal-body').html(html);
	}

	request.done(handleResult);
}

$('.author').on('click',showModal)

