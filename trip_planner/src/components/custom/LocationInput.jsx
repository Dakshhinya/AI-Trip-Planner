import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';

const LocationInput = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            setLoading(true);
            try {
                const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`);
                if (response.data && response.data.results) {
                    const formatted = response.data.results.map(item => ({
                        display_name: `${item.name}${item.admin1 ? ', ' + item.admin1 : ''}, ${item.country}`,
                        lat: item.latitude,
                        lon: item.longitude
                    }));
                    setSuggestions(formatted);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="relative w-full">
            <Input
                value={query}
                onChange={handleSearch}
                placeholder="Search for a destination (e.g., Paris)"
                className="w-full"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-[9999] w-full bg-white border border-gray-400 rounded-md shadow-xl mt-1 max-h-60 overflow-auto list-none p-0">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="p-3 hover:bg-blue-100 cursor-pointer text-sm text-gray-900 border-b last:border-b-0"
                            style={{ backgroundColor: 'white' }}
                            onClick={() => {
                                console.log("Selected:", item.display_name);
                                setQuery(item.display_name);
                                setSuggestions([]);
                                onSelect({
                                    label: item.display_name,
                                    value: {
                                        description: item.display_name,
                                        lat: parseFloat(item.lat),
                                        lon: parseFloat(item.lon)
                                    }
                                });
                            }}
                        >
                            {item.display_name}
                        </li>
                    ))}
                </ul>
            )}
            {loading && <p className="absolute right-3 top-3 text-xs text-gray-400">Loading...</p>}
        </div>
    );
};

export default LocationInput;
