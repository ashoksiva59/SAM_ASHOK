import {WorkOrderControlsLibrary as LibWoControls} from '../WorkOrderLibrary';

export default function WorkOrderCreateUpdateFuncLocValue(pageProxy) {
    return LibWoControls.getFunctionalLocation(pageProxy);
}
