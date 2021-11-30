console.log('service worker is working');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!!tab.url)
    if (
      changeInfo.status === "complete" &&
      tab.url.includes("w3schools.com/")
    ) {
      chrome.scripting
        .insertCSS({
          target: { tabId: tabId },
          files: ["./css/style.css"],
        })
        .then(() => {
          console.log("css inserted");
        })
        .catch((err) => console.error("err: " + err));

      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          files: ["./js/content-script.js"],
        })
        .then(() => {
          console.log("script executed");
        })
        .catch((err) => console.error("err: " + err));
    }
});