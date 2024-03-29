# FullCourtFiesta 🏀🎉

FullCourtFiesta is a React Native Expo application, serving as a basketball social network where users can connect, chat, create posts, and discover nearby basketball courts based on their location. It's a personal project in the MVP phase, built with a hexagonal architecture, providing flexibility to switch between backend frameworks—currently powered by Supabase with future plans to explore alternatives like Spring Boot.

‼️👀 This is currently a MVP so a lot of futures are not mature enough or developed, I just focused on built the basics for the app so I can use it to focus on my backend projects

## Key Features 🌟

- **Customized Profile:** Create your profile, add information about your basketball skills, and share your achievements.

- **Social Connection:** Find and connect with other basketball enthusiasts. Expand your network!

- **Real-time Chat:** Chat with other users in real-time. Organize games, share tips, or just have fun.

- **Content Posting:** Share your basketball-related experiences, photos, and videos. Inspire others and be part of the community.

- **Court Locator:** Discover nearby basketball courts based on your current location.

## Hexagonal Architecture 🔄

FullCourtFiesta is built using a hexagonal architecture to ensure flexibility in choosing the backend. It currently integrates with [Supabase](https://supabase.io/), but you can easily experiment with other backend frameworks like Spring Boot.

## Prerequisites 🛠️

- Node.js and npm
- Expo CLI

## Installation 🚀

1. Clone the repository:

```bash
git clone https://github.com/Guuri11/FullCourtFiesta
cd FullCourtFiesta
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npx expo start
```

4. Scan the QR code with the Expo Go app on your mobile device.

## Backend Configuration 🔧

If you wish to switch the backend, follow these steps:

Go to `src/infrastructure` folder and create the repository for that will connect with your specific backend. Then go to `src/ui/store/app/index.ts` and add the repository like others

## Architecture Overview 🏛️

The Hexagonal Architecture structured is inspired on this video from CodelyTV 
https://www.youtube.com/watch?v=eNFAJbWCSww&t=203s&pp=ygUdaGV4YWdvbmFsIHR5cGVzY3JpcHQgY29kZWx5dHY%3D

The FullCourtFiesta application follows a modular hexagonal architecture, emphasizing separation of concerns and flexibility. 
The project structure is organized into the following main directories:

- **assets:** Contains assets such as Lottie animations.

- **src:**
  - **application:** Business logic layer containing application services.
  
  - **domain:** Defines the core domain entities and aggregates:
    - **Authentication**
    - **Court**
    - **Event**
    - **Friendship**
    - **Message**
    - **Player**
    - **Post**
  
  - **infrastructure:** Infrastructure and configuration details:
    - **config:** Configuration settings for the application.
    - **locales/resources:** Localization resources for multilingual support.
    - **persistance/repositories:** Data repositories for different domain entities:
      - **Authentication**
      - **Court**
      - **Chat**
      - **Friendship**
      - **Player**
      - **Post**
  
  - **types:** Shared type definitions used across the application.
  
  - **ui:** User Interface components and layout-related modules:
    - **components/core:** Core reusable UI components.
    - **design/common:** Common design elements like Chat and Form components.
    - **design/layout/Notifications:** Notification-related layout components.
    - **router:** Navigation logic organized by application sections:
      - **Authentication/OnBoarding**
      - **Community**
      - **Home**
      - **Profile**
      - **Search**
  
  - **constants:** Application-wide constants.
  
  - **context:** Context providers for state management.
  
  - **hooks/store:** Custom hooks for state management.
  
  - **stores:** Application state stores for various concerns:
    - **app/authentication**
    - **app/authorization**
    - **app/location**
    - **app/ui**
    
  - **interfaces:** Interfaces used throughout the application.

This structure facilitates maintainability, testability, and future adaptability by separating concerns at both the domain and infrastructure levels.


## Some Screenshots 📸

<img src="https://github.com/Guuri11/FullCourtFiesta/assets/48799796/f26f8f56-a3cc-41c9-8c46-7c3d9d599206" alt="Screenshot 1" width="300" />
<img src="https://github.com/Guuri11/FullCourtFiesta/assets/48799796/f05d8803-e46c-49b2-bb69-a2a0ac3c8db1" alt="Screenshot 2" width="300" />
<img src="https://github.com/Guuri11/FullCourtFiesta/assets/48799796/88fbdc59-a947-4766-a605-32e981909259" alt="Screenshot 3" width="300" />



## License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
