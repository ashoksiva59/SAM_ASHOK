export default function DocumentCreateFilename() {
    const now = new Date();
    const year = now.getFullYear();
  
    let month = now.getMonth() + 1;
    if (Number(month) < 10) month = '0' + month;
  
    let day = now.getDate();
    if (Number(day) < 10) day = '0' + day;
  
    let hours = now.getHours();
    if (Number(hours) < 10) hours = '0' + hours;
  
    let minutes = now.getMinutes();
    if (Number(minutes) < 10) minutes = '0' + minutes;

    let seconds = now.getSeconds();
    if (Number(seconds) < 10) seconds = '0' + seconds;

    return year + '.' + month + '.' + day + '-' + hours + ':' + minutes + ':' + seconds + '.jpg';
}
