# 🚀 Smart Task Manager with AI Assistance

A modern task management application built with **Next.js 15** and **TypeScript**, featuring AI-powered task suggestions using Google Gemini API.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

## ✨ Features

- **📋 Task Management**: Create, edit, delete, and toggle task status
- **🤖 AI Integration**: Generate subtasks using Google Gemini API
- **🔍 Smart Filtering**: Filter tasks by status (All, Pending, Completed)
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **⚡ Real-time Updates**: Dynamic task counts and status changes
- **🎨 Modern UI**: Clean interface with Tailwind CSS styling
- **🔒 Type Safety**: Full TypeScript integration
- **📝 Form Validation**: Client-side validation with error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API
- **State Management**: React useState
- **Form Handling**: Custom form validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asheque33/passlimits_technical_test.git
   cd passlimits_technical_test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## 🎯 Usage

### Task Management
- **Create**: Click "Add New Task" to create a new task
- **Edit**: Click the edit button on any task card
- **Delete**: Click the delete button to remove a task
- **Toggle Status**: Mark tasks as complete or pending

### AI Features
- **Suggest Subtasks**: Click "🤖 Suggest Subtasks" on any task
- **View Suggestions**: AI-generated subtasks appear below the task
- **Smart Context**: AI uses both task title and description for better suggestions

### Filtering
- **All Tasks**: View all tasks
- **Pending**: View only incomplete tasks  
- **Completed**: View only finished tasks
- **Real-time Counts**: Filter buttons show task counts

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── gemini/
│   │       └── route.js          # Gemini API integration
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.jsx        # App header
│   │   ├── Tasks/
│   │   │   ├── TaskBoard.jsx     # Main task container
│   │   │   ├── TaskList.jsx      # Task list display
│   │   │   ├── TaskCard.jsx      # Individual task card
│   │   │   ├── TaskModal.jsx     # Task creation/editing modal
│   │   │   └── TaskActions.jsx   # Filter and add buttons
│   │   └── ui/
│   │       └── Button.jsx        # Reusable button component
│   ├── data/
│   │   └── tasks.js              # Sample task data
│   ├── utils/
│   │   └── nextId.js             # ID generation utility
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── .env.example                  # Environment variables template
├── .env                          # Your environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🔧 API Integration

### Gemini API Route
```typescript
POST /api/gemini
```

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description"
}
```

**Response:**
```json
{
  "success": true,
  "subtasks": [
    "First subtask",
    "Second subtask",
    "Third subtask"
  ]
}
```

### Error Handling
- **429**: Daily quota exceeded
- **401**: Invalid API key
- **500**: Server error
- **Network**: Connection issues

## 🎨 Key Features Demo

### Smart Task Suggestions
The AI analyzes your task title and description to generate relevant subtasks:

- **Input**: "Plan birthday party" + "Organize surprise party for my sister"
- **Output**: Contextual subtasks like "Book venue", "Send invitations", "Order cake"

### Responsive Design
- **Desktop**: Full-featured interface with optimal spacing
- **Mobile**: Compact design with touch-friendly controls
- **Tablet**: Adaptive layout for medium screens

### Real-time Updates
- Task counts update automatically
- Filter states persist during navigation
- Form validation provides immediate feedback

## 🚧 Technical Challenges & Solutions

### Challenge 1: AI Integration
- **Issue**: Handling API rate limits and errors
- **Solution**: Comprehensive error handling with user-friendly messages

### Challenge 2: State Management
- **Issue**: Managing complex task states and filters
- **Solution**: Clean state architecture with proper data flow

### Challenge 3: Form Validation
- **Issue**: Ensuring data integrity
- **Solution**: Client-side validation with TypeScript type safety

## 📝 Environment Variables

```env
# Google Gemini API
GEMINI_API_KEY=send_to_your_email

```


## 📄 License

This project is created for technical assessment purposes.
---

**Built with ❤️ for PassLimits Technical Assessment**

For any questions or feedback, please reach out!
