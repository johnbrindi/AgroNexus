import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weather';

export const useWeatherData = (location) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                setLoading(true);
                const data = await fetchWeatherData(location);
                setWeather(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, [location]);

    return { weather, loading, error };
};
