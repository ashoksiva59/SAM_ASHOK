import dateTime from './CharacteristicsFormatBackendTimeToLocal';

export default function CharacteristicsTimeDisplayValue(context,time) {
    var timeString = time.toString();
    // Need to check if the time string is not '0' or dummy value which 
    // would be in form of 10000000000000000
    if (timeString !== '0' && timeString.length < 7) {
        if (timeString.length < 6) {
            timeString = '0'+timeString;
        }
        return context.formatTime(dateTime(context, timeString));
    }
    return '0';
}
