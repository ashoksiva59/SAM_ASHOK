export default function PauseEnable(context) {

	var JobStarted;
	var Query = "$expand=MobileStatus";
	// Fetch User status for operation 
	context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], Query).then(
		mobileStatus => {
			JobStarted = mobileStatus.getItem(0).MobileStatus.UserStatus;
		});

	if (JobStarted) {
		return false;
	} else {
		return true;
	}
}