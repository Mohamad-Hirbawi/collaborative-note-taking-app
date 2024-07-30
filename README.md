# Collaborative Note-Taking App

## Video Demo

Check out this [video demonstration](https://drive.google.com/drive/u/3/folders/1vOKW_yPJP-Dt-3dxefxPuxyDgUgpwvuQ) of the application in action!

## Overview

The Collaborative Note-Taking App is a web application built using React and Firebase. It allows users to create, edit, and manage notes collaboratively. The app includes features such as user authentication, note version history, and category-based note filtering. It leverages Firebase for backend services including authentication and Firestore for database management.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Note Creation**: Users can add new notes with categories.
- **Note Editing**: Users can edit existing notes, and changes are tracked in the version history.
- **Note History**: View the history of changes for each note, including initial content and subsequent edits.
- **Category Filtering**: Filter notes based on their categories.
- **Real-Time Updates**: Notes and history are updated in real-time using Firebase Firestore.
- **Responsive Design**: User interface designed with Bootstrap for responsiveness.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project set up with Firestore and Authentication enabled.

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/YourUsername/collaborative-note-taking-app.git
    cd collaborative-note-taking-app/collaborative-note-taking-app
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Configure Firebase**:

    - Create a `firebase.js` file in the `src` directory and add your Firebase configuration details:

    ```javascript
    // src/firebase.js
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    export { firestore, auth };
    ```

### Running the Application

1. **Start the development server**:

    ```sh
    npm start
    ```

2. **Open your browser**:

   Navigate to `http://localhost:3000` to view the application.


## Contribution Guidelines

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to ChatGPT for assistance in developing and troubleshooting this project.
- Firebase for providing the backend services.
- Bootstrap for the responsive design framework.

## Contact

For any questions or feedback, please contact [Mohammad Hirbawi](mailto:hirbawi198@gmail.com).


