import { BaseExtension } from './BaseExtension';
import { MapBridge } from 'extension-MapFramework';
import { MapParser } from './MapParser';
import { Utils } from './Utils';
import { IDefinitionProvider } from '../../../definitions/IDefinitionProvider';
import { device } from 'platform';

export class MapExtension extends BaseExtension {

    // Hold reference to the delegate so it isn't immediately collected by ARC
    protected _delegate: any;

    protected objectSchemeMap: any;

    public initialize(props) {
        this._parser = new MapParser();
        super.initialize(props);
        let map = new MapBridge();
        let mapViewController = map.create(this.getParams(), this.getDataService(), this);
        this._delegate = map.getDelegate();
        this.setViewController(mapViewController);
    }

    public parseParameters(params, context) {
        super.parseParameters(params, context);

        let businessObjects = params.BusinessObjects;
        if (businessObjects !== undefined && Array.isArray(businessObjects)) {
            this.objectSchemeMap = {};
            businessObjects.forEach(element => {
                // Copy the object scheme into a map for formatting objects
                if (element.Target === undefined || //
                    element.Target.EntitySet === undefined || // 
                    element.ObjectScheme === undefined) {
                    // Not configured properly, continue
                    return;
                }
                this.objectSchemeMap[element.Target.EntitySet] = Utils.clone(element.ObjectScheme);
            });
        }
    }

    public getObjectSchema(entitySet) {
        return this.objectSchemeMap[entitySet];
    }

    public getObjects(jsonDictionary, type) {
        super.getObjects(jsonDictionary, type).then(objects => {
            jsonDictionary.Objects = this.prepareObjects(objects);
            // this is temprary code untill the android code is consolidated
            if (device.os === 'Android') {
                this._bridge.callback(JSON.stringify(jsonDictionary), type);
            } else {
                this._bridge.callback(jsonDictionary, type);
            }
        });
    }

    public onPageLoaded(pageExists: boolean) {
        if (device.os === 'Android') {
            if (this._bridge != null) {
                this._bridge.callback(JSON.stringify(''), 'Resume');
            }
        }
    }

    /** 
     * Called when the parent page is unloaded.  
     * @param pageExists Whether or not the page still exists on the stack after unload
     */
    public onPageUnloaded(pageExists: boolean) {
        
        if (!pageExists) {
            // Page is being unloaded and does not exists on the back stack
            // It should be told to drop extra resources
            if (device.os === 'Android') {
                this._delegate.setControlExtension(null);
            } else {
                this._delegate.setControlExtension(this);
            }
            this._delegate = null;
            let blankjson = JSON.stringify({});
            this._bridge.callback(blankjson, 'Reset');
            this._bridge = null;
        } else {
            if (device.os === 'Android') {
                // When navigating from Overview
                if (this._bridge != null) {
                    this._bridge.callback(JSON.stringify(''), 'Pause');
                }
            }
        }
    }
    
    public onNavigatedTo(pageExists: boolean) {
        if (device.os === 'Android') {
            if (this._bridge != null) {
                this._bridge.callback('', 'NavigatedTo');
            }
        }
    }
    
    public onDisplayingModal(isFullPage: boolean) {  
        // to be implemented
    }

    /**
     * If the extension is not added to the view controller heirarchy, 
     * this method is used to manually trigger a map update
     */
    public update() {
        if (this._bridge != null) {
            let blankjson = JSON.stringify({});
            this._bridge.callback(blankjson, 'Update');
        }
    }

    /**
     * Tell the map to perform a user action update. 
     * This means update the objects without resetting view bounds 
     * as well as updating details menu (if needed)
     */
    public userActionUpdate() {
        let blankjson = JSON.stringify({});
        this._bridge.callback(blankjson, 'UserActionUpdate');
    }

    public clearUserDefaults() {
        let blankjson = JSON.stringify({});
        this._bridge.callback(blankjson, 'ClearUserDefaults');
    }

    public clearRouteCache() {
        let blankjson = JSON.stringify({});
        this._bridge.callback(blankjson, 'ClearRouteCache');
    }
    
    // Prepare objects to be delivered to the Map Framework
    protected prepareObjects(objects): any {
        return objects;
   }
};
