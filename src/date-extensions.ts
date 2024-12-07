export { };

Date.prototype.addDays = function(days: number): Date {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addYears = function(years: number): Date {
    var date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return date;
}

Date.prototype.getMonthPretty = function(): string {
    var date = new Date(this.valueOf());
    var month = date.getMonth() + 1;
    return ("0" + month).slice(-2);
}

Date.prototype.weeksUntil = function(limitDate: Date): number {
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.round((limitDate.getTime() - this.getTime()) / millisecondsPerWeek);
}
