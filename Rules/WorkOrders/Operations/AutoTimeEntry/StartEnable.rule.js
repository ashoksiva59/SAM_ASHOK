import MobileStatusLibrary from '../../../MobileStatus/MobileStatusLibrary';
export default function StartEnable(context) {
	var JobStarted;
	var Query = "$expand=MobileStatus";
	// Fetch User status for operation 

	return MobileStatusLibrary.isMobileStatusComplete(context, 'MyWorkOrderOperations', context.binding.WOHeader.OrderId, context.binding.OperationNo)
		.then(
			status => {
				debugger;
			});

	return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], Query).then(
		mobileStatus => {
			JobStarted = mobileStatus.getItem(0).MobileStatus.UserStatus;
			// Check Whether Operation has user status as Job Started
			if (JobStarted == 'STRD') {
				return false;
			} else {
				return true;
			}
		});
}