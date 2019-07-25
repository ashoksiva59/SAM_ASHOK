import QueryBuilder from '../../Common/Query/QueryBuilder';
import FetchRequest from '../../Common/Query/FetchRequest';


export default function OverviewRowIcons(context) {

    let date = context.getBindingObject().PostingDate;
    let queryBuilder = new QueryBuilder();
    queryBuilder.addFilter(`PostingDate eq datetime'${date}'`);

    let fetchRequest = new FetchRequest('Confirmations', queryBuilder.build());

    return fetchRequest.execute(context).then(result => {

        let icons = [];

        result.some(conf => {
            if (conf['@sap.isLocal']) {
                icons.push('/SAPAssetManager/Images/syncOnListIcon.png');
                return true;
            }
            return false;
        });
        return icons;
    });    
}
