import libCommon from '../Library/CommonLibrary';
import libNotif from '../../Notifications/NotificationLibrary';
import AssignmentType from '../../Common/Library/AssignmentType';
/**
 * After changeset success, reset the state variables
 */
export default function ChangeSetOnSuccess(pageProxy) {
    libCommon.setOnCreateUpdateFlag(pageProxy, '');
    libCommon.setOnChangesetFlag(pageProxy, false);
    libCommon.setOnWOChangesetFlag(pageProxy, false);
    libNotif.setAddFromJobFlag(pageProxy, false);
    libNotif.setAddFromMapFlag(pageProxy, false);
    AssignmentType.removeWorkOrderDefaultOverride();
    //pageProxy.executeAction('/SAPAssetManager/Actions/CreateUpdateDelete/CreateEntitySuccessMessageNoClosePage.action');
    // const attachmentCount = DocLib.validationAttachmentCount(pageProxy);
    if (libCommon.getStateVariable(pageProxy, 'attachmentCount') > 0) {
    ////TODO-Clear clientData on Success or Fail-
        return pageProxy.executeAction('/SAPAssetManager/Actions/Documents/DocumentOnCreate.action').then(() => {
            libCommon.clearDocDataOnClientData(pageProxy);
            return pageProxy.executeAction('/SAPAssetManager/Actions/CreateUpdateDelete/CreateEntitySuccessMessageNoClosePage.action');
        });
    } else {
        return pageProxy.executeAction('/SAPAssetManager/Actions/CreateUpdateDelete/CreateEntitySuccessMessageNoClosePage.action');
    }
}
