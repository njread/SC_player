//njr sound cloud player


var UI = {};
var soundcloudAPI = {};

UI.enterclick = function (text){
    var text = document.getElementById('input1').value;
    console.log(text);
    soundcloudAPI.getTracks(text);
}

UI.submitclick = function(){

}

soundcloudAPI.init = function() {

 SC.initialize({
 	client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
 });
}
soundcloudAPI.init();

soundcloudAPI.getTracks = function(text){
 SC.get('/tracks',{
 	q: text,
 }).then(function(tracks){
 	console.log(tracks);
 	soundcloudAPI.renderTracks(tracks);
 });
}
 	

soundcloudAPI.renderTracks = function(tracks){
		tracks.forEach(function(track){
	//card 
		var card = document.createElement('div');
	    card.classList.add('card');
	//image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');
		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'https://www.google.com/search?q=soundcloud+images&tbm=isch&source=iu&ictx=1&fir=RixX7lwVowDv1M%253A%252CIQLLZRYcgEh9MM%252C_&usg=__GUYYw38kd63GGrRByNpWxrjaIcE%3D&sa=X&ved=0ahUKEwinpv3w2eHXAhUsyoMKHX2rDp8Q9QEIKjAA#imgrc=RixX7lwVowDv1M';
		imageDiv.appendChild(image_img);
	//content 
		var content = document.createElement('div');
		content.classList.add('content');
		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';
	//button
		var button = document.createElement('div');
		button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');
		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to playlist';
	//appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
		soundcloudAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);
		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);

		});

}

soundcloudAPI.getEmbed = function(trackURL){
console.log("click");
SC.oEmbed(trackURL, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
  var sideBar = document.querySelector('.js-playlist');

  var box = document.createElement('div');
  box.innerHTML = embed.html;
  sideBar.insertBefore(box, sideBar.firstChild);
  localStorage.setItem("key", sideBar.innerHTML);
});
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");






