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
                this._bridge.callback(jsonDictionary, type);
            }
        }
    }

    protected fetchConfig(dictionary, type) {
        let json = JSON.parse(dictionary);
        if (this._controlExtension) {
            this._dataService.read(this._controlExtension.getTargetService(json)).then(result => {
                let mapConfigurations = {};
                let baseMapConfig = {};
                let baseMapArray = [];
                let featureLayerConfig = {};
                let featureLayerArray = [];
                let authConfig = {};
                let authConfigRule = null;
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
                    } else if (paramGroup === 'AUTHENTICATION') {
                        if (paramName === 'ConfigRule') {
                            authConfigRule = paramValue;
                            continue;
                        }
                        authConfig[paramName] = paramValue;
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
                const authConfigKey = 'AuthenticationConfig';
                if (Object.keys(authConfig).length > 0) {
                    responseJson[authConfigKey] = authConfig;
                }
                if (authConfigRule) {
                    this._controlExtension.executeActionOrRule(authConfigRule).then((authResult) => {
                        Object.keys(authResult).forEach((key) => {
                            authConfig[key] = authResult[key];
                        });
                        if (Object.keys(authConfig).length > 0) {
                            responseJson[authConfigKey] = authConfig;
                        }
                        this._bridge.callback(responseJson, type);
                    }).catch((error) => {
                        this._bridge.callback(responseJson, type);
                    });
                } else {
                    this._bridge.callback(responseJson, type);
                }
            });
        }
    }

}
