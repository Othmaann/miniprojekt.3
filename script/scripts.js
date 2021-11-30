
const KEY = 'd33dbfe4b42731455fa69b8e54f12010';
document.querySelector("header nav form").addEventListener('submit', function(event){
    event.preventDefault();
    usersearch()
});

function fetchURL(url, callback, parameter) {

    fetch(url).then(
        function(response){
            if(response.status >= 200 && response.status <300){
                return response.json();
            }
            else{
                throw 'Fetch failed';
            }
        }).then(function(data){
            callback(data, parameter);})
        .catch((error) => errors(error));
}

function errors(error){
    console.log(error)
    document.querySelector("main figure h1").innerHTML = 
    `An error has accured, please try refreshing <br> 
    If this problem persist please contact support
    <br>Error: ${error}`;
}

//Flickr galleri 
function usersearch() {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${KEY}&text=${document.querySelector("#flickr-search").value}&media=photos&per_page=${document.querySelector("#flickr-number").value}&format=json&nojsoncallback=1`;
    fetchURL(url, getimage, document.querySelector("header nav form select").value);
}

function getimage(json, size){
    console.log(json)
    for(let i = 0; i < Object.keys(json.photos.photo).length; i++) {
        console.log(`https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`);

        document.querySelector("main figure").appendChild(document.createElement("img")).src = `https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`;
    }
    if(size==="m"){
        document.querySelector("main figure").style.height="240px"
    }
    else if(size==="z"){
        document.querySelector("main figure").style.height="640px"
    }
    else if(size==="b"){
        document.querySelector("main figure").style.height="1024px"

    }
    pictureSlide()
}


// Picture slide från w3schools
function pictureSlide() {
    var slideIndex = 0;
    carousel();
    
    function carousel() {
      var i;
      var x = document.querySelectorAll("main figure img");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      setTimeout(carousel, 3000);
    }
}





