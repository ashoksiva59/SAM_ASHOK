import libCommon from '../../../Common/Library/CommonLibrary';


export default function PRTEquipmentsListIconImages(context) {
    var iconImage = [];

    // check if this order requires sync
    if (libCommon.getTargetPathValue(context, '#Property:@sap.isLocal')) {
        iconImage.push('/SAPAssetManager/Images/syncOnListIcon.png');
    }

    return iconImage;
}
