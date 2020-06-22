function searchVideo(){
    videoElement = $("#vjs_video_3_html5_api")
    var globalIndex = 1
    $(".FMPlayerScrolling [class^=item-]").each(function(index){
        activeItem = $("." + $(this).attr("class") + " .active")[0]
        if(activeItem != null){
            globalIndex = index
        }
    })
    globalIndex++
    courseName = $(".FMPlayerNavBreadcrumb .breadcrumb:nth-last-child(2) .text").text()
    videoName = $(".FMPlayerNavBreadcrumb .breadcrumb:nth-last-child(1) .text").text()
    if(videoElement != null && videoElement[0] != null){
        videoElement[0].pause()
        videoSrc = videoElement.attr("src");
        chrome.runtime.sendMessage({
            action: "videoFound",
            src: videoSrc,
            course: courseName,
            video: videoName,
            index: globalIndex
        })
    }else{
        chrome.runtime.sendMessage({
            action: "videoNotFound"
        })
    }
}

function pageDownload(){
    setTimeout(()=>{
        videoElement = $("#vjs_video_3_html5_api")
        if(videoElement != null && videoElement[0] != null){
            videoElement[0].pause()
            choices = [60, 100, 120, 180]
            waitTime = choices[Math.floor(Math.random() * choices.length)]
            searchVideo()
            setTimeout(() => {
                videoElement[0].currentTime = videoElement[0].duration - 5
                videoElement[0].play()
            }, waitTime * 1000);
            setTimeout(() => {
                pageDownload()
            }, (waitTime * 1000) + (20 * 1000))
        }
    }, 5000)
}

$(document).ready(function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if(request.action == "searchVideo"){
            searchVideo()
        }
        if(request.action == "downloadVideo"){
            pageDownload()
        }
    })

    pageDownload()
    

    $(".vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button").on("click", function(e){
        e.preventDefault()
        searchVideo()
    })
})