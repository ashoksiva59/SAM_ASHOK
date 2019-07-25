import ComLib from '../Common/Library/CommonLibrary';

export default function DocumentListViewIconImages(controlProxy) {
    const readLink = controlProxy.binding['@odata.readLink'];
    if (ComLib.isCurrentReadLinkLocal(readLink)) {
        return ['/SAPAssetManager/Images/syncOnListIcon.png'];
    } else {
        return [];
    }
}
