import React from "react";
import { Activity } from "../types";

interface ActivityListProps {
    activities: Activity[];
    onToggleActivity: (id: string) => void;
    onDeleteActivity: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onToggleActivity, onDeleteActivity }) => {
    const getDayOfWeek = () => {
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const today = new Date().getDay();
        return days[today];
    };

    const today = getDayOfWeek();
    const todayActivities = activities.filter((activity) => activity.days.includes(today));

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Actividades de Hoy ({today})</h2>
            {todayActivities.length === 0 ? (
                <p className="text-gray-500">No hay actividades programadas para hoy.</p>
            ) : (
                <ul className="space-y-4">
                    {todayActivities.map((activity) => (
                        <li key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <input type="checkbox" checked={activity.completed} onChange={() => onToggleActivity(activity.id)} className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <div>
                                    <h3 className="font-semibold">{activity.name}</h3>
                                    {activity.description && <p className="text-sm text-gray-600">{activity.description}</p>}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${activity.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{activity.completed ? "Completada" : "Pendiente"}</span>
                                <button onClick={() => onDeleteActivity(activity.id)} className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActivityList;
