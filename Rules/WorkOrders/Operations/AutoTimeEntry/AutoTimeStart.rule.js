import libCommon from '../../../Common/Library/CommonLibrary';
import Logger from '../../../Log/Logger';
export default function AutoTimeStart(context) {

	var JobStartedStatus;
	var Query = "$expand=MobileStatus";
	// Fetch User status for operation 
	return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], Query).then(
		mobileStatus => {
			JobStartedStatus = mobileStatus.getItem(0).MobileStatus.UserStatus;
			// Check Whether Operation has user status as Job Started
			if (JobStartedStatus == 'STRD') {
				return; // Dont do any thing as of now, will cover this senario when we have multiple segements of time recorded
			} else {
				// Set Confirmation Action
				libCommon.setStateVariable(context, 'ATEAction', context.localizeText('start'));
				// Post User Status of the operation to START
				return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/ATEUserStatusChange.action')
					.then(function () {
						// Post Confirmation with current system date and time
						return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
					}).catch(err => {
						/**Implementing our Logger class*/
						Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryMobileStatus.global').getValue(), err);
						return '';
					});
			}
		});
}