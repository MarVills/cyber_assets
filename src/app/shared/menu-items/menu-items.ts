import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer',
        toolTip: 'Go back to Dashboard'
    },
    {
        state: 'manage-users',
        name: 'Manage Users',
        type: 'link',
        icon: 'account_circle',
        toolTip: 'Manage Users'
    },
    {
        state: 'equipment-condition',
        name: 'Equipment Condition',
        type: 'link',
        icon: 'playlist_add_check',
        toolTip: 'Monitor Equipment\'s condition'
    },
    // {
    //     state: 'request',
    //     name: 'Requests',
    //     type: 'link',
    //     icon: 'exit_to_app',
    //     toolTip: 'Go to requests page'
    // },
    {
        state: 'inventory',
        name: 'Inventory',
        type: 'sub',
        icon: 'dvr',
        badge: [{ type: 'purple', value: '1' }],
        toolTip: 'Equipment\'s inventory ',
        children: [
            { state: 'equipments', name: 'Equipments', type: 'link', toolTip: 'Go to list of equipments', icon: "weekend"},
            // { state: 'release-equipment', name: 'Release Equipments', type: 'link', toolTip: 'See list of released equipments', icon: "vertical_align_top"},
            // { state: 'recieve-equipment', name: 'Recieve Equipments', type: 'link', toolTip: 'See list of recieved equipments', icon: "vertical_align_bottom" },
        ]
    },
    {
        state: 'reports',
        name: 'Reports',
        type: 'link',
        icon: 'trending_up',
        toolTip: 'Go to reports page'
    },
    {
        state: 'activity-log',
        name: 'Activity Log',
        type: 'link',
        icon: 'format_list_bulleted',
        toolTip: 'Go to activity page'
    },

];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
