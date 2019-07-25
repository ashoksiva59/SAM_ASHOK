import libVal from '../../Common/Library/ValidationLibrary';

/**
 * Returns the total count of work order history objects for an asset.
 * @param {*} context SectionProxy object.
 * @returns {Number} Total count of Workorder history objects.
 */
export default function PRTQuantityValue(context) {
    if (!libVal.evalIsEmpty(context.binding.UsageValue) && !libVal.evalIsEmpty(context.binding.UsageUOM)) {
        return context.binding.UsageValue + ' ' + context.binding.UsageUOM;
    } else if (!libVal.evalIsEmpty(context.binding.UsageValue)) {
        return context.binding.UsageValue;
    } else {
        return '-';
    }
}
