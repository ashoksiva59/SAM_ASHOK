declare var com;

@Interfaces([com.sap.sam.android.plugin.map.IMapExtensionDelegate])
export class MapControlDelegate extends java.lang.Object {

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

    /**
     * Explicitly set reference to control extension
     * @param controlExtension 
     */
    public setControlExtension(controlExtension) {
        this._controlExtension = controlExtension;
    }

    public getObjects(dictionary, type) {
        try {
            if (type === 'Config') {
                this.fetchConfig(dictionary, type);
            } else {
                this.fetchBusinessObjects(dictionary, type);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    public runAction(actionInfoJsonString, type) {
        let actionInfoJson = JSON.parse(actionInfoJsonString);
        this._controlExtension.runActionWithInfoAndService(actionInfoJson, type, this._dataService);
    }

    protected fetchBusinessObjects(dictionary, type) {
        let jsonDictionary = JSON.parse(dictionary);   
        if (this._controlExtension) {
            let objects = this._controlExtension.getObjects(jsonDictionary, type);
            if (objects) {
                jsonDictionary.Objects = objects;
                this._bridge.callback(JSON.stringify(jsonDictionary), type);
            }
        }
    }

    protected fetchConfig(dictionary, type) {
        let json = JSON.parse(dictionary);
        let targetJson = {Target: json};
        if (this._controlExtension) {
            this._dataService.read(this._controlExtension.getTargetService(targetJson)).then(result => {
                let mapConfigurations = {};
                let baseMapConfig = {};
                let baseMapArray = [];
                let featureLayerConfig = {};
                let featureLayerArray = [];
                for (let i = 0; i < result.length; i++) {
                    let item = result.getItem(i);
                    let paramName = item.ParameterName; // key
                    let paramValue = item.ParameterValue; // value
                    let paramGroup = item.ParameterGroup; // index
                    let paramParentGroup = item.ParentParemeterGroup; // parent group
                    if (paramGroup === 'ESRI') {
                        mapConfigurations[paramName] = paramValue;
                    } else if (paramGroup === 'CONFIG') {
                        let _paramValue = paramValue.toLowerCase();
                        if (_paramValue === 'true') {
                            // Convert to boolean true
                            mapConfigurations[paramName] = true;
                        } else if (_paramValue === 'false') {
                            // Convert to boolean false
                            mapConfigurations[paramName] = false;
                        } else {
                            // Keep value as is
                            mapConfigurations[paramName] = paramValue;
                        }
                    } else if (paramParentGroup === 'BASEMAP') {
                        if (!baseMapConfig.hasOwnProperty(paramGroup)) {
                            baseMapConfig[paramGroup] = {};
                        } 
                        baseMapConfig[paramGroup][paramName] = paramValue;
                    } else if (paramParentGroup === 'FEATURELAYER') {
                        if (!featureLayerConfig.hasOwnProperty(paramGroup)) {
                            featureLayerConfig[paramGroup] = {};
                        } 
                        if (paramName === 'Properties' || paramName === 'Actions') {
                            featureLayerConfig[paramGroup][paramName] = JSON.parse(paramValue);
                        } else {
                            featureLayerConfig[paramGroup][paramName] = paramValue;
                        }
                        
                    }
                }
                for (let key in baseMapConfig) {
                    if (baseMapConfig.hasOwnProperty(key)) {
                        baseMapArray.push(baseMapConfig[key]);
                    }
                }
                for (let key in featureLayerConfig) {
                    if (featureLayerConfig.hasOwnProperty(key)) {
                        featureLayerArray.push(featureLayerConfig[key]);
                    }
                }
                let responseJson = {
                    BaseMaps: baseMapArray,
                    FeatureLayers: featureLayerArray,
                    ViewConfig: mapConfigurations,
                };
                this._bridge.callback(JSON.stringify(responseJson), type);
            });
        }
    }
};
