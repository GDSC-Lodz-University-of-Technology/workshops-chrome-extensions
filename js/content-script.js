console.log("content script is working");

document
  .querySelectorAll(".w3-white")
  .forEach((element) => element.classList.remove("w3-white"));

const changeClases = (toDark) => {
  chrome.storage.sync.get(["elements"], (result) => {
    result.elements.forEach((layer, id) => {
      layer.forEach((path) => {
        document.querySelectorAll(path).forEach((element) => {
          if (toDark) {
            element.classList.add("extension-dark" + id);
          } else {
            element.classList.remove("extension-dark" + id);
          }
        });
      });
    });
  });
};

const changeColors = () => {
  chrome.storage.sync.get(["colors"], (result) => {
    for (const [key, value] of Object.entries(result)) {
      value.forEach((layer, id) => {
        document.documentElement.style.setProperty(
          `--colors-bg-extension-${id}`,
          layer.color
        );
        document.documentElement.style.setProperty(
          `--colors-txt-extension-${id}`,
          layer.text
        );
      });
    }
  });
};

const getTheme = () => {
  chrome.storage.sync.get(["dark"], (result) => {
    changeClases(result.dark);
  });
};

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.dark != undefined) {
    changeClases(changes.dark.newValue);
  } else {
    changeColors();
  }
});

changeColors();
getTheme();
