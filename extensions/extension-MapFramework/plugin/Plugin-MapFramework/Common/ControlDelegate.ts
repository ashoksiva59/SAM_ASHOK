export class ControlDelegate extends NSObject {
    // selector will be exposed so it can be called from native.
    /* tslint:disable */
    public static ObjCExposedMethods = {
        getObjects: { params: [NSString, NSString], returns: interop.types.void },
        runAction: { params: [NSString, NSString], returns: interop.types.void }
    };
    /* tslint:enable */

    public static initWithDataServiceAndBridge(dataService, bridge, controlExtension): ControlDelegate {
        let controlDelegate = <ControlDelegate> ControlDelegate.new();
        controlDelegate._dataService = dataService;
        controlDelegate._bridge = bridge;
        controlDelegate._controlExtension = controlExtension;
        return controlDelegate;
    }

    private _dataService: any;
    private _bridge: any;
    private _controlExtension: any;

    public setControlExtension(controlExtension) {
        // intentional no-op
    }

    public getObjects(dictionary, type) {
        // intentional no-op
    }
    
    public runAction(actionInfoJsonString, type) {
        // intentional no-op
    }

    protected fetchBusinessObjects(dictionary, type) {
        // intentional no-op
    }

    protected fetchConfig(dictionary, type) {
        // intentional no-op
    }
}
