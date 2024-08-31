class LemonDisplay {
  constructor(element) {
    this.element = element;
    this.displayText = "lemon";
    this.render();
  }

  render() {
    this.element.textContent = this.displayText;
  }
}