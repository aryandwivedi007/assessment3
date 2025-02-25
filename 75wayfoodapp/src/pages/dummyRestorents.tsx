import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust path as needed
import RestaurantCard from "../component/RestorentCard";

export const DummyRestorents = () => {
  const applications = useSelector((state: RootState) => state.partner.applications);

  console.log("Restaurant Applications:", applications);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" ,margin:"45px"}}>
      {applications.map((restaurant, index) => (
        <RestaurantCard
          key={index}
          image="https://via.placeholder.com/300" // Replace with actual restaurant image if available
          name={restaurant.restaurantName}
          location={restaurant.address}
          cuisine={restaurant.cuisine}
          rating={Math.floor(Math.random() * 5) + 1} // Replace with actual rating if available
        />
      ))}
    </div>
  );
};
