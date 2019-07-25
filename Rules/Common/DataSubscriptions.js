
import libCom from '../Common/Library/CommonLibrary';
export default function DataSubscriptions(context) {
    let pageName = libCom.getPageName(context);
    switch (pageName) {
        case 'NotificationsListViewPage':
            return [
                'MyWorkOrderHeaders',
                'MyNotificationHeaders',
                'UserPreferences',
                'MyEquipments',
                'MobileStatuses',
                'CatsTimesheetOverviewRows',
                'ConfirmationOverviewRows',
                '/SAPAssetManager/Services/AssetManager.service',
            ];
        case 'OverviewPage':
            return [
                'MyWorkOrderHeaders',
                'MyNotificationHeaders',
                'MyEquipments',
                '/SAPAssetManager/Services/AssetManager.service',
            ];
        case 'WorkOrdersListViewPage':
            return [
                'MobileStatuses', 
                'MyWorkOrderHeaderLongTexts',
            ];
        default:
            break;
        }
}
