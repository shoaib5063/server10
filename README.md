# Car Rental Platform - Backend API

A robust RESTful API for the car rental platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API**: Clean and organized API endpoints
- **MongoDB Integration**: Efficient data storage with Mongoose
- **Firebase Authentication**: Secure user authentication
- **CRUD Operations**: Complete car and booking management
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Input validation for all endpoints
- **CORS Enabled**: Cross-origin resource sharing configured

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Firebase Admin SDK** - Authentication verification
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB Atlas account or local MongoDB instance
- Firebase project with Admin SDK credentials

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-server-repo-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
server/
├── controllers/         # Request handlers
│   ├── carController.js
│   └── bookingController.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── models/              # Mongoose models
│   ├── Car.js
│   └── Booking.js
├── routes/              # API routes
│   ├── carRoutes.js
│   └── bookingRoutes.js
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── seed.js              # Database seeding script
├── server.js            # Entry point
└── README.md
```

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase private key (from service account JSON)
- `FIREBASE_CLIENT_EMAIL` - Firebase client email (from service account JSON)

### Getting Firebase Credentials

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download the JSON file
4. Extract the following values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

## 📡 API Endpoints

### Cars

#### Get All Cars
```http
GET /api/cars
```
Returns all car listings from all providers.

#### Get Car by ID
```http
GET /api/cars/:id
```
Returns detailed information for a specific car.

#### Get Cars by Provider
```http
GET /api/cars/provider/:email
```
Returns all cars listed by a specific provider.

**Headers:**
- `Authorization: Bearer <firebase_token>`

#### Create Car
```http
POST /api/cars
```
Creates a new car listing.

**Headers:**
- `Authorization: Bearer <firebase_token>`

**Body:**
```json
{
  "carName": "Tesla Model 3",
  "description": "Electric sedan with autopilot",
  "category": "Electric",
  "rentPrice": 150,
  "location": "Dhaka, Bangladesh",
  "imageUrl": "https://example.com/image.jpg",
  "providerName": "John Doe",
  "providerEmail": "john@example.com"
}
```

#### Update Car
```http
PUT /api/cars/:id
```
Updates an existing car listing.

**Headers:**
- `Authorization: Bearer <firebase_token>`

**Body:** Same as Create Car

#### Delete Car
```http
DELETE /api/cars/:id
```
Deletes a car listing.

**Headers:**
- `Authorization: Bearer <firebase_token>`

### Bookings

#### Get User Bookings
```http
GET /api/bookings/user/:email
```
Returns all bookings made by a specific user.

**Headers:**
- `Authorization: Bearer <firebase_token>`

#### Create Booking
```http
POST /api/bookings
```
Creates a new booking and updates car availability.

**Headers:**
- `Authorization: Bearer <firebase_token>`

**Body:**
```json
{
  "carId": "car_id_here",
  "carName": "Tesla Model 3",
  "carImage": "https://example.com/image.jpg",
  "rentPrice": 150,
  "providerEmail": "provider@example.com",
  "renterName": "Jane Doe",
  "renterEmail": "jane@example.com"
}
```

## 🗄️ Database Models

### Car Model
```javascript
{
  carName: String (required),
  description: String (required),
  category: String (required),
  rentPrice: Number (required),
  location: String (required),
  imageUrl: String (required),
  availability: String (default: 'Available'),
  providerName: String (required),
  providerEmail: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  carId: ObjectId (required),
  carName: String (required),
  carImage: String (required),
  rentPrice: Number (required),
  providerEmail: String (required),
  renterName: String (required),
  renterEmail: String (required),
  bookingDate: Date (default: now),
  status: String (default: 'Confirmed'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Authentication

The API uses Firebase Authentication for securing endpoints. Protected routes require a valid Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

The middleware verifies the token and attaches the user information to the request object.

## 🌱 Database Seeding

To populate the database with sample data:

```bash
npm run seed
```

This will create 20 sample car listings with Bangladesh-specific data.

## 🧪 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🛡️ Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource conflict (e.g., car already booked)
- **500 Internal Server Error** - Server-side errors

Error Response Format:
```json
{
  "error": "Error message here"
}
```

## 🔧 Middleware

### Authentication Middleware (`auth.js`)
Verifies Firebase ID tokens and protects routes.

### Error Handler Middleware (`errorHandler.js`)
Catches and formats all errors consistently.

### Validation Middleware (`validation.js`)
Validates request data before processing.

## 🚀 Deployment

### Environment Setup
1. Set all environment variables in your hosting platform
2. Ensure MongoDB Atlas is accessible from your hosting IP
3. Configure CORS for your frontend domain

### Recommended Platforms
- **Heroku** - Easy deployment with Git
- **Railway** - Modern platform with automatic deployments
- **Render** - Free tier available
- **DigitalOcean** - App Platform
- **AWS** - Elastic Beanstalk or EC2

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong MongoDB credentials
- [ ] Enable MongoDB IP whitelist
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting
- [ ] Use HTTPS
- [ ] Set up backup strategy

## 🔗 Frontend Repository

This backend API is designed to work with the car rental frontend. See the client repository for setup instructions.

Frontend should connect to: `http://localhost:5000/api` (development)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

### Firebase Authentication Errors
- Verify Firebase credentials in `.env`
- Check service account permissions
- Ensure private key is properly formatted (with \n for newlines)

### CORS Errors
- Add frontend URL to CORS configuration in `server.js`
- Check if credentials are included in requests

## 📊 Performance Tips

- Use MongoDB indexes for frequently queried fields
- Implement caching for read-heavy operations
- Use connection pooling for MongoDB
- Enable compression middleware
- Implement rate limiting for API endpoints

## 🔐 Security Best Practices

- Never commit `.env` file
- Use environment variables for all secrets
- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated
- Implement request size limits
- Use security headers (helmet.js)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the powerful database
- Firebase team for authentication services
- All open-source contributors
