

var allLinks = [];
var visibleLinks = [];
var urls=[];

chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  if(visibleLinks){
    ursl = visibleLinks.filter(function(link) {
     return link.match("src");});
  console.log(ursl);
  for (var i = 0; i < ursl.length; ++i) {
  chrome.downloads.download({url: ursl[i]});
  }
  urls=[];
  visibleLinks = [];
  allLinks = [];
  }
});

function genericOnClick(info, tab) {
  
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });
}


  var id = chrome.contextMenus.create({"title": "Скачать контент...", "onclick": genericOnClick});

