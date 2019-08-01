import libCommon from '../../../Common/Library/CommonLibrary';
import Logger from '../../../Log/Logger';
export default function AutoTimeStop(Context) {
	var Isrestartpause;
	var messageText;
	const captionText = Context.localizeText('confirm_Stop_operation');
	const okButtonText = Context.localizeText('ok');
	const cancelButtonText = Context.localizeText('cancel');

	return libCommon.showWarningDialog(Context, messageText, captionText, okButtonText, cancelButtonText).then(function () {
		// Check If there any restart/pause entry exists for the operation
		if (Isrestartpause) {
			return; // Dont do any thing as of now, will cover this senario when we have multiple segements of time recorded
		} else {
			// Set Confirmation Action
			libCommon.setStateVariable(Context, 'ATEAction', Context.localizeText('stop'));
			// Update the User Status of the operation to STOP
			return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/ATEUserStatusChange.action')
				.then(function () {
					// Post Confirmation with current system date and time
					return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
				}).catch(err => {
					/**Implementing our Logger class*/
					Logger.error(Context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryMobileStatus.global').getValue(), err);
					return '';
				});
		}
	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}