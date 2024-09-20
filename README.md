Bonz.ai Booking API

🤖 Introduction
Bonz.ai is a forward-thinking company in the hospitality industry, dedicated to enhancing customer experiences through innovative technology. We have developed a booking API using a serverless architecture on AWS. This approach allows us to focus on building and improving the application without worrying about server management. The serverless architecture also enables Bonz.ai to scale their booking system according to demand, which is ideal for handling varying traffic throughout the day or year.

⚙️ Tech Stack

* Serverless Framework
* AWS Cloud
* AWS Lambda
* API Gateway
* DynamoDB
* Node.js
* JavaScript

🔋 Features

👉 Create Room: Allows administrators to add new room types to the system.

👉 Create Booking: Enables users to book rooms, ensuring the number of guests matches the room capacity.

👉 Get Specific Booking: Retrieve details of a specific booking using its ID.

👉 Get All Bookings: Fetch a list of all bookings.

👉 Update Booking: Modify existing booking details.

👉 Delete Booking: Cancel a booking, adhering to the cancellation policy.

👉 Cancellation Policy: Bookings can be canceled up to two days before the check-in date and must be canceled in their entirety.

👉 Error Handling: Robust error handling for DynamoDB operations and invalid input.

**🌐 API Endpoints**

POST - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/rooms
POST - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/rooms
POST - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking
POST - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking
GET - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking/{id}
GET - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking
GET - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking
PUT - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking/{id}
PUT - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking/{id}
DELETE - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking/{id}
DELETE - https://nvzuoctuob.execute-api.eu-north-1.amazonaws.com/booking/{id}


🤸 Quick Start
Follow these steps to set up the project locally on your machine.

🤸 Quick Start
Follow these steps to set up the project locally on your machine.

Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- Serverless Framework
- Installation
**Cloning the Repository**

```bash
  git clone https://github.com/your-repo/bonzai-booking-api.git
  cd bonzai-booking-api
```


Install the project dependencies using npm:


```bash
npm install
Deploy the service:
serverless deploy
npm install moment
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
npm install uuid
```

**Environment Variables: Ensure you have the necessary environment variables set up for AWS credentials and any other configurations required.**

**🚀 Usage**

Once deployed, you can interact with the API using tools like Postman or cURL. The API endpoints include:

👉 POST /rooms - Create a new room type.

👉 POST /booking - Create a new booking.

👉 GET /booking/{id} - Get details of a specific booking.

👉 GET /booking - Get all bookings.

👉 PUT /booking/{id} - Update a booking.

👉 DELETE /booking/{id} - Delete a booking.
