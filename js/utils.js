const pageWrapper = document.querySelector(`.central`);

export const renderDom = (html) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export const renderPage = (element) => {
  pageWrapper.innerHTML = ``;
  pageWrapper.appendChild(element);
};
