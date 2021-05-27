// 2. This code loads the IFrame Player API code asynchronously.
// function loadYoutubeAPI() {
//   const tag = document.createElement("script");
//   tag.src = "https://www.youtube.com/iframe_api";

//   const firstScriptTag = document.getElementsByTagName("script")[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//   //tag.onload = onVideoAPIReady;
// }
// loadYoutubeAPI();

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var videoQueue = [];

function getVideoId(videoURL) {
  let videoID;
  if (videoURL.indexOf("=") != -1) {
    videoID = videoURL.substring(videoURL.indexOf("=") + 1);
  }
  return videoID;
}

var player;

function youtubeVideoAPI() {
  player = new window.YT.Player("video", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.cueVideoById({
    videoId: videoQueue[0],
  });

  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    videoQueue.splice(0, 1);
    player.loadVideoById(videoQueue[0]);
  }
}

function submitVideo() {
  const input = document.getElementById("link-input");

  input.addEventListener("keypress", (e) => {
    let key = e.which || e.keyCode;

    if (key === 13) {
      let videoId = getVideoId(input.value);
      videoQueue.push(videoId);

      if (videoQueue.length === 1) {
        player.loadVideoById(videoQueue[0]);
      }
    }

    input.value = "";
  });
}

submitVideo();

setTimeout(() => {
  youtubeVideoAPI();
}, 1000);
