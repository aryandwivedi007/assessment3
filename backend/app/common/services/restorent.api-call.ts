import axios from "axios";

const FLASK_BASE_URL = process.env.FLASK_BASE_URL ?? "http://localhost:5000";
const FLASK_BASE_URL2=process.env.FLASK_BASE_URL ?? "http://localhost:5001";

export const fetchRecommendations = async (restaurantName: string) => {
    try {
        const response = await axios.get(`${FLASK_BASE_URL}/api/recommend`, {
            params: { name: restaurantName },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to fetch recommendations");
    }
};


export const fetchSuggestions = async (query: string) => {
    try {
        const response = await axios.get(`${FLASK_BASE_URL}/api/suggest`, {
            params: { name: query },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to fetch suggestions");
    }
};

export const fetchFoodSuggestions=async(query:string)=>{
    try{
        const response=await axios.get(`${FLASK_BASE_URL2}/api/food/recommendations`,{
            params: { food: query }
        })
        
        return response.data
        
    }catch (error:any){
        throw new Error(error.response?.data?.error || "Failed to fetch suggestions");
    }
}
