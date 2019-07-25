import QueryBuilder from '../../Common/Query/QueryBuilder';
import libVal from '../../Common/Library/ValidationLibrary';

export default function ActivityPickerQueryOptions(context) {

    let binding = context.getBindingObject();	
    let controlArea = (binding.WorkOrderHeader === undefined) ? '-1' : binding.WorkOrderHeader.ControllingArea;
    let costCenter = (binding.WorkOrderHeader === undefined) ? '-1' : binding.WorkOrderHeader.CostCenter;

    let queryBuilder = new QueryBuilder();
    
    if (!libVal.evalIsEmpty(controlArea)) {
        queryBuilder.addFilter(`ControllingArea eq '${controlArea}'`);	
    }
    if (!libVal.evalIsEmpty(costCenter)) {
        queryBuilder.addFilter(`CostCenter eq '${costCenter}'`);	
    }
    queryBuilder.addExtra('orderby=ActivityType asc');    
    return queryBuilder.build();
}
