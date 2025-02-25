import express from "express";
import * as restorentController from './restorent.controller'

const restorentRoutes = express.Router();

restorentRoutes.get("/recommend", restorentController.getRecommendations);
restorentRoutes.get("/suggest", restorentController.getSuggestions);
restorentRoutes.get("/food/suggest",restorentController.getFoodSuggestion)
export default restorentRoutes;
