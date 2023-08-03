class superMan {
  constructor(sname) {
    this.sname = sname;
  }

  getName() {
    return this.sname;
  }
  setName(sname) {
    this.sname = sname;
  }
}

module.exports = new superMan("Super Man");
