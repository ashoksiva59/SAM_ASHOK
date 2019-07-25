import libCommon from '../Common/Library/CommonLibrary';

export default function RemindersIconImages(context) {
    if (libCommon.getTargetPathValue(context,'#Property:@sap.isLocal')) {
        return ['/SAPAssetManager/Images/syncOnListIcon.png'];
    } else {
        return [];
    }
}
