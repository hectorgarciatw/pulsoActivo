import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Activity } from "../types";

interface ActivityFormProps {
    onAddActivity: (activity: Activity) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("dumbbell");
    const [days, setDays] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newActivity: Activity = {
            id: Date.now().toString(),
            name,
            description,
            icon,
            days,
            completed: false,
        };
        onAddActivity(newActivity);
        setName("");
        setDescription("");
        setIcon("dumbbell");
        setDays([]);
    };

    const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Agregar Nueva Actividad</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción (opcional)
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Días</label>
                <div className="mt-2 flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => setDays(days.includes(day) ? days.filter((d) => d !== day) : [...days, day])}
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${days.includes(day) ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
            >
                <Plus className="mr-2" size={20} />
                Agregar Actividad
            </button>
        </form>
    );
};

export default ActivityForm;
