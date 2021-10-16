const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`; //Add 1 because month starts from 0
    let day = `${d.getDate()}`; //Get the day
    const year = `${d.getFullYear()}`; //Get the year

    //For month 0-9, we need to prepend 0 in front of the month, to make it,say 08 or 09
    if (month.length < 2) {
        month = `0${month}`
    }
    if (day.length < 2) {
        day = `0${day}`
    }

    return [year, month, day].join('-');
}

export default formatDate;