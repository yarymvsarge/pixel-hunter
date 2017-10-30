export const renderPage = (element) => {
  const pageWrapper = document.querySelector(`.central`);
  pageWrapper.innerHTML = ``;
  pageWrapper.appendChild(element);
};
