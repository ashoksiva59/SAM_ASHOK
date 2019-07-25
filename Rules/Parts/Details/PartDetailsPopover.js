import libCommon from '../../Common/Library/CommonLibrary';
import libWOStatus from '../../WorkOrders/MobileStatus/WorkOrderMobileStatusLibrary';

export default function PartDetailsPopover(context) {
    if (!libCommon.isEntityLocal(context.binding)) {
        return libWOStatus.isOrderComplete(context).then(status => {
            if (!status) {
                return context.executeAction('/SAPAssetManager/Actions/Parts/PartDetailsPopover.action');
            }
            return '';
        });
    }
    return context.executeAction('/SAPAssetManager/Actions/Parts/PartDetailsNotesPopover.action');
}
