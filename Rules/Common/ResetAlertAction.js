import libCom from './Library/CommonLibrary';

export default function ResetAlertAction(clientAPI) {
    var messageText = clientAPI.localizeText('reset_application_message');
    var captionText = clientAPI.localizeText('confirm_reset');

    
    return libCom.showWarningDialog(clientAPI, messageText, captionText).then( result => {
        if (result === true) {
            let pageProxy = clientAPI.evaluateTargetPathForAPI('#Page:OverviewPage');
            let sectionedTable = pageProxy.getControls()[0];
            let mapSection = sectionedTable.getSections()[0];
            let mapViewExtension = mapSection.getExtensions()[0];
            if (libCom.isDefined(mapViewExtension)) {
                mapViewExtension.clearUserDefaults();
            }
            // Changing the flag back to false to execute Update action again on subsequent reset
            clientAPI.nativescript.appSettingsModule.setBoolean('didSetUserGeneralInfos', false);
            clientAPI.executeAction('/SAPAssetManager/Actions/User/ResetUser.action');
        }
    });
}
