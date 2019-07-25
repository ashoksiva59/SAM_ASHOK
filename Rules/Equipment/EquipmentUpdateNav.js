import libCommon from '../Common/Library/CommonLibrary';
import libEval from '../Common/Library/ValidationLibrary';


export default function EquipmentUpdateNav(context) {
    if (!libEval.evalIsEmpty(context.getBindingObject().DismantleDate)) {
        let dismantle_message = context.localizeText('dismantle_equipment_Fix_Message');
        let dismantle_title = context.localizeText('dismantle_equipment');
        return libCommon.showWarningDialog(context, dismantle_message, dismantle_title, 'Ok', 'Cancel').then(didPressOk => {
            if (didPressOk) {
                return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyEquipments(\'' + context.getBindingObject().EquipId + '\')', [], '').then(function(results) {
                    if (results && results.getItem(0)) {
                        results.getItem(0).FromErrorArchive = true;
                        context.setActionBinding(results.getItem(0));
                    }
                    return context.executeAction('/SAPAssetManager/Actions/Equipment/Uninstall/UnInstallEquipmentDeleteChangeSet.action');
                });
            }
            return false;
        }).catch(() => {
            // User said no
            return false;
        });
    } else if (!libEval.evalIsEmpty(context.getBindingObject().InstallDate)) {
        let install_message = context.localizeText('install_equipment_Fix_Message');
        let install_title = context.localizeText('install_equipment');
        return libCommon.showWarningDialog(context, install_message, install_title, 'Ok', 'Cancel').then(didPressOk => {
            if (didPressOk) {
                return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyEquipments(\'' + context.getBindingObject().EquipId + '\')', [], '').then(function(results) {
                    if (results && results.getItem(0)) {
                        results.getItem(0).FromErrorArchive = true;
                        context.setActionBinding(results.getItem(0));
                    }
                    return context.executeAction('/SAPAssetManager/Actions/Equipment/Installation/EquipmentInstallationDeleteChangeSet.action');
                });
            }
            return false;
        }).catch(() => {
            // User said no
            return false;
        });
    }
    return false;
}
