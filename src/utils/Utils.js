
export default class Utils {

    millisToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    calculatePercentage(val, total) {
        return Math.floor(100 - ((val/total) * 100));
    }
}
    