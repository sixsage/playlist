// 2. This code loads the IFrame Player API code asynchronously.
function loadYoutubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //tag.onload = onVideoAPIReady;
}
loadYoutubeAPI();

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player
function onVideoAPIReady(videoID) {
    window.YT.ready(() => {
        player = new window.YT.Player('video', {
            videoId: videoID,
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onVideoStateChange          
            }
        });
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

function getVideoID(videoURL) {
  let videoID;
  if (videoURL.indexOf("=") != -1) {
    videoID = videoURL.substring(videoURL.indexOf("=") + 1);
  }
  return videoID;
}

var idArr = [];

function enterToAddVideoToQueue() {
  const linkInput = document.getElementById("link-input");

  linkInput.addEventListener("keypress", (e) => {
    let key = e.which || e.keyCode;

    if (key === 13) {
      idArr.push(getVideoID(linkInput.value));
      console.log(idArr);
      onVideoAPIReady(idArr[0]); //this plays the first video
    }
  });
}
enterToAddVideoToQueue();

function onVideoStateChange(event) {
  if (event.data == 0) { //when the video ends
    console.log(12);
    idArr.splice(0, 1);
    console.log(idArr);
    player.loadVideoById(idArr[0]);
  }
}