//selecnanto os elementos html
const buttonsNumber = document.querySelectorAll(".buttonNumber");
const buttonOperators = document.querySelectorAll(".operator");
const buttonClean = document.querySelector(".buttonClean");
const buttonCalc = document.querySelector(".buttonCalc");
const buttonDel = document.querySelector(".buttonDel");
const displayPreviewElement = document.querySelector(".displayPreview");
const displayCurrentElement = document.querySelector(".displayCurrent");

//classe calculadora
class Calculator {
  constructor(displayPreviewElement, displayCurrentElement) {
    this.displayPreviewElement = displayPreviewElement;
    this.displayCurrentElement = displayCurrentElement;
    this.clean();
  }
  //método que faz os calculos
  theCalculation() {
    let result;

    const displayPreviewFloat = parseFloat(this.displayPreview);
    const displayCurrentFloat = parseFloat(this.displayCurrent);

    if (isNaN(displayPreviewFloat) || isNaN(displayCurrentFloat)) return;

    switch (this.operation) {
      case "+":
        result = displayPreviewFloat + displayCurrentFloat;
        break;
      case "-":
        result = displayPreviewFloat - displayCurrentFloat;
        break;
      case "*":
        result = displayPreviewFloat * displayCurrentFloat;
        break;
      case "/":
        result = displayPreviewFloat / displayCurrentFloat;
        break;

      default:
        return;
    }

    this.displayCurrent = result;
    this.operation = undefined;
    this.displayPreview = "";
  }
  //método que seleciona o operador do cálculo
  selectOperator(operation) {
    if (this.displayCurrent === "") return;
    if (this.displayPreview !== "") {
      this.theCalculation();
    }
    this.operation = operation;

    this.displayPreview = this.displayCurrent;
    this.displayCurrent = "";
  }
  //métod formata o numero em casas decimais
  formatNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  //método que adiciona o numero digitado ao display
  addNumberDisplay(number) {
    if (this.displayCurrent.includes(".") && number === ".") return;
    this.displayCurrent = `${this.displayCurrent}${number.toString()}`;
  }
  //método que limpa o display
  clean() {
    this.displayPreview = "";
    this.displayCurrent = "";
    this.operation = undefined;
  }
  //método que atualiza o display
  updateDisplay() {
    this.displayPreviewElement.innerText = `${this.formatNumber(
      this.displayPreview
    )} ${this.operation || ""}`;
    this.displayCurrentElement.innerText = this.formatNumber(
      this.displayCurrent
    );
  }
  //método que deleta apenas um digito do display
  delete() {
    this.displayCurrent = this.displayCurrent.toString().slice(0, -1);
  }
}

//intância a classe calculadora
const calculator = new Calculator(displayPreviewElement, displayCurrentElement);

//Adicionando eventos no botões da calculadora
for (const buttonNumber of buttonsNumber) {
  buttonNumber.addEventListener("click", () => {
    calculator.addNumberDisplay(buttonNumber.innerText);
    calculator.updateDisplay();
  });
}
for (const operatorButton of buttonOperators) {
  operatorButton.addEventListener("click", () => {
    calculator.selectOperator(operatorButton.innerText);
    calculator.updateDisplay();
  });
}
buttonClean.addEventListener("click", () => {
  calculator.clean();
  calculator.updateDisplay();
});

buttonCalc.addEventListener("click", () => {
  calculator.theCalculation();
  calculator.updateDisplay();
});

buttonDel.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
