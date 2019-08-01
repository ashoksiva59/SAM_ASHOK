import libCommon from '../../../Common/Library/CommonLibrary';
import Logger from '../../../Log/Logger';
export default function AutoTimePause(Context) {
	var messageText;
	const captionText = Context.localizeText('confirm_Pause_operation');
	const okButtonText = Context.localizeText('yes');
	const cancelButtonText = Context.localizeText('no');

	return libCommon.showWarningDialog(Context, messageText, captionText, okButtonText, cancelButtonText).then(function () {
		// Set Confirmation Action
		libCommon.setStateVariable(Context, 'ATEAction', Context.localizeText('pause'));
		// Update the User Status of the operation to PAUSE
		return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/ATEUserStatusChange.action')
			.then(function () {
				// Post Confirmation with current system date and time
				return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
			}).catch(err => {
				/**Implementing our Logger class*/
				Logger.error(Context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryMobileStatus.global').getValue(), err);
				return '';
			});

	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}