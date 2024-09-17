# Munch

Munch is a web application that helps user discover new restaurants using a single image of any food. It uses Gemini API to identify what the food is and the Yelp API to display the list of restaurant.

## Features ##
- Identify any type of foods present in a photo.
- Displays a list of restaurant which best matches the food based on it's cuisine.
- Responsive design which works well on both desktop and mobile.
- As simple as uploading an image and letting the app do the rest.

## Demo ##
You can check out the app's live deployment here [here](https://munchapp.vercel.app)

## How to install locally ##

### Setting up environment variables ###
Backend:
Create a .env file in Munch/API folder and add the following:

YELP_API_KEY = "INSERT_YOUR_OWN"  
GOOGLE_API_KEY = "INSERT_YOUR_OWN"  
PORT=8080  

Frontend:
Create a .env file in Munch/vite-project folder and add the following:

VITE_SERVER_END_POINT="http://localhost:8080"   
VITE_GOOGLE_PLACES_API_KEY="INSERT_YOUR_OWN"    

### Installing dependencies ###
In root folder, run `npm run install-all`

### Starting the server and client ###
In root folder, run `npm start`
