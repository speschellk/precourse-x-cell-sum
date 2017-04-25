const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTH, createTD } = require('./dom-util');

class TableView {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.initDomReferences();
    this.renderTable();
  }

  initDomReferences() {
    this.headerRowEl = document.querySelector('THEAD');
    this.sheetBodyEl = document.querySelector('TBODY');
    this.sumBodyEl = document.querySelector('TBODY');
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
    this.renderTableSum();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th))
  }

  renderTableBody() {
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++) {
      const tr = createTR();
      for (let col = 0; col < this.model.numCols; col++) {
        const position = { col: col, row: row };
        const value = this.model.getValue(position);
        const td = createTD(value);
        tr.appendChild(td);
      }
      fragment.appendChild(tr);
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
  }


  renderTableSum() {
    const fragment = document.createDocumentFragment();
    const tr = createTR();
    
    for (let col = 0; col < this.model.numCols; col++) {
      const position = { col: col };
      const value = 'NO VALUE';
      const td = createTD(value);
      tr.appendChild(td) ;
    }
    fragment.appendChild(tr);

    this.sumBodyEl.appendChild(fragment);
  }
  
}

module.exports = TableView;