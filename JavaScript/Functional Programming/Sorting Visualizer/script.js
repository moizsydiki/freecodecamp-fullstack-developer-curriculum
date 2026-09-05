const generateElement = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const generateArray = () => {
  return Array.from({ length: 5 }, () => generateElement());
};

const generateContainer = () => {
  return document.createElement("div");
};

const fillArrContainer = (containerElement, intArray) => {
  containerElement.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.textContent = intArray[i];
    containerElement.appendChild(span);
  }
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
    return true;
  }
  return false;
};

const highlightCurrentEls = (element, index) => {
  const children = element.children;
  if (children[index]) {
    children[index].style.border = "2px dashed red";
  }
  if (children[index + 1]) {
    children[index + 1].style.border = "2px dashed red";
  }
};

const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const arrayContainer = document.getElementById("array-container");
const startingArray = document.getElementById("starting-array");

generateBtn.addEventListener("click", () => {
  Array.from(arrayContainer.children).forEach((child) => {
    if (child !== startingArray) child.remove();
  });

  const randomArray = generateArray();
  fillArrContainer(startingArray, randomArray);
});

sortBtn.addEventListener("click", () => {
  Array.from(arrayContainer.children).forEach((child) => {
    if (child !== startingArray) child.remove();
  });

  const spans = startingArray.querySelectorAll("span");
  const arr = Array.from(spans, (span) => Number(span.textContent));

  highlightCurrentEls(startingArray, 0);

  let isFirstComparison = true;
  let swapped;

  do {
    swapped = false;

    for (let j = 0; j < arr.length - 1; j++) {
      if (isFirstComparison) {
        isFirstComparison = false;
      } else {
        const stepContainer = generateContainer();
        fillArrContainer(stepContainer, arr);
        highlightCurrentEls(stepContainer, j);
        arrayContainer.appendChild(stepContainer);
      }

      if (swapElements(arr, j)) swapped = true;
    }
  } while (swapped);
});
