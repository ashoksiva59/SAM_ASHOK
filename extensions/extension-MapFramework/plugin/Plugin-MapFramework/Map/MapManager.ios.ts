declare var MapBridge: any;

import {ControlDelegate} from '../Common/ControlDelegate';

export class Map {

    protected _delegate: any;

    // Returns a view
    public create(params, dataService, mapExtension): any {
        let bridge = MapBridge.new();
        mapExtension._bridge = bridge;
        this._delegate = ControlDelegate.initWithDataServiceAndBridge(dataService, bridge, mapExtension);
        return bridge.createWithParamsAndDelegate(params, this._delegate);
    }

    public getDelegate(): any {
        return this._delegate;
    }

    public setDelegate(delegate) {
        this._delegate = delegate;
    }
};
