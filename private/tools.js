exports.formatDate = function(date) {
    let diff = new Date() - date;

    // If the time difference is < to 1 min
    if (diff < 1000) {
        return 'right now'
    }

    // Convert diff to seconds
    let sec = Math.floor(diff / 1000);

    if (sec < 60) {
        return sec + ' sec. ago';
    }

    // Convert diff to minutes
    let min = Math.floor(diff / 60000);
    if (min < 60) {
        return min + ' min. ago';
    }

    // Convert to hours
    let hours = Math.floor(diff / 1440000)
    if (hours < 1440 ) {
        return hours + ' hours ago';
    }

    // format the date
    // add zeroes to single-digit day/month/hours/minutes
    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // take last 2 digits of every component

    // join the components into date
    return d.slice(0, 3).join('.') /* + ' at ' + d.slice(3).join(':'); */
}