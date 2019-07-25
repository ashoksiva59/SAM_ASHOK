import libCommon from '../../Common/Library/CommonLibrary';

export default function NotificationItemIconImages(context) {
    
    // check if this Notification Item has been locally created
    if (libCommon.getTargetPathValue(context,'#Property:@sap.isLocal')) {
        return ['/SAPAssetManager/Images/syncOnListIcon.png'];
    } else {
        return [];
    }
}
