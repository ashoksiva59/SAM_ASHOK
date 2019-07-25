import libCom from '../../../Common/Library/CommonLibrary';
import ODataDate from '../../../Common/Date/ODataDate';

export default function GetPostingDate(context) {
    let date = libCom.getControlProxy(context,'StartDatePicker').getValue();
    let odataDate = new ODataDate(date);
    return odataDate.toLocalDateString(context);
}
