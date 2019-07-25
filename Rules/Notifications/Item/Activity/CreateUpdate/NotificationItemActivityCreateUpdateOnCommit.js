import ComLib from '../../../../Common/Library/CommonLibrary';

export default function NotificationItemActivityCreateUpdateOnCommit(clientAPI) {
    //Determine if we are on edit vs. create
    if (ComLib.IsOnCreate(clientAPI))	{
        ComLib.resetChangeSetActionCounter(clientAPI);
        ComLib.setOnChangesetFlag(clientAPI, true);
        return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemActivityCreateChangeSet.action');
    }
    return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemActivityUpdate.action');
}
