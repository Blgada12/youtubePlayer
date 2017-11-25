var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youtubeId;
var player;
var q_box;
var quals = [];
var vqual

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: youtubeId,

        playerVars: {
            rel: 0,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            modestbranding: 1,
            cc_load_policy: 1,
            enablejsapi: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackQualityChange': onPlayerQuality
        }
    });
}

function onPlayerQuality(event) {
    vqual = event.data
    q_box.value = vqual
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.ENDED:
            document.getElementById('info-buff').innerHTML = "";
            break;
        case YT.PlayerState.PLAYING:
            document.getElementById('info-buff').innerHTML = "";
            break;
        case YT.PlayerState.PAUSED:
            document.getElementById('info-buff').innerHTML = "";
            break;
        case YT.PlayerState.BUFFERING:
            document.getElementById('info-buff').innerHTML = "버퍼링 중";
            break;
        case YT.PlayerState.CUED:
            document.getElementById('info-buff').innerHTML = "";
            break;
    }
}

var playerclick = false;

function onPlayerReady(event) {
    player.setVolume(50);

    var playBtn = document.getElementById("play-btn");
    playBtn.addEventListener("click", function () {
        player.playVideo();
    });

    var pauseBtn = document.getElementById("pause-btn");
    pauseBtn.addEventListener("click", function () {
        player.pauseVideo();
    });

    var plus15 = document.getElementById("plus_15");
    plus15.addEventListener("click", function () {
        player.seekTo(player.getCurrentTime() + 15, true)
    });

    var minus15 = document.getElementById("minus_15");
    minus15.addEventListener("click", function () {
        player.seekTo(player.getCurrentTime() - 15, true)
    });

    var seekslider = document.getElementById("seekslider");
    seekslider.value = 50;
    seekslider.addEventListener('mousemove', function () {
        player.setVolume(seekslider.value);
    });

    var mute = document.getElementById("mute");
    mute.addEventListener("click", function () {
        if (player.isMuted()) {
            player.unMute()
            mute.value = "음소거";
        } else {
            player.mute()
            mute.value = "소리켜기";
        }
    });

    q_box = document.getElementById("qualbox");
    q_box.addEventListener('change', function () {
        if (vqual != q_box.value) {
            a= q_box.value + ""
            player.stopVideo()
            player.seekTo(player.getCurrentTime(), true)
            player.setPlaybackQuality(a)
        }
    });

    var seeksliderprog = document.getElementById("seeksliderprog");
    seeksliderprog.value = 0;
    seeksliderprog.max = player.getDuration();
    seeksliderprog.addEventListener('mousemove', function () {
        if (playerclick) {
            player.seekTo(seeksliderprog.value, false)
        }
    });


    seeksliderprog.addEventListener('mousedown', function () {
        playerclick = true;
    });
    seeksliderprog.addEventListener('mouseup', function () {
        playerclick = false;
        player.seekTo(seeksliderprog.value, true)
    });

    setInterval(updatePlayer, 250)
}


function updatePlayer() {
    if (player && player.getDuration) {
        if (!playerclick)
            seeksliderprog.value = player.getCurrentTime();
    }

    if(quals != player.getAvailableQualityLevels()) {
        if(player.getAvailableQualityLevels().length != 0) {
            quals = player.getAvailableQualityLevels()
            put = ""
            for(i = 0;i<quals.length;i++){
                put += "<option value=" + quals[i] + ">" + quals[i] + "</option>"
            }
            q_box.innerHTML = put
            q_box.value = vqual
        }

    }


}