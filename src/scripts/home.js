function loadVideo() {
  console.info(`loadVideo called`);

  (function loadYoutubeIFrameApiScript() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    tag.onload = setupPlayer;
  })();

  let player = null;

  function setupPlayer() {
    /**
     * THIS FAILS!!!!!
     */
    // player = new YT.Player("player", {
    //   height: "390",
    //   width: "640",
    //   videoId: "M7lc1UVf-VE",
    //   events: {
    //     onReady: onPlayerReady,
    //     onStateChange: onPlayerStateChange
    //   }
    // });

    /**
     * Need to wait until Youtube Player is ready!
     *
     * YT.ready is not documented in https://developers.google.com/youtube/iframe_api_reference
     * but found from https://codesandbox.io/s/youtube-iframe-api-tpjwj
     */

    window.YT.ready(function () {
      player = new window.YT.Player("video", {
        videoId: "M7lc1UVf-VE",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    var videoStatuses = Object.entries(window.YT.PlayerState);
    console.log(videoStatuses.find((status) => status[1] === event.data)[0]);
  }
}

if (document.readyState !== "loading") {
  console.info(`document.readyState ==>`, document.readyState);
  loadVideo();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.info(`DOMContentLoaded ==>`, document.readyState);
    loadVideo();
  });
}
