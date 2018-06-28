exports.formatDate = function formatDate(date) {
  const diff = new Date() - date;
  // If the time difference is < to 1 min
  if (diff < 60000) {
    return 'right now';
  }

  // If the time difference is between 1 min and 1 hour
  const min = Math.floor(diff / 60000);
  if (min < 60) {
    return `${min} min. ago`;
  }

  // If the time difference is between 1 hour and 1 day
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  // format the date
  // add zeroes to single-digit day/month/hours/minutes
  let d = date;
  d = [
    `0${d.getDate()}`,
    `0${d.getMonth() + 1}`,
    `${d.getFullYear()}`,
    `0${d.getHours()}`,
    `0${d.getMinutes()}`
  ].map(component => component.slice(-2)); // take last 2 digits of every component

  // join the components into date
  return d.slice(0, 3).join('.'); /* + ' at ' + d.slice(3).join(':'); */
};
