import libCom from '../../Common/Library/CommonLibrary';

export default function OnCreateGetDoc(pageProxy) {
    return libCom.getStateVariable(pageProxy,'Doc');
}
