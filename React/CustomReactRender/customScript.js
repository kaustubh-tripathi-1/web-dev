function customRender(reactElement, container) {
    const newElement = document.createElement(reactElement.type);
    for (let [attribute, value] of Object.entries(reactElement.props)) {
        newElement.setAttribute(attribute, value);
    }
    newElement.setAttribute(attribute, value);
    newElement.innerHTML = reactElement.children;
    container.append(newElement);
}

const reactElement = {
    type: `a`,
    key: null,
    props: {
        href: `https://google.com/`,
        target: `_blank`,
    },
    children: `Click to visit Google`,
};

const mainContainer = document.querySelector(`#root`);

customRender(reactElement, mainContainer);
