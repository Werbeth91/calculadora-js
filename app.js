//função fabrica que retorna um objeto com as funcionalidades da minha calculadora
function criandoCalculadora() {
  return {
    display: document.querySelector(".display"),

    iniciar() {
      this.btnClick();
      this.pressEnter();
    },
    pressEnter() {
      this.display.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          this.realizarCalculo();
        }
      });
    },
    limparDisplay() {
      this.display.value = "";
    },
    deletarElemento() {
      this.display.value = this.display.value.slice(0, -1);
    },
    realizarCalculo() {
      let calculo = this.display.value;
      try {
        calculo = eval(calculo);
        if (!calculo) {
          alert("Cálculo Inválido");
        }
        this.display.value = calculo;
      } catch (e) {
        alert("Cálculo Inválido");
        return;
      }
    },
    btnClick() {
      document.addEventListener("click", (e) => {
        const element = e.target;
        if (element.classList.contains("btn-num")) {
          this.valoresParaDisplay(element.innerText);
        }
        if (element.classList.contains("btn-limpar")) {
          this.limparDisplay();
        }
        if (element.classList.contains("btn-delete")) {
          this.deletarElemento();
        }
        if (element.classList.contains("btn-igual")) {
          this.realizarCalculo();
        }
      });
    },
    valoresParaDisplay(valor) {
      this.display.value += valor;
    },
  };
}

const calculadora = criandoCalculadora();
calculadora.iniciar();
