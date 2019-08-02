import QueryBuilder from '../../../Common/Query/QueryBuilder';
import FetchRequest from '../../../Common/Query/FetchRequest';

export default class {

	static GetMobileStatus(context, entitySet, orderId, operation) {
		let queryBuilder = new QueryBuilder();

		queryBuilder.addFilter(`OrderId eq '${orderId}'`);

		if (operation) {
			queryBuilder.addFilter(`OperationNo eq '${operation}'`);
		}

		queryBuilder.addExpandStatement('MobileStatus');
		let fetchRequest = new FetchRequest(entitySet, queryBuilder.build());

		return fetchRequest.execute(context).then(result => {
			return result.getItem(0).MobileStatus.MobileStatus;
		});
	}

}