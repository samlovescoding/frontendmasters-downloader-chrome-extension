chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.action == "videoFound"){
        src = request.src
        video = request.video.replace(/[^a-zA-Z0-9]/gi, '_')
        course = request.course.replace(/[^a-zA-Z0-9]/gi, '_')
        index = request.index
        extension = src.split(".").pop().split(/\#|\?/g)[0]
        filename = "Frontend Masters/" + course + "/" + index + ". " + video + "." + extension
        chrome.downloads.download({
            url: src,
            filename: filename
        });
    }
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(){
    chrome.runtime.sendMessage({
        action: "downloadVideo"
    })
})