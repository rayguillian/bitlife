NFORMATION ARCHITECTURE: Project Codename: “Lifelike”
1. 🌐 Entry Point: Welcome & Onboarding
java
Copy
Edit
/
├── WelcomeScreen
│   ├── SignIn (Firebase Auth: Email, Google, Apple)
│   ├── GuestPlay
│   └── Onboarding Tutorial (skippable)
2. 🏠 Home Dashboard
pgsql
Copy
Edit
/dashboard
├── NewGame
│   ├── ChooseEra (1950s, 1980s, Now, Future)
│   ├── ChooseLocation (City/Country – affects laws, opportunities)
│   ├── ChooseClass (Socialite, Entrepreneur, Rebel, etc.)
│   ├── CustomizeCharacter (Gender, Look, Stats, Name)
│   └── AI Settings (OpenAI, DeepSeek, Creativity Slider)

├── ContinueGame
├── MyWorlds (Saved Games)
├── ExploreWorlds (Public Seeds, Shared Stories)
├── DailyMystery (AI-generated random realm prompt)
3. 🧠 Game Core UI
pgsql
Copy
Edit
/game/:worldId
├── StoryWindow (Main narrative flow)
│   ├── StoryText (AI Generated)
│   ├── Choices (Buttons or Text Input)
│   └── Action Feedback

├── CharacterPanel
│   ├── Stats (Health, Wealth, Intelligence, Morality…)
│   ├── Traits (Introvert, Charming, Vengeful…)
│   └── Timeline of Key Life Events

├── SocialMap
│   ├── Friends, Family, Rivals, NPC Bios
│   └── Relationship Web View (React Force Graph)

├── Inventory & Skills
│   ├── Career Progress (Tree View)
│   ├── Items, Money, Properties
│   └── Learnable Skills (Mini-games trigger)

├── MinigamesHub
│   ├── Job Tasks (Surgeries, Sales, Negotiation)
│   ├── Relationship Games (Persuasion, Date Planning)
│   ├── Random Events (Fight, Escape, Heist)
4. 🔮 AI Backends
bash
Copy
Edit
/api/ai
├── eventGenerator
│   └── Inputs: stats, location, era, relationships
│   └── Outputs: dynamic life events

├── decisionImpact
│   └── Handles stat/trait/memory updates

├── npcMemoryEngine
│   └── Stores emotional + factual history

├── npcGoalEngine
│   └── Drives NPC goals/actions (e.g., change jobs, move, rivalries)

├── lifeMysteryEngine
│   └── Procedurally seeds long-term mysteries

├── narrativeWriter
│   └── GPT/DeepSeek storytelling generator
5. 📚 Content Structure
pgsql
Copy
Edit
/content
├── events.json
│   └── Template-based events with variables (job_loss, dating_fail, etc.)

├── traits.json
│   └── Trait definitions and interactions

├── minigames/
│   ├── surgery.json
│   ├── persuasion.json
│   └── debate.json

├── settings/
│   ├── eras.json (laws, tech, culture)
│   ├── locations.json (city data, costs, crime)
│   └── names.json (regionally generated names)

6. 🔒 User & Game State
bash
Copy
Edit
/firebase
├── users/
│   └── {userId}
│       ├── profile
│       ├── preferences
│       └── savedGames

├── worlds/
│   └── {worldId}
│       ├── playerData
│       ├── npcs
│       ├── eventLog
│       └── worldState
7. ⚙️ Settings & Utilities
mathematica
Copy
Edit
/settings
├── Audio
├── FontSize
├── Accessibility (Colorblind Mode, Dyslexia Font)
├── AI Engine Tuner (Temp, Top-P, Model Toggle)
8. 🌐 Community & Sharing (Phase 2+)
bash
Copy
Edit
/community
├── SharedStories (Replay others’ lives)
├── CreateScenario (Modding support)
├── Leaderboards (Longest life, wealthiest, infamous)
├── Feedback + Reporting
📊 Developer Notes
Tech Stack:

Frontend: React (Vite + TypeScript), Tailwind, Framer Motion

Backend: Firebase (Auth, Firestore, Storage), Node.js

AI: OpenAI API / DeepSeek API, with cloud function wrappers

Visuals: Lottie, MidJourney/Leonardo AI for portraits, optional 2D avatar system

Minigames: Canvas / WebGL for interactivity