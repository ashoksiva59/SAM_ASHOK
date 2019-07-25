import ComLib from '../../../../Common/Library/CommonLibrary';

export default function NotificationItemTaskCreateUpdateOnCommit(clientAPI) {
    //Determine if we are on edit vs. create
    if (ComLib.IsOnCreate(clientAPI))	{
        ComLib.resetChangeSetActionCounter(clientAPI);
        ComLib.setOnChangesetFlag(clientAPI, true);
        return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemTaskCreateChangeSet.action');
    }
    return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemTaskUpdate.action');
}
