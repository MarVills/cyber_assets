export interface ActivityLog{
    id?: string;
    activity: string;
    userName: string;
    userRole: string;
    date: string;
}

export interface ActivityLogDTO{
    id: string;
    activity: string;
    userName: string;
    userRole: string;
    date: string;
}

export const ACTIVITY_LOG_DATA: ActivityLog[] = [];