export interface Activity {
    id: string;
    name: string;
    description?: string;
    icon: string;
    days: string[];
    completed: boolean;
}

export interface WeeklyStats {
    completedActivities: number;
    totalActivities: number;
    progressPercentage: number;
}
