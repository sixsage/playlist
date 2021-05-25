// 2. This code loads the IFrame Player API code asynchronously.
function loadYoutubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.onload = onYouTubeIframeAPIReady();
}
loadYoutubeAPI();

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onVideoAPIReady() {
    window.YT.ready(() => {
        let player = new window.YT.Player('video', {
            videoId: 'M7lc1UVf-VE',
            events: {
              'onReady': onPlayerReady,
            }
        });
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

