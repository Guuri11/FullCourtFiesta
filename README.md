# FullCourtFiesta 🏀🎉

FullCourtFiesta is a React Native Expo application, serving as a basketball social network where users can connect, chat, create posts, and discover nearby basketball courts based on their location. It's a personal project in the MVP phase, built with a hexagonal architecture, providing flexibility to switch between backend frameworks—currently powered by Supabase with future plans to explore alternatives like Spring Boot.

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


## License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
