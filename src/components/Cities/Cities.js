import { useEffect, useState } from "react";

function Cities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch(
        "https://graphproject-482d9-default-rtdb.europe-west1.firebasedatabase.app/locations.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedCities = [];

      for (const key in responseData) {
        loadedCities
          .push({
            id: key,
            countryId: responseData[key].country_id,
            cityName: responseData[key].name,
            latitude: responseData[key].latitude,
            longitude: responseData[key].longitude,
          })
          ;
      }
      
      setCities(loadedCities.slice(1));
      setIsLoading(false);
    };

    fetchCities().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }
  console.log(cities);
}

export default Cities;
