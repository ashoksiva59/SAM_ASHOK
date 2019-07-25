import libCommon from '../Common/Library/CommonLibrary';

export default function ChecklistListViewIconImages(context) {

    var iconImage = [];

    // check if this checklist requires sync
    if (libCommon.getTargetPathValue(context, '#Property:@sap.isLocal') || libCommon.getTargetPathValue(context, '#Property:MobileStatus/#Property:@sap.isLocal') || libCommon.getTargetPathValue(context, '#Property:HeaderLongText/#Property:0/#Property:@sap.isLocal')) {
        iconImage.push('/SAPAssetManager/Images/syncOnListIcon.png');
    }

    return iconImage;
}
