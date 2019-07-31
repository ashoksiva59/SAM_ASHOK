export default function StopEnable(context) {
	var JobStarted;
	var Query = "$expand=MobileStatus";
	// Fetch User status for operation 
	return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], Query).then(
		mobileStatus => {
			JobStarted = mobileStatus.getItem(0).MobileStatus.UserStatus;
			// Check Whether Operation has user status as Job Started
			if (JobStarted == 'STPD') {
				return false;
			} else if (JobStarted == 'STRD' || JobStarted == 'PASD') {
				return true;
			} else {
				return false;
			}
		});

}