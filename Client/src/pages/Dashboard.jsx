import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa"; // Import FontAwesome shopping cart icon
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 
  const goToAddLocation = () => {
    navigate("/add-location");
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const options = {
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
        params: {
          locationId: "304554",
        },
        headers: {
          "x-rapidapi-key":
            "4118a2a362msha42669bdaffd95ep1f189fjsn416f92ff7392",
          "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const restaurantData = response.data?.data?.data || [];
        console.log("Fetched data:", restaurantData); // Log the fetched data
        setRestaurants(restaurantData);
      } catch (err) {
        console.error("Error details:", err); // Log the error details
        setError(`Failed to fetch restaurants: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Restaurant Dashboard</h1>
      <button
        onClick={goToAddLocation}
        className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Add location
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {!loading && restaurants.length > 0
          ? restaurants.map((restaurant, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  width: "300px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={restaurant.squareImgUrl || restaurant.heroImgUrl || ""}
                  alt={restaurant.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <h3 style={{ margin: "10px 0" }}>
                  {restaurant.name || "No Name Available"}
                </h3>
                <p>
                  <strong>Rating:</strong> {restaurant.averageRating || "N/A"} /
                  5
                </p>
                <p>
                  <strong>Reviews:</strong> {restaurant.userReviewCount || 0}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {restaurant.currentOpenStatusText || "Unknown"}
                </p>
                <p>
                  <strong>Cuisine:</strong>{" "}
                  {restaurant.establishmentTypeAndCuisineTags?.join(", ") ||
                    "N/A"}
                </p>

                {/* Cart Icon */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  title="Add to Cart"
                >
                  <FaShoppingCart size={20} />
                </div>
              </div>
            ))
          : !loading && <p>No restaurants to display.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
