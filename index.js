/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arr => {
    return arr.map(sub => createEmployeeRecord(sub))
}

const createTimeInEvent = function(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return this
}

const createTimeOutEvent = function(date) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return this
}

const hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(d => d.date === date)
    let timeOut = this.timeOutEvents.find(d => d.date === date)
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = (arr, name) => {
    return arr.find(obj => obj.firstName === name);
}

const calculatePayroll = function(arr) {
    return arr.reduce((s, v) => {
        return s + allWagesFor.call(v)
    }, 0)
}