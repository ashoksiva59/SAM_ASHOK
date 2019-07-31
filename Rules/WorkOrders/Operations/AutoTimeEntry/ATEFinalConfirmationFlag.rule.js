import libCommon from '../../../Common/Library/CommonLibrary';

export default function ATEFinalConfirmationFlag(context) {

	// Get Confirmation Action
	var Action = libCommon.getStateVariable(context, 'ATEAction');

	if (Action == context.localizeText('stop')) {
		return true;
	} else {
		return;
	}

}