export default function AutoTimeStart(context) {
	debugger;

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

				let actionBinding = {
					Operation: '0010',
					Description: 'MDK Confirmation',
					OrderID: '4000341',
				};
				context.setActionBinding(actionBinding);
				// Post Blank Confirmation with current system date and time
				return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/AutoTimeEntry/AutoTimeConfirmation.action');
			}
		});

	//return clientAPI;
}