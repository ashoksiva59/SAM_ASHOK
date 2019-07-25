import libCommon from '../../../Common/Library/CommonLibrary';
import countDecimals from './CharacteristicsCountDecimal';
export default function CharacteristicsValidateDecimal(context, value, control) {
    let numberOfChar = value.length - countDecimals(value);
    let numberAllowed = (context.binding.Characteristic.NumofChar - context.binding.Characteristic.NumofDecimal);
    if (numberOfChar > numberAllowed ) {
        let dynamicParams = [numberAllowed];
        let message = context.localizeText('max_number_of_char', dynamicParams);
        return libCommon.executeInlineControlError(context, control, message);
    }
    return true;
}
