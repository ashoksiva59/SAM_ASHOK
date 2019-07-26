export class MapControlDelegate {

    public static initWithDataServiceAndBridge(dataService, bridge, controlExtension): MapControlDelegate {
        let controlDelegate = new MapControlDelegate();
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

    public runNavigation() {
        // intentional no-op
    }

    protected fetchBusinessObjects(dictionary, type) {
        // intentional no-op
    }

    protected fetchConfig(dictionary, type) {
        // intentional no-op
    }
}
