import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { fetchFoodSuggestions, fetchRecommendations, fetchSuggestions } from "../common/services/restorent.api-call";
import { createResponse } from "../common/helper/response.hepler";


export const getRecommendations = asyncHandler(async (req: Request, res: Response) => {
    const restaurantName = req.query.name as string;
    if (!restaurantName) {
        res.status(400).send(createResponse(null, "Restaurant name is required"));
        return;
    }
    const recommendations = await fetchRecommendations(restaurantName);
    
    res.send(createResponse(recommendations, "Recommendations fetched successfully"));
});


export const getSuggestions = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.name as string;
    if (!query) {
        res.status(400).send(createResponse([], "Query parameter is required"));
        return;
    }
    const suggestions = await fetchSuggestions(query);
    res.send(createResponse(suggestions, "Suggestions fetched successfully"));
});

export const getFoodSuggestion=asyncHandler(async(req:Request,res:Response)=>{
    const query=req.query.food as string;
    if(!query){
        res.status(400).send(createResponse([],"Query Parametre is required"))
        return
    }
    const suggestions=await fetchFoodSuggestions(query)
    res.send(createResponse(suggestions,"Suggestions fetched successfully"))
})
