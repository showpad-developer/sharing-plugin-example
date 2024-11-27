# Basic Sharing plugin

Basic app that uses the showpad content-picker SDK + Public Shares API to generate a Showpad Share with tracking

## Setup

1. Install the dependencies:

```bash
npm install
```

2. Create a Showpad Personal Api Token [Guide](https://developer.showpad.com/docs/apis/concepts/authentication#personal-api-tokens) with the `read_user_management` & `read_contentprofile_management` scopes.

   **OR**

   create an Oauth client [Guide](https://developer.showpad.com/docs/apis/concepts/authentication#registration) with the `read_user_management` & `read_contentprofile_management` scopes and use https://localhost:8080 as redirectURI for localhost development.

   More info about scopes can be found [here](https://developer.showpad.com/docs/apis/concepts/authentication#scopes)

3. configure the right AuthProvider in `index.ts` based on the auth method you choose

## Get Started

Start the dev server:

```bash
npm start
```
