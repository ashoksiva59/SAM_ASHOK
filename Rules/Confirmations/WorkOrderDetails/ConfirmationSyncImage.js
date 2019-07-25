

export default function ConfirmationSyncImage(context) {
    if (context.getBindingObject()['@sap.isLocal']) {
        return '/SAPAssetManager/Images/syncOnListIcon.png';
    }
    return '';
}
