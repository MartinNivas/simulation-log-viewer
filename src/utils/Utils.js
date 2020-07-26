
export default class Utils {

    millisToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    calculatePercentage(val, total) {
        return Math.floor(100 - ((val / total) * 100));
    }

    convertToMinTimeFormat(val) {
        let str;
        if(val.length === 1) {
            str = '0' + val;
            console.log(str);
        } else {
            str = val;
        }
        return str + ":" + 0 + 0;
    }

    millisToMin(millis) {
        var minutes = Math.floor(millis / 60000);
        return minutes;
    }
}
