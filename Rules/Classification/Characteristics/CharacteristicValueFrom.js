import libVal from '../../Common/Library/ValidationLibrary';

export default function CharacteristicValueFrom(context) {
    if (context.binding.ValueRel === '6' || context.binding.ValueRel === '7' ) {
        return context.binding.CharValTo.toString();
    } else if (libVal.evalIsEmpty(context.binding.CharValFrom)) {
        return '';
    } else {
        return context.binding.CharValFrom.toString();
    }
}
