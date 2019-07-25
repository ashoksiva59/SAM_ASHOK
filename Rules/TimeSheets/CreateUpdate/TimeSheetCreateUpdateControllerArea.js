export default function TimeSheetCreateUpdateControllerArea(clientAPI) {
    return clientAPI.read('/SAPAssetManager/Services/AssetManager.service', 'UserSystemInfos', [], '').then(function(result) {
        var controllerArea = '';
        if (result) {
            var len = result.length;
            if (len > 0) {
                result.forEach(function(element) {
                    if (element.SystemSettingName === 'CO_AREA') {
                        controllerArea = element.SystemSettingValue;
                    }
                });
            }
        }
        return controllerArea;
    });
}
