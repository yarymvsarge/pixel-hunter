window.main = function () {
  const mainCentralNode = document.querySelector(`.central`);
  const templatesNodeList = document.querySelectorAll(`template`);

  let currentScreen = 0;

  document.addEventListener(`keyup`, (evt) => {
    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;

    if (evt.altKey) {
      if (evt.keyCode === KEY_LEFT) {
        evt.preventDefault();
        showScreen(currentScreen - 1);
      } else if (evt.keyCode === KEY_RIGHT) {
        evt.preventDefault();
        showScreen(currentScreen + 1);
      }
    }
  });
  /**
   * Показать содержимое экрана в теге main.
   * @param {number} index - индекс экрана в списке экранов.
   */
  const showScreen = (index = 0) => {
    // проверка на крайние значения массива
    if (index > templatesNodeList.length - 1 || index < 0) {
      return;
    }
    currentScreen = index;
    mainCentralNode.innerHTML = ``;
    mainCentralNode.appendChild(templatesNodeList[index].content.cloneNode(true));
  };

  showScreen(currentScreen);
}();
