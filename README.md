# Cooking with Clerk

Cooking with Clerk is an AI-powered recipe generator/manager that is used to show the various ways Clerk can be used in a real-world environment.

It's also designed to be easily deployed by anyone with a few simple steps.

## Stack

This app is built with the following components:

- [Clerk](https://clerk.com/)
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- [Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)
- [Neon (coming soon)](https://neon.tech/)
- [PostHog](https://posthog.com/)

## Run the app locally

To run this app locally, you'll need the following:

- Node installed locally
- A free Clerk account
- An OpenAI API key

### 1. Clone the repository

Start by cloning the repository to your local computer:

```
git clone https://github.com/bmorrisondev/cooking-with-clerk.git
```

If you are following a guide that relates to this repository, make sure to check out the suggested branch from the article if one is specified. Next, run the following command to install the dependencies:

```
npm install
```

### 2. Creating a Clerk application

> If you do not have a Clerk account, you can [create one for free](https://dashboard.clerk.com/sign-up).

In the Clerk dashboard, create a new application and configure your preferred login methods as directed in the docs. Once you've created the application, create a `.env.local` file at the root of the repository and paste in the environment variables shown in the onboarding guide. The two environment variables are:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Create another environment variable named `CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` and set the value to `/app`.

If you want to use an existing Clerk application, these details can be found in the API Keys section of the left nav.

### 3. Create an OpenAI API Key

To create an OpenAI API Key, go to [platform.openai.com](https://platform.openai.com) and sign up or sign in.

Once signed in, locate the **"Projects"** section from the left nav. Create a new project and name it "Cooking with Clerk" or any other desired name.

After the project is created, select **"API **keys"** from the left nav, then **"Create new secret key"**. Give the key a name and click Create secret key.

In the `.env.local` file you created earlier, create a new environment variable and set the value to the secret key:

- `OPENAI_API_KEY`

### 4. Run the project

Your `.env.local` file should look similar to the following:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app
OPENAI_API_KEY=sk-proj-...
```

Provided everything is set properly, you can run the following command from your terminal to start the application:

```bash
npm run dev
```

This will start the app. The default access URL is `http://localhost:3000`, however, the app may use a different port if 3000 is in use, so check the terminal output for the correct version.

## Contributing

Contributions are always welcome! To contribute to this project, fork it into your own GitHub account or organization, make the necessary changes, and create a pull request into this repository.

If I do not respond in a timely manner, feel free to ping or DM me on X: [@brianmmdev](https://x.com/brianmmdev)

## Feedback

If you have any feedback, please reach out to me on X: [@brianmmdev](https://x.com/brianmmdev)

To report issues or suggest improvements, feel free to create an issue.