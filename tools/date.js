/**
 * 
 * Dates by Luke Rieff.
 * 
 * All the letters in capital are in the name, small letters are the number
 * 
 * Configuration:
 * 
 * y: year.
 * M: month.
 * D: Day.
 * mi: Minute.
 * s: Second
 * 
 */

module.exports.genDate = function(format) {
    date = new Date();

    /**
     * Grabs the format
     */

    var result = '';

    format.forEach(function(item) {
        switch(item) {
            case 'y':   //Year in number
                result = result + ' ' + getYearNumber(date)
                break;
            case 'M':   //Month in name
                result = result + ' ' + getMonthName(date)
                break;
            case 'm':   //Month in number
                result = result + ' ' + getMonth(date)
                break;
            case 'D':   //Day in name
                result = result + ' ' + getDayName(date)
                break;
            case 'h':   //Day in number
                result = result + ' ' + getHour(date)
                break;
            case 'd':   //Day in number
                result = result + ' ' + getDay(date)
                break;
            case 'mi':   //Minute in number
                result = result + ' ' + getMinute(date)
                break;
            case 's':  //Second in number
                result = result + ' ' + getSecond(date)
                break;
            case ',':  //Second in number
                result = result + ','
                break;
        }
    })


    return result.substring(1, 999);
}

function getHour(date) {
    return date.getHours();
}

function getMinute(date) {
    return date.getMinutes();
}

function getSecond(date) {
    return date.getSeconds();
}

function getDay(date) {
    return date.getDay() + 1;
}

function getDayName(date) {
    switch(date.getDay()) {
        case 0:
            return 'Sunday'
            break;
        case 1:
            return 'Monday'
            break;
        case 2:
            return 'Tuesday'
            break;
        case 3:
            return 'Wednesday'
            break;
        case 4:
            return 'Thursday'
            break;
        case 5:
            return 'Friday'
            break;
        case 6:
            return 'Saturday'
            break;
    }
}

function getYearNumber(date) {
    return date.getFullYear();
}

function getMonth(date) {
    return date.getMonth() + 1;
}

function getMonthName(date) {
    switch(date.getMonth()) {
        case 0:
            return 'January'
            break;
        case 1:
            return 'February'
            break;
        case 2:
            return 'March'
            break;
        case 3:
            return 'April'
            break;
        case 4:
            return 'May'
            break;
        case 5:
            return 'June'
            break;
        case 6:
            return 'July'
            break;
        case 7:
            return 'August'
            break;
        case 8:
            return 'September'
            break;
        case 9:
            return 'October'
            break;
        case 10:
            return 'November'
            break;
        case 11:
            return 'December'
            break;
    }
}