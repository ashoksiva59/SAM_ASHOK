export default function MeasuringPointValueIsLocal(clientAPI) {
    if (clientAPI.binding['@sap.isLocal']) {
            return '/SAPAssetManager/Images/syncOnListIcon.png';
    }
    return '';
}
