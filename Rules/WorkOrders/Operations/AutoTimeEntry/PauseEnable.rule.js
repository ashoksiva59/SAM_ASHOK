import ATEMobileStatus from './ATEMobileStatus';
export default function PauseEnable(context) {
	// Fetch User status for operation 
	return ATEMobileStatus.GetMobileStatus(context, 'MyWorkOrderOperations', context.binding.WOHeader.OrderId, context.binding.OperationNo)
		.then(
			mobileStatus => {
				// Check Whether Operation has user status as Job Paused
				if (mobileStatus == 'STRD') {
					return true;
				} else {
					return false;
				}
			});
}