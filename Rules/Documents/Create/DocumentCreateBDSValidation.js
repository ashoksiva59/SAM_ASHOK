import DocLib from '../DocumentLibrary';

export default function DocumentCreateBDSValidation(context) {
    if (!context) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return DocLib.createValidationRule(context);
}
