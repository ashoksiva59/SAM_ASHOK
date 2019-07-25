export default function FunctionalLocationQueryOptions(context) {
    let binding = context.getPageProxy().binding;
    let query = '$expand=WorkCenter_Nav&$orderby=FuncLocIdIntern';
    if (binding) {
        let odataType = binding['@odata.type'];
        switch (odataType) {
            case '#sap_mobile.MyWorkOrderHeader':
             query = "$expand=WorkCenter_Nav&$filter=WorkOrderHeader/any( wo: wo/OrderId eq '{{#Property:OrderId}}' ) or WorkOrderOperation/WOHeader/any(wo: wo/OrderId eq '{{#Property:OrderId}}' ) or WorkOrderSubOperation/WorkOrderOperation/WOHeader/any( wo: wo/OrderId eq '{{#Property:OrderId}}')&$expand=WorkOrderHeader";
             break;
            default:
             break;
        }

    }
    return query;
}
