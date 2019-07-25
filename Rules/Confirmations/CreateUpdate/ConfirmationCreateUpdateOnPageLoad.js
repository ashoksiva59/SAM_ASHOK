import style from '../../Common/Style/StyleFormCellButton';
import Stylizer from '../../Common/Style/Stylizer';
import hideCancel from '../../ErrorArchive/HideCancelForErrorArchiveFix';

export default function ConfirmationCreateUpdateOnPageLoad(context) {
    hideCancel(context);
    let stylizer = new Stylizer(['GrayText']);
    const formCellContainerProxy = context.getControl('FormCellContainer');
    if (!context.getBindingObject().IsOnCreate) {
        style(context, 'DiscardButton');
    }


    if (!context.getBindingObject().IsWorkOrderChangable) {
        let woPicker = formCellContainerProxy.getControl('WorkOrderLstPkr');
        let confirmationId = formCellContainerProxy.getControl('ConfirmationIdProperty');
        stylizer.apply(woPicker, 'Value');
        stylizer.apply(confirmationId, 'Value');

        if (!context.getBindingObject().IsOperationChangable) {
            let opPicker = formCellContainerProxy.getControl('OperationPkr');
            stylizer.apply(opPicker, 'Value');
            if (!context.getBindingObject().IsSubOperationChangable) {
                let subOpPicker = formCellContainerProxy.getControl('SubOperationPkr');
                stylizer.apply(subOpPicker, 'Value');
            }
        }

    }
}
