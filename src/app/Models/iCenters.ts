export interface InterfaceCenter {
    point: firebase.firestore.GeoPoint;
    name: string;
    address: string;
    status: CENTER_STATUS;
}

export enum CENTER_STATUS {
    OPEN = 0,
    CLOSED,
    FULL_CAPACITY,
    SELECTED,
    DESELECTED,
    LOADED,
}

export class Center implements InterfaceCenter {
    point: firebase.firestore.GeoPoint;
    name: string;
    address: string;
    status: CENTER_STATUS;
    constructor(center: InterfaceCenter) {
        if (center == null) {
            return;
        }
        this.point = center.point;
        this.address = center.address;
        this.status = center.status == null ? CENTER_STATUS.DESELECTED : CENTER_STATUS.SELECTED;
        this.name = center.name;
    }


    getIcon(): string {
        let url = '';
        switch (this.status) {
            case CENTER_STATUS.SELECTED:
                url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                break;
            case CENTER_STATUS.DESELECTED:
                url = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                break;
            case CENTER_STATUS.OPEN:
                url = 'http://labs.google.com/ridefinder/images/mm_20_gray.png';
                break;
        }
        return url;
    }
}