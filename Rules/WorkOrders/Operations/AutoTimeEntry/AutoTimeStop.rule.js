import libCommon from '../../../Common/Library/CommonLibrary';
export default function AutoTimeStop(Context) {
	var Isrestartpause;
	var messageText;
	const captionText = Context.localizeText('confirm_Stop_operation');
	const okButtonText = Context.localizeText('ok');
	const cancelButtonText = Context.localizeText('cancel');

	return libCommon.showWarningDialog(Context, messageText, captionText, okButtonText, cancelButtonText).then(function () {
		// Check If there any restart/pause entry exists for the operation
		if (Isrestartpause) {

		} else {
			// Update the User Status of the operation to STOP
			
			// Post Confirmation with current system date and time Along with Final confirmation Indicator
			return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
		}
	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}