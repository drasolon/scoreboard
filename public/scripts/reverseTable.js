function reverseTable() {
  const tableRows = document.getElementsByClassName('sortable');
  const reversedRows = [];

  for (let i = tableRows.length - 1; i > -1; i -= 1) {
    reversedRows.push(tableRows[i]);
  }

  for ( let j = 0; j < reversedRows.length; j += 1) {
    tableRows[j].parentNode.insertBefore(reversedRows[j], tableRows[j]);
  }
}
