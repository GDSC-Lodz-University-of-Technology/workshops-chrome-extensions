console.log("service worker is working");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    dark: true,
    colors: [
      {
        color: "#333333",
        text: "#eeeeee",
      },
      {
        color: "#000000",
        text: "#eeeeee",
      },
      {
        color: "#555555",
        text: "#eeeeee",
      },
    ],
    elements: [
      ["#main", ".exerciseprecontainer", "#quizcontainer"],
      [
        "body > div.w3-bar.w3-card-2.notranslate",
        "#belowtopnav > div.w3-row",
        ".w3-panel",
        ".exercisewindow",
        ".radiocontainer",
      ],
      [".w3-example", "#leftmenuinnerinner", "#right", "#footer"],
    ],
  });
  chrome.action.setBadgeText({ text: "ON" });
});

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
