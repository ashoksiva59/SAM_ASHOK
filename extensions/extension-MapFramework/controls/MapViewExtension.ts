import { MapExtension } from './MapExtension';
import { device } from 'platform';

export class MapViewExtension extends MapExtension {
    public view() {
        if (device.os === 'Android') {
            return super.view();
        } else {
            return super.view().view;
        }
    }
}
