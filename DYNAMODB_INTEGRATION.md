# DynamoDB Integration for Template Roulette

This application now includes DynamoDB integration to track game plays and store prize claim form submissions.

## Features Added

### 1. Game Play Tracking
- Every game spin is recorded with:
  - Game ID (unique identifier)
  - Result (win/lose)
  - Timestamp
  - Session ID
  - Player IP address
  - User Agent

### 2. Prize Claim Form Storage
- Winner form submissions are saved with:
  - Submission ID
  - Associated Game ID
  - Child's first and last name
  - Parent's email address
  - Timestamp
  - Session ID

## Database Schema

### Game Data Table (`template-roulette-dev-game-data`)
Uses single table design with the following structure:

**Game Plays:**
- PK: `GAME#{gameId}`
- SK: `RESULT#{timestamp}`
- GSI1PK: `RESULT#{win|lose}`
- GSI1SK: `{timestamp}`

**Prize Claims:**
- PK: `SUBMISSION#{submissionId}`
- SK: `CLAIM#{timestamp}`
- GSI1PK: `GAME#{gameId}`
- GSI1SK: `{timestamp}`

### Game Sessions Table (`template-roulette-dev-game-sessions`)
- session_id: `{submissionId}` (Primary Key)
- user_id: `{parentEmail}`
- created_at: `{timestamp}`

## API Endpoints

### POST /api/game/play
Records a game play result.

**Request Body:**
```json
{
  "result": "win" | "lose",
  "sessionId": "uuid-string"
}
```

### POST /api/prize-claim
Saves a prize claim form submission.

**Request Body:**
```json
{
  "gameId": "uuid-string",
  "childFirstName": "string",
  "childLastName": "string", 
  "parentEmail": "email-string",
  "sessionId": "uuid-string"
}
```

### GET /api/admin/stats
Gets game statistics (requires authorization).

**Headers:**
```
Authorization: Bearer admin-secret-key
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "totalGames": 100,
    "wins": 30,
    "losses": 70,
    "winRate": 30.0
  }
}
```

## Environment Variables

Required environment variables (set in `.env.local`):

```env
AWS_REGION=eu-central-1
DYNAMODB_GAME_DATA_TABLE=template-roulette-dev-game-data
DYNAMODB_GAME_SESSIONS_TABLE=template-roulette-dev-game-sessions
```

## AWS Configuration

The application uses AWS SDK v3 for DynamoDB operations. In production on AWS Amplify, credentials are handled automatically through IAM roles. For local development, you may need to configure AWS credentials.

## Data Retention

Both tables use TTL (Time To Live) configuration:
- Game plays: 90 days retention
- Prize claims: 1 year retention

## Error Handling

- All DynamoDB operations include proper error handling
- Failed operations are logged to console
- User-friendly error messages are displayed in the UI
- Network failures are gracefully handled

## Usage

1. **Game Play**: When a user spins the roulette, the result is automatically saved to DynamoDB
2. **Prize Claims**: When a winner fills out the form, the data is saved with reference to the winning game
3. **Statistics**: Admin can view game statistics via the stats API endpoint

## Security Considerations

- All user inputs are validated
- Email addresses are normalized (trimmed and lowercased)
- Basic rate limiting is handled by Next.js/Vercel
- Admin endpoints require authentication
- No sensitive data is exposed in error messages