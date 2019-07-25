import libCom from '../../../Common/Library/CommonLibrary';
import GetStartDateTime from './GetStartDateTime';
import GetEndDateTime from './GetEndDateTime';
import ODataDate from '../../../Common/Date/ODataDate';

/**
 * 
 * @param {*} context 
 */
export default function IsValidConfirmation(context) {

    
    let binding = context.getBindingObject();

    if (binding.OrderID.length === 0) {
        return false;
    }

    let now = new Date();
    let start = GetStartDateTime(context);

    let errMessages = [];
    // If trying to start in the future, not valid
    if (start > now) {
        let invalidStart = context.localizeText('confirmation_validation_invalid_start');
        errMessages.push(invalidStart);
        let title = context.localizeText('confirmation_validation_dates_title');
        let separator = context.localizeText('confirmation_validation_message_separator');
        let message = errMessages.join(separator);
    
        return libCom.showErrorDialog(context, message, title);
    }


    let endDateTime = GetEndDateTime(context);

    //convert end date and time to backend date
    let dbEndDate = convertDateTimeToDBDate(context, endDateTime);

    //convert current date and time to backend date
    let currentDBDate = convertDateTimeToDBDate(context, now);

	//backend will not allow posting of labor time if the date is in the future
    if (dbEndDate > currentDBDate) {

        let invalidEnd = context.localizeText('confirmation_validation_invalid_endtime');
        errMessages.push(invalidEnd);
        let title = context.localizeText('confirmation_validation_dates_title');
        let separator = context.localizeText('confirmation_validation_message_separator');
        let message = errMessages.join(separator);
    
        return libCom.showErrorDialog(context, message, title);
    }

    return true;
}

function convertDateTimeToDBDate(context, dateTime) {
    let offset = new Date().getTimezoneOffset() * 60 * 1000;

    let dateTimeInUTC = dateTime.getTime() + offset;
    let odateDateTimeInUTC = new ODataDate(dateTimeInUTC);
    let dbDateTime = odateDateTimeInUTC.toDBDate(context);
    return new Date(dbDateTime.getFullYear(), dbDateTime.getMonth(), dbDateTime.getDate());
}
