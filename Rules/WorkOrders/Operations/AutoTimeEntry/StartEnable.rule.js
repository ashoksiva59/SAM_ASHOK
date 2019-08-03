import ATEMobileStatus from './ATEMobileStatus';
export default function StartEnable(context) {
	// Fetch User status for operation 
	return ATEMobileStatus.GetMobileStatus(context, 'MyWorkOrderOperations', context.binding.WOHeader.OrderId, context.binding.OperationNo)
		.then(
			mobileStatus => {
				// Check Whether Operation has user status as Job Started
				if (mobileStatus == 'STRD') {
					return false;
				} else {
					return true;
				}
			});
}