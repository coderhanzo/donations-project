<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
## Things to know before getting started (ignore next/babel vscode warning)

If you open this project in vscode, all the next.js files will have a red squiggly line at the top saying something about next/babel. Just ignore this, getting rid of the squiggly has caused many problems in the past

## Djoser

Though this project uses djoser, it does NOT use the DEFAULT_AUTHENTICATION_CLASSES settings in rest_framework. Authentication classes must be set manually for each view. This includes djoser views, so they should be overridden. This is because the was original written to work with JWTSTATELESSAUTHENTICATION and using DEFAULT_AUTHENTICATION_CLASSES with permissions decorators, does not work with the default permissions. The default permissions require a user object linked to the authentication, which JWTSTATELESSAUTHENTICATION does not provide. I'm sure a custom permission handler could be made but we have deadlines to meet, plus the code is more explicit this way.

# New Update to user model.

Extending the user model wit h2 new boolean fields, which will be checked which a user
is a bsystems admin or an institution admin.

Extending serializers to include these fields.
Extending signup_view to check whether a user is a bsystems admin or institution admin.

# Current issues
1. Can't seem to figure out how to let the system diffrentiate between a bsystems admin and an institution admin.
 - Now there are 2 types of users, super user and user, super user can grant permissions to other users, and have access to all available 
   features or permissions.
- What i tried
  - Boolean fields for either bsystems admin or instituion admin
  - created a permissions decorator 
>>>>>>> 24a00056ec2aecfb27c49509f14bdd049bf1a715
