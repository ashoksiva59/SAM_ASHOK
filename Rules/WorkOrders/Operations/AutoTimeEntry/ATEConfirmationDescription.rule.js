import libCommon from '../../../Common/Library/CommonLibrary';
export default function ATEConfirmationDescription(context) {
	// Get Confirmation Action
	var Action = libCommon.getStateVariable(context, 'ATEAction');

	if (Action == context.localizeText('start')) {
		return 'MDK - Start';
	} else if (Action == context.localizeText('pause')) {
		return 'MDK - Pause';
	} else if (Action == context.localizeText('stop')) {
		return 'MDK - Stop';
	} else {
		return;
	}
}