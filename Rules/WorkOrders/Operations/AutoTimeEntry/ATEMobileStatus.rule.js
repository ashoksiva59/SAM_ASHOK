import libCommon from '../../../Common/Library/CommonLibrary';
export default function ATEMobileStatus(context) {
	// Get Confirmation Action
	var Action = libCommon.getStateVariable(context, 'ATEAction');
	
	// Fetch the Mobile Application Parameters from config panel - User status
	var JobStarted = libCommon.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition(
		'/SAPAssetManager/Globals/MobileStatus/ATEUserStatus/JobStarted.global').getValue());
	var JobPaused = libCommon.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition(
		'/SAPAssetManager/Globals/MobileStatus/ATEUserStatus/JobPaused.global').getValue());
	var JobStoped = libCommon.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition(
		'/SAPAssetManager/Globals/MobileStatus/ATEUserStatus/JobStoped.global').getValue());

	if (Action == context.localizeText('start')) {
		return JobStarted;
	} else if (Action == context.localizeText('pause')) {
		return JobPaused;
	} else if (Action == context.localizeText('stop')) {
		return JobStoped;
	} else {
		return;
	}
}