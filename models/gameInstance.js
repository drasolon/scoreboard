const gameInstance = {
  name: '',
  rule: '',
  display: '',
  reset: () => {
    this.name = '';
    this.rule = '';
    this.display = '';
  }
};

module.exports = gameInstance;
