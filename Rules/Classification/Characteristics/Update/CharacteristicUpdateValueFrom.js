/**
 * Get the CharValFrom value from the appropriate control.
 * 
 * @param {} context
 * 
 * @returns {string} returns the appropriate value.
 * 
 */
import libCom from '../../../Common/Library/CommonLibrary';
import libVal from '../../../Common/Library/ValidationLibrary';
import formattedDateTime from '../Date/CharacteristicFormattedDateTime';
import deAssembleReturnValues from '../CharacteristicDeAssembleReturnValue';

export default function CharacteristicUpdateValueFrom(context) {
    let controlName = libCom.getStateVariable(context,'VisibleControlFrom');
    let charValFrom = libVal.evalIsEmpty(context.binding.CharValFrom) ? '0' : context.binding.CharValFrom.toString();

    if (controlName !== 'CharacterSingleValue' && controlName !== 'CharacterMultipleValue' && controlName !== 'CharacterFreeForm') {
        let isListPicker = libCom.getStateVariable(context,'ListPicker');
        let isMultiListPicker = libCom.getStateVariable(context,'MultiListPicker');
        let multiPickerIndex = libCom.getStateVariable(context,'ListPickerLoopIndex');
        var control = libCom.getControlProxy(context, controlName);
        
        if (isListPicker) {
            return deAssembleReturnValues(control.getValue()[0].ReturnValue, 'CharValFrom');
        } else if (isMultiListPicker) {
            return deAssembleReturnValues(control.getValue()[multiPickerIndex-1].ReturnValue, 'CharValFrom');
        }
        let valueCode = ['6','7'];
        if (!valueCode.includes(context.binding.ValueRel)) {
            switch (control.getType()) {
                case 'Control.Type.FormCell.ListPicker':
                    return control.getValue().length === 0 ? context.binding.CharValFrom.toString() : control.getValue().length > 1 ? control.getValue()[multiPickerIndex-1].ReturnValue : control.getValue()[0].ReturnValue;
                case 'Control.Type.FormCell.SimpleProperty':
                    return libVal.evalIsEmpty(control.getValue()) ? context.binding.CharValFrom.toString(): control.getValue();
                case 'Control.Type.FormCell.DatePicker':
                    return parseFloat(formattedDateTime(context, control.getValue()));
                default:
                    return charValFrom;
            }
        } 
        return charValFrom;
    }
    return charValFrom;
}
