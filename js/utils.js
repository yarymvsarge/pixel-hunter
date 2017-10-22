export const getDomFromHtml = (html) => {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content;
};

export const generatePage = (element) => {
  const mainCentralNode = document.querySelector(`.central`);
  mainCentralNode.innerHTML = ``;
  mainCentralNode.appendChild(element);
};


