

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaLocationArrow } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useLogoutMutation } from "../services/api";
import { useGetSuggestionsQuery, useGetFoodSuggestionQuery } from "../services/api"; // Import your API hook
import foodList from "../data/searchFood";

import { motion } from "framer-motion";
const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [logoutUser] = useLogoutMutation()
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  // console.log(foodSuggestionData)

  const { data: response = [], isLoading } = useGetSuggestionsQuery(searchQuery, {
    skip: searchQuery.length < 2,
  });
  const suggestions = response?.data || [];



  const localSuggestions = foodList.filter((food) =>
    food.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const suggestionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const mergedSuggestions = Array.from(new Set([...localSuggestions, ...suggestions]));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  const { data: foodSuggestionData, isLoading: foodDataLoading } = useGetFoodSuggestionQuery(
    selectedSuggestion || "",
    { skip: !selectedSuggestion } // Prevents calling API with an empty value
  );

  const handleSuggestionClick = (restaurantName: string) => {


    setTimeout(() => {  // Ensure state is updated before navigating
      navigate(`/restorents?search=${encodeURIComponent(restaurantName)}`, {

      });
    }, 100); // Slight delay to allow state update
    setSelectedSuggestion(restaurantName);
    setSearchQuery(""); // Clear search input
  };





  const handleCLose = (route = 'logout') => {
    return () => {
      if (route) {
        if (route == 'logout') {
          logoutUser()
        }
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      { }
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "8px 0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Location */}
          <Box
            component={Link}
            to="/"
            display="flex"
            alignItems="center"
            sx={{ textDecoration: "none", color: "#333" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff4f5a" }}>
              Foodigy
            </Typography>
            <Hidden smDown>
              <IconButton sx={{ color: "#666", marginLeft: 1 }}>
                <FaLocationArrow size={16} />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Typography variant="body2" sx={{ color: "#666", marginLeft: "4px" }}>
                Mohali, India
              </Typography>
            </Hidden>
          </Box>

          
          <Box sx={{ position: "relative", maxWidth: "500px", flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                padding: "8px 14px",
                borderRadius: "8px",
                width: { xs: "60%", sm: "70%", md: "100%" },
                margin:{xs:"10px"}
              }}
            >
              <FaSearch size={18} color="#666" />
              <InputBase
                placeholder="Search for restaurants, cuisine..."
                sx={{ marginLeft: "10px", flex: 1 }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Box>
            {searchQuery && mergedSuggestions.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={suggestionVariants}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    top: "100%",
                    left: 0,
                    zIndex: 10,
                  }}
                >
                  <Paper
                    sx={{
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                      borderRadius: "12px",
                      mt: 1,
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "8px",
                    }}
                  >
                    <List sx={{ width: "100%" }}>
                      {mergedSuggestions.map((name: string, index: number) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ListItem
                            component="button"
                            onClick={() => handleSuggestionClick(name)}
                            sx={{
                              padding: "12px",
                              borderRadius: "6px",
                              transition: "background-color 0.2s ease-in-out",
                              "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                          >
                            <ListItemText primary={name} />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </Paper>
                </Box>
              </motion.div>
            )}

          </Box>

          {/* Navigation Icons */}
          <Box display="flex" alignItems="center" gap={2}>
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ color: "#ff4f5a", fontWeight: "bold" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="contained"
                  sx={{ backgroundColor: "#ff4f5a", "&:hover": { backgroundColor: "#e6444f" } }}
                >
                  Sign up
                </Button>

              </>
            ) : (
              <>
                <Hidden smDown>
                  <Button onClick={handleCLose('logout')} sx={{ color: "#ff4f5a", fontWeight: "bold" }}>
                    Logout
                  </Button>
                </Hidden>
                <Button
                  onClick={() => navigate("/orders")}
                  variant="contained"
                  sx={{ backgroundColor: "#ff4f5a", "&:hover": { backgroundColor: "#e6444f" } }}
                >
                  Cart
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;


