import libPoint from '../MeasuringPointLibrary';
import Logger from '../../Log/Logger';


export default function MeasurementDocumentCreateUpdateFinalizeData(pageClientAPI) {
    //if in update, run update action else run create action
    /**Implementing our Logger class*/
    Logger.debug(pageClientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryMeasurementDocuments.global').getValue(), 'Starting MeasurementDocumentCreateUpdateFinalizeData');

    if (libPoint.evalIsUpdateTransaction(pageClientAPI)) {
        pageClientAPI.executeAction('/SAPAssetManager/Actions/Measurements/MeasurementDocumentUpdate.action');
    } else {
        pageClientAPI.executeAction('/SAPAssetManager/Actions/Measurements/MeasurementDocumentCreate.action');
    }
    /**Implementing our Logger class*/
    Logger.debug(pageClientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryMeasurementDocuments.global').getValue(), 'Finishing MeasurementDocumentCreateUpdateFinalizeData');

}
