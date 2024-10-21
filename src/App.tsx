import { useState, useEffect } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import WeeklyStats from "./components/WeeklyStats";
import { Activity, WeeklyStats as WeeklyStatsType } from "./types";
import { Dumbbell } from "lucide-react";

function App() {
    const [activities, setActivities] = useState<Activity[]>(() => {
        const savedActivities = localStorage.getItem("activities");
        return savedActivities ? JSON.parse(savedActivities) : [];
    });

    const [stats, setStats] = useState<WeeklyStatsType>({
        completedActivities: 0,
        totalActivities: 0,
        progressPercentage: 0,
    });

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(activities));
        updateStats();
    }, [activities]);

    useEffect(() => {
        const resetActivities = () => {
            setActivities((prevActivities) => prevActivities.map((activity) => ({ ...activity, completed: false })));
        };

        const now = new Date();
        const nextSunday = new Date(now.setDate(now.getDate() + ((7 - now.getDay()) % 7)));
        nextSunday.setHours(0, 0, 0, 0);

        const timeUntilReset = nextSunday.getTime() - now.getTime();

        const resetTimer = setTimeout(resetActivities, timeUntilReset);

        return () => clearTimeout(resetTimer);
    }, []);

    const updateStats = () => {
        const completedActivities = activities.filter((a) => a.completed).length;
        const totalActivities = activities.length;
        const progressPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

        setStats({
            completedActivities,
            totalActivities,
            progressPercentage,
        });
    };

    const handleAddActivity = (activity: Activity) => {
        setActivities([...activities, activity]);
    };

    const handleToggleActivity = (id: string) => {
        setActivities(activities.map((activity) => (activity.id === id ? { ...activity, completed: !activity.completed } : activity)));
    };

    const handleDeleteActivity = (id: string) => {
        setActivities(activities.filter((activity) => activity.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <Dumbbell className="mx-auto h-16 w-16 text-white" />
                    <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Pulso Activo</h1>
                    <p className="mt-3 max-w-md mx-auto text-xl text-indigo-200 sm:text-2xl md:mt-5 md:max-w-3xl">Registra y sigue tus actividades físicas semanales</p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-6">
                        <ActivityForm onAddActivity={handleAddActivity} />
                        <WeeklyStats stats={stats} />
                    </div>
                    <div className="md:col-span-2">
                        <ActivityList activities={activities} onToggleActivity={handleToggleActivity} onDeleteActivity={handleDeleteActivity} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
