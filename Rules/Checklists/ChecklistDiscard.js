import libCommon from '../Common/Library/CommonLibrary';

export default function checklistDiscard(context) {
    const deleteEntityMessage = context.localizeText('default_delete_message');
    const deleteEntityTitle = context.localizeText('confirm_discard');

    return libCommon.showWarningDialog(context, deleteEntityMessage, deleteEntityTitle).then(successResult => {
        if (successResult === true) {
            libCommon.setStateVariable(context, 'FormReadlink', context.binding.Form_Nav['@odata.readLink']);
            return context.executeAction('/SAPAssetManager/Actions/Checklists/ChecklistDelete.action');
        }
        return Promise.resolve(true);
    });
}
