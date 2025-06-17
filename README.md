# TasteFinder

A modern React application built with Vite and powered by AWS Amplify, providing a streamlined foundation for scalable web applications with built-in authentication, API, and real-time database capabilities.

## 🚀 Overview

TasteFinder is built using the React + Vite + AWS Amplify stack, emphasizing easy setup and deployment. This application provides a robust foundation with pre-configured AWS services, making it ideal for developers looking to jumpstart their projects with enterprise-grade cloud services.

## ✨ Features

### Core Stack
- **Frontend**: React 18 with Vite for fast development and optimized builds
- **Authentication**: Secure user authentication powered by Amazon Cognito
- **API**: GraphQL endpoint with AWS AppSync for flexible data queries
- **Database**: Real-time database capabilities with Amazon DynamoDB
- **Hosting**: Seamless deployment with AWS Amplify hosting

### Key Capabilities
- **Fast Development**: Lightning-fast hot module replacement with Vite
- **Secure Authentication**: Built-in user registration, login, and session management
- **Real-time Data**: Live data synchronization across all connected clients
- **Scalable Architecture**: Auto-scaling cloud infrastructure
- **Modern React**: Latest React features and best practices
- **TypeScript Ready**: Full TypeScript support for type-safe development

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Authentication**: Amazon Cognito
- **API**: AWS AppSync (GraphQL)
- **Database**: Amazon DynamoDB
- **Hosting**: AWS Amplify
- **Package Manager**: npm/yarn

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- AWS Account (for Amplify services)
- Amplify CLI installed globally

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/srivatsa2026/TasteFinder.git
   cd TasteFinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Amplify CLI** (if not already installed)
   ```bash
   npm install -g @aws-amplify/cli
   ```

4. **Configure Amplify**
   ```bash
   amplify configure
   ```

5. **Initialize Amplify in your project**
   ```bash
   amplify init
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 🚀 Deployment

### Deploy to AWS Amplify

1. **Add hosting**
   ```bash
   amplify add hosting
   ```

2. **Publish your app**
   ```bash
   amplify publish
   ```

For detailed deployment instructions, refer to the [AWS Amplify deployment documentation](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws).

## 📁 Project Structure

```
TasteFinder/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── graphql/         # GraphQL queries and mutations
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Application entry point
├── amplify/             # Amplify configuration files
├── public/              # Static assets
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🔒 Authentication

The app comes with pre-configured authentication using Amazon Cognito:

- **User Registration**: Sign up with email verification
- **User Login**: Secure login with JWT tokens
- **Password Reset**: Built-in password recovery
- **Session Management**: Automatic token refresh
- **Protected Routes**: Route-level authentication guards

## 📡 API & Database

### GraphQL API (AWS AppSync)
- Real-time subscriptions for live data updates
- Optimistic UI updates
- Offline data synchronization
- Fine-grained access control

### Database (DynamoDB)
- NoSQL database with automatic scaling
- Real-time data synchronization
- Built-in backup and restore
- Pay-per-use pricing model

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `amplify push` - Deploy backend changes
- `amplify pull` - Sync backend changes locally

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
VITE_AWS_REGION=your-aws-region
VITE_AWS_USER_POOLS_ID=your-user-pool-id
VITE_AWS_USER_POOLS_WEB_CLIENT_ID=your-app-client-id
```

### Amplify Configuration
The Amplify configuration is automatically generated in `src/aws-exports.js` after running `amplify push`.

## 🌐 Features in Development

Based on the starter template, you can easily extend this application with:

- User profiles and preferences
- Real-time messaging
- File upload and storage
- Push notifications
- Analytics and monitoring
- Multi-environment deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct and contribution process.

## 📄 License

This project is licensed under the MIT-0 License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Srivatsa**
- GitHub: [@srivatsa2026](https://github.com/srivatsa2026)

## 🙏 Acknowledgments

- [AWS Amplify](https://aws.amazon.com/amplify/) for the powerful cloud platform
- [React](https://reactjs.org/) for the component-based UI library
- [Vite](https://vitejs.dev/) for the fast build tool
- [AWS AppSync](https://aws.amazon.com/appsync/) for the GraphQL API
- [Amazon Cognito](https://aws.amazon.com/cognito/) for authentication services

## 📞 Support

For questions and support:
- Check the [AWS Amplify Documentation](https://docs.amplify.aws/)
- Review [React Documentation](https://reactjs.org/docs)
- Visit [Vite Documentation](https://vitejs.dev/guide/)
- Open an issue in this repository

---

⭐ If you found this starter template helpful, please give it a star!