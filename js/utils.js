export const renderPage = (view) => {
  const pageWrapper = document.querySelector(`.central`);
  pageWrapper.innerHTML = ``;
  pageWrapper.appendChild(view.element);
};
