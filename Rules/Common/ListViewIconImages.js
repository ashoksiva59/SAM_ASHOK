import isAndroid from './IsAndroid';

export default function ListViewIconImages(controlProxy) {
    var iconImage = [];
    if (controlProxy.evaluateTargetPath('#Property:@sap.isLocal')) {
        iconImage.push('/SAPAssetManager/Images/syncOnListIcon.png');
    }
    if (controlProxy.binding['@odata.type'] === '#sap_mobile.MyEquipment') {
	return controlProxy.count('/SAPAssetManager/Services/AssetManager.service', controlProxy.binding['@odata.readLink'] + '/EquipDocuments', '').then(function(count) {
        if (count > 0) {
            if (isAndroid(controlProxy)) {
                iconImage.push('/SAPAssetManager/Images/attachmentStepIcon.android.png');
            } else {
                iconImage.push('/SAPAssetManager/Images/attachmentStepIcon.png');
            }
        }
        return iconImage;
	});
    }
    return iconImage;
}
