import ODataDate from '../../../Common/Date/ODataDate';

export default function ATECurrentDate(context) {
	let odataDate = new ODataDate();
	return odataDate.toDBDateString(context);
}