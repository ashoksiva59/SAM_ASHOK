import libCommon from '../../../Common/Library/CommonLibrary';
import libMobile from '../../../MobileStatus/MobileStatusLibrary';
import Logger from '../../../Log/Logger';

export default function NotificationItemCauseTaskActivityIconImages(context) {
    var icons = [];
    // check if this Notification Item Cause has been locally created

    if (libCommon.getTargetPathValue(context, '#Property:@sap.isLocal')) {
        icons.push('/SAPAssetManager/Images/syncOnListIcon.png');
    }

    return libMobile.mobileStatus(context, context.binding).then(result => {
        if (result === 'COMPLETED' || result === 'SUCCESS') {
            icons.push('/SAPAssetManager/Images/stepCheckmarkIcon.png');
        }
        return icons;
    }).catch(err => {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryNotifications.global').getValue(), err);
    });
}
