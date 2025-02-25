from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load the dataset
df = pd.read_csv("indian_food_recomm.csv")

# Combine relevant features for vectorization
df["combined_features"] = df.fillna("").apply(lambda x: " ".join(x.astype(str)), axis=1)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df["combined_features"])

# Compute Cosine Similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


def get_recommendations(food_item):
    # Normalize input for case-insensitive search
    food_item = food_item.lower().strip()
    df["FoodItem"] = df["FoodItem"].str.lower().str.strip()

    # Check if the food item exists
    if food_item not in df["FoodItem"].values:
        return []

    idx = df[df["FoodItem"] == food_item].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]  # Top 5 similar items
    food_indices = [i[0] for i in sim_scores]

    # Return all details of recommended items
    return df.iloc[food_indices].to_dict(orient="records")


@app.route('/api/food/recommendations', methods=['GET'])
def recommendations():
    food_item = request.args.get('food', '').strip()

    if not food_item:
        return jsonify({"error": "Missing 'food_item' query parameter"}), 400

    recommendations = get_recommendations(food_item)

    if not recommendations:
        return jsonify({"message": f"No recommendations found for '{food_item}'"}), 404

    return jsonify({"food_item": food_item, "recommendations": recommendations})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
