import React from "react";
import { WeeklyStats as WeeklyStatsType } from "../types";
import { BarChart, Activity } from "lucide-react";

interface WeeklyStatsProps {
    stats: WeeklyStatsType;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({ stats }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Estadísticas Semanales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-blue-800 font-semibold">Actividades Completadas</span>
                        <Activity className="text-blue-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-blue-800 mt-2">{stats.completedActivities}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-green-800 font-semibold">Total de Actividades</span>
                        <BarChart className="text-green-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-green-800 mt-2">{stats.totalActivities}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-purple-800 font-semibold">Progreso</span>
                        <div className="relative w-16 h-16">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#E2E8F0"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#8B5CF6"
                                    strokeWidth="3"
                                    strokeDasharray={`${stats.progressPercentage}, 100`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-purple-800 font-bold">{stats.progressPercentage}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyStats;
