import ComLib from '../../../Common/Library/CommonLibrary';

export default function NotificationActivityCreateUpdateOnCommit(clientAPI) {
    // If we are creating, start create action
    if (ComLib.IsOnCreate(clientAPI))	{
        ComLib.resetChangeSetActionCounter(clientAPI);
        ComLib.setOnChangesetFlag(clientAPI, true);
        return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Activity/NotificationActivityCreateChangeSet.action');
    }
    // If not, kick off the update action
    return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Activity/NotificationActivityUpdate.action');
}
