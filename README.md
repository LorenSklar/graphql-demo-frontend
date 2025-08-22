# GraphQL Learning Platform Frontend - MVP

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A SvelteKit frontend for a GraphQL learning platform MVP. This thin slice demonstrates the core learning loop: concept → exercise → hints → solution.

## MVP Scope

**What We're Building First:**
- Single lesson with one concept and one exercise
- Basic hint progression (question → incomplete syntax → complete syntax)
- Simple GraphQL query execution and validation
- Basic success/error feedback

**What We're NOT Building Yet:**
- Multiple lessons or concepts
- Adaptive difficulty scoring
- Complex hint systems
- User accounts or progress tracking

## Architecture

- **Frontend**: SvelteKit + Vite
- **Backend**: Flask/GraphQL API (separate project)
- **Purpose**: MVP to validate the core learning experience

## Backend API Endpoints

### `/content` (GraphQL)
- **Purpose**: Fetch lesson content and exercise data
- **Method**: POST
- **Data**: GraphQL queries for lesson structure
- **Response**: Concept, exercise, and hint data

### `/sandbox` (GraphQL)
- **Purpose**: Execute user GraphQL queries
- **Method**: POST
- **Data**: GraphQL queries for practice
- **Response**: Query results or validation errors

### `/log` (REST)
- **Purpose**: Log user interactions for future analytics
- **Method**: POST
- **Data**: User queries, responses, success/failure
- **Response**: Confirmation of logging

## MVP Features

### Lesson Display
- **Concept Inquiry**: Show the main question/challenge
- **Exercise**: Display the specific GraphQL task
- **Resources**: Basic links to help materials

### Exercise Interface
- **Query Editor**: Textarea for writing GraphQL queries
- **Execute Button**: Send queries to backend
- **Response Display**: Show results or errors
- **Basic Validation**: Simple pattern matching feedback

### Hint System (Simple)
- **Question Hint**: Clarifying question about the task
- **Syntax Hint**: Incomplete GraphQL structure
- **Solution Hint**: Complete working example

## Development Setup

```bash
# Create new SvelteKit project
npm create svelte@latest graphql-frontend
cd graphql-frontend

# Install dependencies
npm install

# Install additional packages
npm install graphql

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
graphql-frontend/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── LessonDisplay.svelte     # Concept and exercise display
│   │   │   ├── QueryEditor.svelte       # GraphQL query input
│   │   │   ├── ResponseDisplay.svelte   # Results and errors
│   │   │   ├── HintSystem.svelte        # Progressive hints
│   │   │   └── Navigation.svelte        # Basic lesson flow
│   │   ├── services/
│   │   │   ├── graphqlClient.js         # API communication
│   │   │   └── logger.js                # Logging service
│   │   └── stores/
│   │       └── lessonStore.js           # Lesson state management
│   ├── routes/
│   │   └── +page.svelte                 # Main lesson page
│   └── app.html                         # HTML template
├── static/                              # Static assets
├── package.json                         # Dependencies
└── svelte.config.js                     # SvelteKit configuration
```

## Implementation Details

### GraphQL Client Service
```javascript
// src/lib/services/graphqlClient.js
export async function executeQuery(endpoint, query, variables = {}) {
    const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables })
    });
    
    return await response.json();
}
```

### Lesson Store
```javascript
// src/lib/stores/lessonStore.js
import { writable } from 'svelte/store';

export const lessonStore = writable({
    concept: null,
    exercise: null,
    currentHint: 0,
    hints: [],
    completed: false
});
```

### Main Page Layout
- **Header**: Lesson title and concept inquiry
- **Exercise Display**: Clear task description
- **Query Editor**: Input area for GraphQL queries
- **Execute Button**: Run the query
- **Response Area**: Show results or errors
- **Hint System**: Progressive help (click to reveal)
- **Navigation**: Basic next/previous controls

## Test Data (MVP)

### Sample Concept
```json
{
  "concept_id": "basic-queries",
  "concept_inquiry": "How do we ask GraphQL for specific data?",
  "concept_objective": "Write basic GraphQL queries to fetch data",
  "exercise_ids": ["first-query"]
}
```

### Sample Exercise
```json
{
  "exercise_id": "first-query",
  "inquiry": "Write a query to get the 'ping' field from the server",
  "hints": [
    {"text": "What field are you trying to query?", "type": "GENERAL_HINT"},
    {"text": "{ }", "type": "STARTER_CODE"},
    {"text": "{ ping }", "type": "STARTER_CODE"}
  ],
  "solution": ["{ ping }"],
  "minimalAnswerPattern": "\\{\\s*ping\\s*\\}"
}
```

## Environment Configuration

### Development
- Backend URL: `http://localhost:8000`
- Frontend: `http://localhost:5173`

### Production
- Backend URL: Your Render deployment URL
- Frontend: Your Vercel deployment URL

## Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables for production backend URL
vercel env add BACKEND_URL
```

### Environment Variables
- `BACKEND_URL`: Your backend API URL (Render deployment)

## Testing Strategy

### MVP Testing
1. **Start Backend**: Run Flask app on port 8000
2. **Start Frontend**: Run SvelteKit dev server
3. **Load Lesson**: Verify concept and exercise display
4. **Test Hints**: Click through hint progression
5. **Execute Query**: Write and run GraphQL query
6. **Validate Response**: Check success/error handling

### Test Cases
- [ ] Lesson content loads correctly
- [ ] Hint system progresses properly
- [ ] Query execution works
- [ ] Basic validation feedback
- [ ] Error handling for malformed queries
- [ ] Logging functionality

## Future Enhancements

### Phase 2 (Next Sprint)
- Multiple exercises per lesson
- Better query validation and error messages
- Query templates and examples
- Basic progress tracking

### Phase 3 (Future)
- Multiple lessons and concepts
- Adaptive difficulty scoring
- Advanced hint systems
- User accounts and progress
- Learning path recommendations

### Phase 4 (Vision)
- Full adaptive learning system
- Complex GraphQL concepts
- Community features
- Analytics and insights

## Troubleshooting

## Contributing

This MVP focuses on:
- Clean, simple lesson interface
- Reliable GraphQL query execution
- Basic hint progression system
- Good error handling and user feedback

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

This means you are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit and indicate if changes were made
- **NonCommercial** — You may not use the material for commercial purposes

For full license details, see the [LICENSE](LICENSE) file.
