function reverseTable() {
    let tableRows = document.getElementsByClassName('sortable');
    let reversedRows = [];

    for(let i = tableRows.length-1; i > -1; i--) {
        reversedRows.push(tableRows[i]);
    }

    for( let j = 0; j < reversedRows.length; j++) {
        tableRows[j].parentNode.insertBefore(reversedRows[j], tableRows[j])
    }
}