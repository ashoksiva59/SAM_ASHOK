import libVal from '../Common/Library/ValidationLibrary';
export default function TimeSheetActivityTypeCostCenter(context) {
    let binding = context.binding;
    let costCenter = '';
    if (libVal.evalIsEmpty(binding)) { // Case when we are coming from timesheet tab from Overview
        return '$orderby=ActivityType';
    } else {
        let odataType = binding['@odata.type'];
        if (odataType === '#sap_mobile.MyWorkOrderHeader') {
            costCenter = binding.CostCenter;
        } else if (odataType === '#sap_mobile.MyWorkOrderOperation') {
            costCenter = binding.WOHeader.CostCenter;
        } else if (odataType === '#sap_mobile.MyWorkOrderSubOperation') {
            costCenter = binding.WorkOrderOperation.WOHeader.CostCenter;
        } else {
            // Default case for time sheet create from TimeSheet list
            costCenter = binding.CostCenter;
        }
        return libVal.evalIsEmpty(costCenter) ? '$orderby=ActivityType' : `$filter=CostCenter eq '${costCenter}'&$orderby=ActivityType`;
    }
}
