import libCommon from '../../../Common/Library/CommonLibrary';
export default function AutoTimePause(Context) {
	var messageText;
	const captionText = Context.localizeText('confirm_Pause_operation');
	const okButtonText = Context.localizeText('yes');
	const cancelButtonText = Context.localizeText('no');

	return libCommon.showWarningDialog(Context, messageText, captionText, okButtonText, cancelButtonText).then(function () {
		// Update the User Status of the operation to PAUSE
		// Post Confirmation with current system date and time
		return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}