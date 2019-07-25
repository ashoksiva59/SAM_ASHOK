import ComLib from '../../../Common/Library/CommonLibrary';

export default function NotificationItemCreateUpdateOnCommit(clientAPI) {
    if (ComLib.IsOnCreate(clientAPI)) {
        if (ComLib.isOnChangeset(clientAPI)) {
            return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemCreate.action');
        }
        // If this is not already a change set, we want to make it one
        ComLib.setOnChangesetFlag(clientAPI, true);
        ComLib.resetChangeSetActionCounter(clientAPI);
        return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemCreateChangeSet.action');
    }
    return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemUpdate.action');
}
