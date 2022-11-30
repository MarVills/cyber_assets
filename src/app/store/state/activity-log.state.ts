import { ActivityLog, ActivityLogDTO } from "src/app/Models/activity-log-model"


export interface ActivityLogs {
    activityLogs: ActivityLog[]
}
export interface  ActivityLogsDTO {
    activityLogs: ActivityLogDTO[]
}
export interface ActivityLogsState {
    activityLogs: any,
}