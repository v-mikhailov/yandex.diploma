export default class Validation {
  constructor(form) {
    this.form = form;
    this._submitBttn = this.form.elements.button__submit;
    this._isValidform = true;
    this.sendForm = this.sendForm.bind(this);
  }

  sendForm() {
    const input = Array.from(this.form.elements);
    input.forEach((elem) => {
      if (elem.id !==  this._submitBttn.id) {
        if (!this.validate(elem)) {
          this._isValidform = false;
        }
      }
    })
    if (this._isValidform) {
      return this.form.query.value;
    } else {
      this._isValidform = true;
      return false;
    }
  }

  validate(elem) {
    if (!elem.checkValidity()) {
      return false;
    }
    return true;
  }
}