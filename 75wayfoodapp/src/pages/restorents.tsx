

// import React from "react";
// import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useGetFoodSuggestionQuery, useGetRecommendationsQuery } from "../services/api"; // ✅ API hook for restaurants
// import pizza from "../assets/pizza.jpg";
// import sushi from "../assets/sushi.jpg";

// const Restorents: React.FC = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get("search") || "";
  
//   const foodSuggestionData = location.state || null; // ✅ Get food suggestions from state

//   // ✅ Fetch restaurant recommendations if a query exists
//   const { data: restaurantData, isLoading: isRestaurantLoading } = useGetRecommendationsQuery(query, {
//     skip: !query, // Skip API call if no query
//   });
//   const { data: foodSuggestions, isLoading: foodDataLoading } = useGetFoodSuggestionQuery(
//       query || "", 
     
//     );
//   console.log("Received foodSuggestionDatasss:", foodSuggestions);
//   console.log("Fetched restaurantData:", restaurantData);

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* ✅ Show restaurant recommendations if available */}
//       {query && (
//         <>
//           <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff4f5a", mb: 3 }}>
//             Restaurants with similar cuisines as {query}
//           </Typography>
//           {isRestaurantLoading ? (
//             <Typography variant="h6" color="text.secondary">Loading restaurants...</Typography>
//           ) : restaurantData?.data?.recommendations?.length > 0 ? (
//             <Grid container spacing={3}>
//               {restaurantData.data.recommendations.map((restaurant, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                   >
//                     <Card sx={{ borderRadius: 2 }}>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={index % 2 === 0 ? pizza : sushi} // ✅ Alternating images
//                         alt={restaurant.restaurant}
//                       />
//                       <CardContent>
//                         <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
//                           {restaurant.restaurant}
//                         </Typography>
//                         <Typography variant="body2" align="center" sx={{ mb: 1 }}>
//                           Cuisine: {restaurant.cuisines}
//                         </Typography>
//                         <Typography variant="body2" align="center" sx={{ mb: 1 }}>
//                           Rating: {restaurant["Mean Rating"]}
//                         </Typography>
//                         <Typography variant="body2" align="center">
//                           Location: {restaurant.location}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography variant="h6" color="text.secondary">No matching restaurants found.</Typography>
//           )}
//         </>
//       )}

//       {/* ✅ Show food recommendations if available */}
// {foodSuggestionData?.data?.recommendations?.length > 0 && (
//   <>
//     <Typography
//       variant="h4"
//       sx={{ fontWeight: "bold", color: "#ff4f5a", mt: 5, mb: 3 }}
//     >
//       Recommended Dishes for {foodSuggestionData.data.food_item}
//     </Typography>
//     <Grid container spacing={3}>
//       {foodSuggestionData.data.recommendations.map((food, index) => (
//         <Grid item xs={12} sm={6} md={4} key={index}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Card sx={{ borderRadius: 2 }}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={index % 2 === 0 ? pizza : sushi} // ✅ Alternating images
//                 alt={food.FoodItem}
//               />
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   align="center"
//                   sx={{ fontWeight: "bold", mb: 1 }}
//                 >
//                   {food.FoodItem}
//                 </Typography>
//                 <Typography variant="body2" align="center" sx={{ mb: 1 }}>
//                   Cuisine: {food.Cuisine}
//                 </Typography>
//                 <Typography variant="body2" align="center" sx={{ mb: 1 }}>
//                   Dish Type: {food.DishType}
//                 </Typography>
//                 <Typography variant="body2" align="center" sx={{ mb: 1 }}>
//                   Cooking Method: {food.CookingMethod}
//                 </Typography>
//                 <Typography variant="body2" align="center">
//                   Ingredients: {food.Ingredients}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   </>
// )}

//     </Box>
//   );
// };

// export default Restorents;

import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetFoodSuggestionQuery, useGetRecommendationsQuery } from "../services/api"; // ✅ API hooks
import pizza from "../assets/pizza.jpg";
import sushi from "../assets/sushi.jpg";

const Restorents: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search") || "";

  // ✅ Fetch restaurant recommendations if a query exists
  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetRecommendationsQuery(query, {
    skip: !query, // Skip API call if no query
  });

  // ✅ Fetch food suggestions if a query exists
  const { data: foodSuggestionData, isLoading: isFoodLoading } = useGetFoodSuggestionQuery(query, {
    skip: !query, // Skip API call if no query
  });

  console.log("Fetched restaurantData:", restaurantData);
  console.log("Fetched foodSuggestionData:", foodSuggestionData);

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Show restaurant recommendations if available */}
      {query && restaurantData?.data?.recommendations?.length > 0 && (
        <>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff4f5a", mb: 3 }}>
            Restaurants with similar cuisines as {query}
          </Typography>
          {isRestaurantLoading ? (
            <Typography variant="h6" color="text.secondary">Loading restaurants...</Typography>
          ) : (
            <Grid container spacing={3}>
              {restaurantData.data.recommendations.map((restaurant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ borderRadius: 2 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={index % 2 === 0 ? pizza : sushi} // ✅ Alternating images
                        alt={restaurant.restaurant}
                      />
                      <CardContent>
                        <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
                          {restaurant.restaurant}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Cuisine: {restaurant.cuisines}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Rating: {restaurant["Mean Rating"]}
                        </Typography>
                        <Typography variant="body2" align="center">
                          Location: {restaurant.location}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* ✅ Show food recommendations if available */}
      {query && foodSuggestionData?.data?.recommendations?.length > 0 && (
        <>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#ff4f5a", mt: 5, mb: 3 }}
          >
            Recommended Dishes for {foodSuggestionData.data.food_item}
          </Typography>
          {isFoodLoading ? (
            <Typography variant="h6" color="text.secondary">Loading dishes...</Typography>
          ) : (
            <Grid container spacing={3}>
              {foodSuggestionData.data.recommendations.map((food, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ borderRadius: 2 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={index % 2 === 0 ? pizza : sushi} // ✅ Alternating images
                        alt={food.FoodItem}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {food.FoodItem}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Cuisine: {food.Cuisine}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Dish Type: {food.DishType}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Cooking Method: {food.CookingMethod}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Ingredients: {food.Ingredients}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                          Meal Type: {food.MealType}
                        </Typography>
                        <Typography variant="body2" align="center">
                          Spice Level: {food.SpiceLevel}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* ✅ If no data is found */}
      {!isRestaurantLoading &&
        !isFoodLoading &&
        (!restaurantData?.data?.recommendations?.length && !foodSuggestionData?.data?.recommendations?.length) && (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 5 }}>
            No matching restaurants or dishes found.
          </Typography>
        )}
    </Box>
  );
};

export default Restorents;
