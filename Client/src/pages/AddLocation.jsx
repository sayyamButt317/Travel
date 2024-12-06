import React, { useState } from 'react';
import axios from 'axios';

const AddLocation = () => {
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addedLocation, setAddedLocation] = useState(null);  // State to store the added location

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      const response = await axios.post('/api/add-locations', {
        LocationName: locationName,
        Description: description,
        CityName: cityName,
        Country: country,
      });

      if (response.status === 200) {
        alert("Location added successfully");

        // Set the added location to display it below the form
        setAddedLocation({
          LocationName: locationName,
          Description: description,
          CityName: cityName,
          Country: country,
        });

        // Reset form fields
        setLocationName('');
        setDescription('');
        setCityName('');
        setCountry('');
      }
    } catch (error) {
      setError("Failed to add location. Please try again.");
      console.error("Error adding location:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
      <form noValidate onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Location Information</p>
            <p className="text-xs">Please provide the details of the location.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="locationName" className="text-sm">Location Name</label>
              <input
                id="locationName"
                type="text"
                placeholder="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                required
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="text-sm">Description</label>
              <textarea
                id="description"
                placeholder="Describe the location"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                required
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="cityName" className="text-sm">City Name</label>
              <input
                id="cityName"
                type="text"
                placeholder="City Name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                required
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="country" className="text-sm">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                required
              />
            </div>
          </div>
        </fieldset>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? 'Adding...' : 'Add Location'}
          </button>
        </div>
      </form>

      {/* Display the added location */}
      {addedLocation && (
        <div className="mt-8 p-6 border rounded shadow-md">
          <h2 className="text-xl font-bold">Added Location</h2>
          <p><strong>Location Name:</strong> {addedLocation.LocationName}</p>
          <p><strong>Description:</strong> {addedLocation.Description}</p>
          <p><strong>City:</strong> {addedLocation.CityName}</p>
          <p><strong>Country:</strong> {addedLocation.Country}</p>
        </div>
      )}
    </section>
  );
};

export default AddLocation;
