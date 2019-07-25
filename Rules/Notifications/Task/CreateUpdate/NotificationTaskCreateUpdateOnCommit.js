import ComLib from '../../../Common/Library/CommonLibrary';

export default function NotificationTaskCreateUpdateOnCommit(clientAPI) {
    //Determine if we are on edit vs. create
    if (ComLib.IsOnCreate(clientAPI))	{
        ComLib.resetChangeSetActionCounter(clientAPI);
        ComLib.setOnChangesetFlag(clientAPI, true);
        return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Task/NotificationTaskCreateChangeSet.action');
    }
    return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Task/NotificationTaskUpdate.action');
}
