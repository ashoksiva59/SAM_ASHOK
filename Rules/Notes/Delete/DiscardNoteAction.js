import {NoteLibrary as NoteLib} from '../NoteLibrary';
import ComLib from '../../Common/Library/CommonLibrary';
import Constants from '../../Common/Library/ConstantsLibrary';

export default function DiscardNoteAction(context) {
    const deleteEntityMessage = context.localizeText('default_delete_message');
    const deleteEntityTitle = context.localizeText('confirm_discard');

    //finding object type. Using split as the data is coming as "@sap_mobile.EntityName"
    return ComLib.showWarningDialog(context, deleteEntityMessage, deleteEntityTitle).then(successResult => {
        if (successResult === true) {
            let transaction = NoteLib.getNoteTypeTransactionFlag(context);
            if (transaction.noteDeleteAction) {
                ComLib.setStateVariable(context, Constants.stripNoteNewTextKey, true);                
                return context.executeAction(transaction.noteDeleteAction);
            }
        }
        return null;
    });
}
