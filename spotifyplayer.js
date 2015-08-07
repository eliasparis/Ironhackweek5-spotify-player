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
	}

	function handleError(){
		console.log('Request wrong executed')
	}

	request.done(handleResult);
	request.fail(handleError);
}

$('#searchform').submit(getSong);