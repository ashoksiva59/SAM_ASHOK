import GenerateLocalID from '../../Common/GenerateLocalID';

export default function MeasurementDocumentMeasurementDocNum(context) {
    if (!context) {
        throw new TypeError('Context can\'t be null or undefined');
    }
    return GenerateLocalID(context, 'MeasurementDocuments', 'MeasurementDocNum', '', '', '', 'SortField');
}
