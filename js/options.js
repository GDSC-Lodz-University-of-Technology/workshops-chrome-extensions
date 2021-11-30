window.addEventListener("load", () => {
  chrome.storage.sync.get(["colors"], (result) => {
    document.querySelectorAll(".theme").forEach((t) => {
      console.log(t.dataset["name"]);
      t.querySelectorAll(".area").forEach((i, id) => {
        const inputs = i.querySelectorAll("input");
        inputs[0].value = result["colors"][id].color;
        inputs[1].value = result["colors"][id].text;
      });
    });
  });
});

document.querySelector("#submit").addEventListener("click", () => {
  let newColors = {};

  document.querySelectorAll(".theme").forEach((t) => {
    newColors["colors"] = [];
    t.querySelectorAll(".area").forEach((i, themeId) => {
      const inputs = i.querySelectorAll("input");
      newColors["colors"].push({
        color: inputs[0].value,
        text: inputs[1].value,
      });
    });
  });

  chrome.storage.sync.set(newColors, function () {
    console.log("colors changed");
  });
});
