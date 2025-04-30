let containerDiv = document.querySelector("#container");

const body = document.querySelector("body");

let boxes = containerDiv.children;

let boxesArray = Array.from(boxes);

/** boxesArray.forEach((node) => {
  node.addEventListener(
    "click",
    () => {
      let nodeStyle = window.getComputedStyle(node);
      let backgroundColor = nodeStyle.getPropertyValue("background-color");

      body.style.setProperty("background-color", backgroundColor);
    },
    false
  );
});
 */
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
        let nodeStyle = window.getComputedStyle(boxes[i]);

        let backgroundColor = nodeStyle.getPropertyValue("background-color");

        body.style.setProperty("background-color", backgroundColor);

        if (backgroundColor === `rgb(16, 37, 66)`) {
            body.style.color = "white";
        } else {
            body.style.color = "black";
        }
    });
}
