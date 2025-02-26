


# Restaurant/Food Recommendation System

## 📌 Setup Instructions

1. **Create a Virtual Environment**
   ```bash
   python3 -m venv myenv
   ```
2. **Activate the Virtual Environment**
   - **For macOS/Linux**:
     ```bash
     source myenv/bin/activate
     ```
   - **For Windows**:
     ```bash
     myenv\Scripts\activate
     ```

3. **Run the Application**
   ```bash
   python app.py
   ```

## 🌐 API Endpoints

### 🔍 Get Restaurant Recommendations
- **Endpoint:** `/api/recommend`
- **Method:** `GET`
- **Description:** Returns a list of restaurants similar to the given restaurant.
- **Example Usage:**
  ```
  http://127.0.0.1:5000/api/recommend?name=The Marash
  ```

### 🔍 Get Suggested Restaurant Names
- **Endpoint:** `/api/suggest`
- **Method:** `GET`
- **Description:** Returns closely matching restaurant names based on the given input.
- **Example Usage:**
  ```
  http://127.0.0.1:5000/api/suggest?name=The marash
  ```
### 🔍 Get Suggested food Names
- **Endpoint:** `/api/food/recommendations`
- **Method:** `GET`
- **Description:** Returns closely matching restaurant names based on the given input.
- **Example Usage:**
  ```
  http://127.0.0.1:5001//api/food/recommendations?food=Jalebi
  ```
## 🧠 Model Overview

The recommendation system is built using **TF-IDF Vectorization** and **Cosine Similarity**:

1. **Text Vectorization**:
   - Converts restaurant/food descriptions into numerical vectors using **TF-IDF (Term Frequency - Inverse Document Frequency)**.
2. **Similarity Calculation**:
   - Computes pairwise **cosine similarity** between restaurant vectors.
   - A restaurant's similarity to others is determined based on its textual description.
3. **Recommendation Process**:
   - When a user searches for a restaurant, the system retrieves the most similar ones based on their descriptions.
4. **Restaurant Name Suggestions**:
   - Uses **fuzzy matching** (`get_close_matches`) to suggest similar restaurant names when there’s a typo or partial name input.


```
## 📜 Requirements
Ensure you have the following dependencies installed:
```bash
pip install flask flask-cors numpy pandas scikit-learn nltk seaborn matplotlib
```
Alternatively, install all required packages using:
```bash
pip install -r requirement.txt


---
🚀 **Built with Flask, Scikit-learn, and NLP Techniques**