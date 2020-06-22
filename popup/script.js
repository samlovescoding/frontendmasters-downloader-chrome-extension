$(document).ready(function(){
    $(".hideOnClick").hide()
    $("#search-for-video").on("click", function(){
        $(".hideOnClick").hide()
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "searchVideo"
            })
        })
    })
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if(request.action == "videoFound"){
            $(".videoFound").show()
            src = request.src
            video = request.video
            course = request.course
            index = request.index
            extension = src.split(".").pop().split(/\#|\?/g)[0]
            filename = "Frontend Masters/" + course + "/" + index + ". " + video + "." + extension
            chrome.downloads.download({
                url: src,
                filename: filename
            });
        }else if(request.action == "videoNotFound"){
            $(".videoNotFound").show()
        }
    })
})