
import {TimeSheetDetailsLibrary as libTSDetails} from './TimeSheetLibrary';

export default function TimeSheetListIconImages(pageProxy) {

    return libTSDetails.TimeSheetListIconImages(pageProxy).then(function(result) {
        if (result) {
            return ['/SAPAssetManager/Images/syncOnListIcon.png'];
        } else {
            return [];
        }
    });
}
