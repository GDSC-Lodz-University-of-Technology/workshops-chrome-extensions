console.log('content script is working');

const elements = [
        ["#main", ".exerciseprecontainer", "#quizcontainer"],
        [
          "body > div.w3-bar.w3-card-2.notranslate",
          "#belowtopnav > div.w3-row",
          ".w3-panel",
          ".exercisewindow",
          ".radiocontainer"
        ],
        [".w3-example", "#leftmenuinnerinner", "#right", "#footer"]
      ];



const changeClases = (toDark) => {

    elements.forEach((layer, id) => {
        layer.forEach((path) => {
          document.querySelectorAll(path).forEach((element) => {
              console.log(element);
            if (toDark) {
              element.classList.add("extension-dark" + id);
            } else {
              element.classList.remove("extension-dark" + id);
            }
          });
        });
      });

}

changeClases(true);