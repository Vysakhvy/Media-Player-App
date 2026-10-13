# Media Player App (React + JSON Server)

A beginner-friendly video library built with React, Vite, Bootstrap, Axios, and JSON Server.

## Features
- Landing page with three feature cards and a Get Started button.
- Three sample videos are included in `backend/db.json`.
- Add videos using a caption, thumbnail URL, and video URL.
- Play YouTube links in an embedded player or MP4 links in the video player.
- Delete videos using the delete icon.
- Drag and drop video cards to reorder them; the order is saved to `db.json`.
- Add and delete categories.
- Watch history table with serial number, caption, video URL, date/time, and delete action.
- Back Home button on the Watch History page.
- Upload Video modal with upload icon.

> This demo stores video links and text in `db.json`. It does not upload actual video files to the server. Use a publicly accessible video URL.

## Run the backend
1. Open a terminal in the `backend` folder.
2. Run `npm install` (only needed the first time).
3. Run `npm start`.
4. JSON Server should be available at `http://localhost:3000`.

## Run the frontend
1. Open a second terminal in the `frontend` folder.
2. Run `npm install --legacy-peer-deps` (only needed the first time).
3. Run `npm run dev`.
4. Open the local URL shown by Vite, usually `http://localhost:5173`.

Keep the backend terminal running while using the frontend.

## How it works
- `frontend/src/Components/AddVideo.jsx` collects video details and sends them to the backend.
- `frontend/Services/allAPI.js` contains the API functions.
- `frontend/Services/commonAPI.js` uses Axios for HTTP requests.
- `backend/db.json` is the JSON database.
- `frontend/src/Components/ViewVideo.jsx` fetches, displays, and reorders videos.
- `frontend/src/Pages/WatchHistory.jsx` displays and deletes watch history records.

## Important
JSON Server is useful for learning and local demos, but it is not a secure production backend. It stores information in a local JSON file and does not provide secure authentication or media file storage.
