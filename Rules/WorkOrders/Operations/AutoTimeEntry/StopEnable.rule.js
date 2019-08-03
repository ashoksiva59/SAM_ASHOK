import ATEMobileStatus from './ATEMobileStatus';
export default function StopEnable(context) {
	// Fetch User status for operation 
	return ATEMobileStatus.GetMobileStatus(context, 'MyWorkOrderOperations', context.binding.WOHeader.OrderId, context.binding.OperationNo)
		.then(
			mobileStatus => {
				// Check Whether Operation has user status as Job Stopped
				if (mobileStatus == 'STPD') {
					return false;
				} else if (mobileStatus == 'STRD' || mobileStatus == 'PASD') {
					return true;
				} else {
					return false;
				}
			});
}