export default function MobileStatusReadLink(context) {
    return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'] + '/MobileStatus', [], '').then(function(result) {
       debugger;
        return result.getItem(0)['@odata.readLink'];
    });
}
