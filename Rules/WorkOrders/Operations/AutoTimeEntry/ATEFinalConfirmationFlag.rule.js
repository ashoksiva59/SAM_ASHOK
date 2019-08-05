import libCommon from '../../../Common/Library/CommonLibrary';
export default function ATEFinalConfirmationFlag(context) {
	// Get Confirmation Action
	var Action = libCommon.getStateVariable(context, 'ATEAction');
	var isFinalConfirmation;
	if (Action == context.localizeText('stop')) {
		isFinalConfirmation = 'X'
	}
	return isFinalConfirmation ? 'X' : '';

}