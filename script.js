var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youtubeId;
var player;
var q_box;
var quals = [];
var vqual
var isPlaying = false;
var isFull = false;
var isMute = false;
var playBtn;
var cont;
var playerclick = false;
var customControl;
var v_long = 0;
var volum;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
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
            'onPlaybackQualityChange': onPlayerQuality,
            'onApiChange':onCaption
        }
    });
}

function onPlayerQuality(event) {
    vqual = event.data
    q_box.value = vqual
}

function fullScreen() {
    isFull = true
    if (cont.requestFullscreen) {
        cont.requestFullscreen();
    } else if (cont.webkitRequestFullscreen) {
        cont.webkitRequestFullscreen();
    } else if (cont.mozRequestFullScreen) {
        cont.mozRequestFullScreen();
    } else if (cont.msRequestFullscreen) {
        cont.msRequestFullscreen();
    }
}
function exitFS() {
    isFull = false
    if (document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if(document.webkitCancelFullScreen ) {
        document.webkitCancelFullScreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE
    }
}


function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.ENDED:
            playBtn.src = "./img/play_now.png"
            isPlaying = false;
            break;
        case YT.PlayerState.PLAYING:
            playBtn.src = "./img/Pause.png"
            isPlaying = true;
            break;
        case YT.PlayerState.PAUSED:
            playBtn.src = "./img/play_now.png"
            isPlaying = false;
            break;
        case YT.PlayerState.BUFFERING:
            break;
        case YT.PlayerState.CUED:
            break;
    }
}


var cu_show2 = "";
function onPlayerReady(event) {
    cont = document.getElementById("container")
    player.setVolume(50);

    playBtn = document.getElementById("play-btn");
    playBtn.addEventListener("click", function () {
        if(isPlaying){
            player.pauseVideo();
            playBtn.src = "./img/play_now.png"
        }
        else{
            player.playVideo()
            playBtn.src = "./img/Pause.png"
        }

    });


    var plus15 = document.getElementById("plus_15");
    plus15.addEventListener("click", function () {
        player.seekTo(player.getCurrentTime() + 15, true)
    });

    var minus15 = document.getElementById("minus_15");
    minus15.addEventListener("click", function () {
        player.seekTo(player.getCurrentTime() - 15, true)
    });
    volum = 50;
    var seekslider = document.getElementById("seekslider");
    seekslider.value = volum;
    seekslider.addEventListener('mousemove', function () {
        volum = seekslider.value;
        player.setVolume(volum);
        if(!isMute) {
            if (seekslider.value >= 50)
                mute.src = "./img/Sound_loud.png"
            else
                mute.src = "./img/sound_small.png"
        }
    });

    var mute = document.getElementById("mute");
    mute.addEventListener("click", function () {

        if (player.isMuted()) {
            player.unMute()
            isMute = false;
            player.setVolume(volum);
            if (seekslider.value >= 50)
                mute.src = "./img/Sound_loud.png"
            else
                mute.src = "./img/sound_small.png"
        } else {
            player.mute()
            mute.src = "./img/Not_Found_sound.png"
            isMute = true;
        }
    });
    customControl =  document.getElementById("customControl")
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
    seeksliderprog.max = player.getDuration()-1;
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

    var fullbtn = document.getElementById("full");
    fullbtn.addEventListener("click", function () {
        if(isFull) {
            exitFS()
            player.setSize(640, 360)
            customControl.style.width = "640px"
            cont.style.width = "640px"
            cont.style.height = "471px"
        }
        else{
            fullScreen()
            player.setSize(screen.width, screen.height-106)
            cont.style.width = screen.width+"px"
            cont.style.height = screen.height+"px"
            customControl.style.width = screen.width+"px"
        }
    });
    setInterval(updatePlayer, 100)
    if(player.getDuration()%60>=1){
        v_long = 1
        if( Math.round(player.getDuration()%60)<10){
            cu_show2 = "0" + Math.round(player.getDuration() % 60)-1 + ""
        }
        else {
            cu_show2 = Math.round(player.getDuration() % 60)-1 + ""
        }
    }

    if(player.getDuration()/60%60>=1){
        v_long = 2
        if(Math.round(player.getDuration()/60%60)<10)
            cu_show2 =  "0"+Math.round(player.getDuration()/60%60)+":"+cu_show2
        else
            cu_show2 =  Math.round(player.getDuration()/60%60)+":"+cu_show2
    }
    if(player.getDuration()/60/60>=1){
        v_long = 3
        cu_show2 =  Math.round(player.getDuration()/60/60)+":"+cu_show2
    }

    player.playVideo()
}

var cu_show;



function updatePlayer() {
    if (player && player.getDuration) {
        if (!playerclick)
            seeksliderprog.value = player.getCurrentTime();
    }

    if(quals != player.getAvailableQualityLevels()) {
        if (player.getAvailableQualityLevels().length != 0) {
            quals = player.getAvailableQualityLevels()
            put = ""
            for (i = 0; i < quals.length; i++) {
                put += "<option value=" + quals[i] + ">" + qualin(quals[i]) + "</option>"
            }
            q_box.innerHTML = put
            q_box.value = vqual
        }

    }
    var Currentprocess = document.getElementById("process");
    cu_show = ""
    if(v_long == 3) {
        cu_show += Math.round(player.getCurrentTime() / 60 / 60) + ":"
    }
    if(v_long >= 2) {
        if (Math.round(player.getCurrentTime() / 60 % 60) < 10)
            cu_show += "0"
        cu_show += Math.round(player.getCurrentTime() / 60 % 60) + ":"
    }
    if(Math.round(player.getCurrentTime()%60)<10)
        cu_show+="0"
    cu_show += Math.round(player.getCurrentTime()%60)
    Currentprocess.innerHTML=cu_show + " / " + cu_show2
    if(isFull) {
        if (window.innerHeight != screen.height) {
            isFull = false
            player.setSize(640, 360)
            customControl.style.width = "640px"
            cont.style.width = "640px"
            cont.style.height = "471px"
        }
    }
    else{
        if (window.innerHeight == screen.height) {
            isFull = true
            player.setSize(screen.width, screen.height-106)
            cont.style.width = screen.width+"px"
            cont.style.height = screen.height+"px"
            customControl.style.width = screen.width+"px"
        }
    }


}
function onCaption() {
    console.log(player.getOptions())
    if(player.getOptions().indexOf("captions") != -1){
        console.log(player.getOptions('captions'))
        document.getElementById("cap").style.visibility = "visible"
    }

}
function qualin(qual) {
    switch (qual){
        case "hd1080":
            return "1080p"
        case "hd720":
            return "720p"
        case "large":
            return "480p"
        case "medium":
            return "360p"
        case "small":
            return "240p"
        case "tiny":
            return "144p"
        case "auto":
            return "자동"
    }
}


