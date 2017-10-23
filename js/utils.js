const pageWrapper = document.querySelector(`.central`);

export const renderDom = (html) => {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content;
};

export const renderPage = (element) => {
  pageWrapper.innerHTML = ``;
  pageWrapper.appendChild(element);
};
