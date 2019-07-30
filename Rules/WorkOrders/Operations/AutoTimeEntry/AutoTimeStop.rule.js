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
			//Trigger Partial Confirmation to SAP Asset Manager
			return Context.executeAction('/SAPAssetManager/Actions/WorkOrders/MobileStatus/OperationMobileStatusSuccessMessage.action');
		}
	}).catch(() => {
		// If User press Do Nothing
		return Promise.resolve();
	});

}