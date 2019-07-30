import libCommon from '../../../Common/Library/CommonLibrary';
export default function AutoTimePause(Context) {
	var messageText;
	const captionText = Context.localizeText('confirm_Pause_operation');
	const okButtonText = Context.localizeText('yes');
	const cancelButtonText = Context.localizeText('no');

	return libCommon.showWarningDialog(Context, messageText, captionText, okButtonText, cancelButtonText).then(function () {

		return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/MobileStatus/OperationMobileStatusSuccessMessage.action');
	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}