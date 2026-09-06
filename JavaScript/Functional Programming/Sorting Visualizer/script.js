const arrayContainer = document.getElementById("array-container");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const startingArray = document.getElementById("starting-array");

const generateElement = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const generateArray = () => {
  return Array.from({ length: 5 }, generateElement);
};

const generateContainer = () => {
  return document.createElement("div");
};

const fillArrContainer = (containerElement, intArray) => {
  containerElement.innerHTML = "";
  intArray.forEach((num) => {
    const span = document.createElement("span");
    span.textContent = num;
    containerElement.appendChild(span);
  });
};

const isOrdered = (num1, num2) => {
  return num1 <= num2;
};

const swapElements = (intArray, index) => {
  if (!isOrdered(intArray[index], intArray[index + 1])) {
    [intArray[index], intArray[index + 1]] = [
      intArray[index + 1],
      intArray[index],
    ];
  }
};

const highlightCurrentEls = (element, index) => {
  const children = element.children;
  children[index].style.border = "2px dashed red";
  children[index + 1].style.border = "2px dashed red";
};

generateBtn.addEventListener("click", () => {
  Array.from(arrayContainer.children).forEach((child) => {
    if (child !== startingArray) child.remove();
  });
  fillArrContainer(startingArray, generateArray());
});

const bubbleSort = () => {
  highlightCurrentEls(startingArray, 0);

  let stillSwapping = true;

  while (stillSwapping) {
    const lastDiv = arrayContainer.lastElementChild;
    const beforePass = Array.from(lastDiv.children).map((span) =>
      Number(span.textContent),
    );
    const arr = [...beforePass];

    for (let i = 0; i < arr.length - 1; i++) {
      highlightCurrentEls(arrayContainer.lastElementChild, i);
      swapElements(arr, i);

      const stepContainer = generateContainer();
      fillArrContainer(stepContainer, arr);
      arrayContainer.appendChild(stepContainer);
    }

    stillSwapping = !beforePass.every((val, i) => val === arr[i]);
  }
};

sortBtn.addEventListener("click", () => {
  bubbleSort();
});