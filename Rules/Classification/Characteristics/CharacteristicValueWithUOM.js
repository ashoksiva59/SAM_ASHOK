
/**
 * Assemble Characteristics with theri respective Unit of Measure to
 * display on the list view.
 */
import assembleDisplayValues from './CharacteristicAssembleDisplayValue';
import dateDisplayValue from '../Characteristics/Date/CharacteristicsDateDisplayValue';
import timeDisplayValue from '../Characteristics/Time/CharacteristicsTimeDisplayValue';

export default function CharacteristicValueWithUOM(context, characteristic) {
    let dataType = context.binding.Characteristic.DataType;
    let singleValue = context.binding.Characteristic.SingleValue;
    let result = characteristic.CharValue;
    switch (dataType) {
        case 'NUM':
            switch (singleValue) {
                case 'X':
                    result = assembleDisplayValues(context, characteristic.ValueRel, characteristic.CharValFrom.toString(), characteristic.CharValTo.toString(), 'SingleValues', true);
                    break;
                default:
                    result = assembleDisplayValues(context, characteristic.ValueRel,  characteristic.CharValFrom.toString(), characteristic.CharValTo.toString(), 'MultipleValues', true);
                    break;
            }
            break;
        case 'CURR': 
            switch (singleValue) {
                case 'X':
                    result = assembleDisplayValues(context, characteristic.ValueRel, characteristic.CharValFrom.toString(), characteristic.CharValTo.toString(), 'SingleValues', true);
                    break;
                default:
                    result = assembleDisplayValues(context, characteristic.ValueRel,  characteristic.CharValFrom.toString(), characteristic.CharValTo.toString(), 'MultipleValues', true);
                    break;
            }
            break;
        case 'DATE': 
            switch (singleValue) {
                case 'X':
                    result = assembleDisplayValues(context,characteristic.ValueRel, dateDisplayValue(context,characteristic.CharValFrom),dateDisplayValue(context, characteristic.CharValTo), 'SingleValues', true);
                    break;
                default:
                    result = assembleDisplayValues(context, characteristic.ValueRel, dateDisplayValue(context, characteristic.CharValFrom), dateDisplayValue(context, characteristic.CharValTo), true);
                    break;
            }
            break;
        case 'TIME': 
            switch (singleValue) {
                case 'X':
                    result = assembleDisplayValues(context,characteristic.ValueRel, timeDisplayValue(context, characteristic.CharValFrom), timeDisplayValue(context, characteristic.CharValTo), 'SingleValues', true);
                    break;
                default:
                    result = assembleDisplayValues(context, characteristic.ValueRel, timeDisplayValue(context, characteristic.CharValFrom), timeDisplayValue(context, characteristic.CharValTo), true);
                    break;
            }
            break;
        default:
            result = characteristic.CharValue; 
            break;
    }
    return result;
}
