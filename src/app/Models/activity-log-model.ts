export interface ActivityLog{
    id?: string;
    activity: string;
    userName?: string;
    userRole?: string;
    user_id: string;
    date: string;
    created_at?:string 
}

export interface ActivityLogDTO{
    id: string;
    activity: string;
    userName?: string;
    userRole?: string;
    user_id: string;
    date: string;
    created_at?:string 
}

export const ACTIVITY_LOZG_DATA: ActivityLog[] = [];