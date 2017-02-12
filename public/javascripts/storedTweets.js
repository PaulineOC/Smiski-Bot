document.addEventListener('DOMContentLoaded', init);
function init(){
	//Get Base64String for Images
	var req = new XMLHttpRequest();
	var url = 'http://localhost:3000/api/storeTweets';
	req.open('GET', url, true);
    req.addEventListener('load', handleImageString);
   req.send();
}

function handleImageString(){
	 if(this.status >= 200 && this.status < 400){
        var imageData = JSON.parse(this.responseText);
        var len=document.getElementsByClassName('tableRow').length;
        var allRows=document.getElementsByClassName('tweetImage');
        for(var i=0;i<len;i++){
        	var image = new Image();
			image.src = 'data:image/jpg;base64,'+ imageData[i].base64;
			image.setAttribute("height", "200px");
			var thisRow= allRows[i];
			thisRow.appendChild(image);
        }
	}
    else{
    	console.log(this.status);
    }
}