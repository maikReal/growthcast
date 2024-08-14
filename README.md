# Growthcast

Growthcast is a browser extension designed to integrate seamlessly with the Warpcast platform, enabling users to view powerful analytics, insights, and growth guides directly on Warpcast without needing to leave their favorite platform. The extension provides detailed user analytics, comparisons, and OpenRank suggestions based on wallet activity and social graphs, all from within the Warpcast interface

## Project Structure

```plaintext
├── components
│   ├── containers
│   ├── elements
│   ├── screens
│   └── sections
├── contents
├── pages
├── popup
├── styles
├── utils
```

## Frameworks Used

- **Next.js:** A React framework that provides a great developer experience with all the features needed for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more
- **Plasmo.js:** A framework for building browser extensions with a modern developer experience, enabling you to build, test, and publish extensions faster

# Installation Guide

## Requirements

- Node.js: v21.7.1+
- pnpm: 8.15.6+

## Environment Variables

| Variable Name                                  | Description                                                                                        | Example                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PLASMO_PUBLIC_ENCRYPTION_KEY`                 | A 256-bit hexadecimal string used for JWT token generation.                                        | `4ed2009caafc493d29432f16626163d8ff683de2522960e3765c3459777fce14` |
| `PLASMO_PUBLIC_DOMAIN`                         | Backend service URL that handles requests to the Node and third-party platforms.                   | `https://api.yourservice.com`                                      |
| `PLASMO_PUBLIC_MAX_CASTS_IN_THREAD`            | Maximum number of posts allowed in a thread.                                                       | `10`                                                               |
| `PLASMO_PUBLIC_ENABLE_OPENRANK_SUGGESTIONS`    | Enable or disable the OpenRank suggestion list. Possible values: `true` or `false`.                | `true`                                                             |
| `PLASMO_PUBLIC_GROWTHCAST_USER_DATA`           | Local storage variable name for storing user data after login, used in all further requests.       | `growthcast_user_data`                                             |
| `PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_DATA`       | Local storage variable prefix for storing overall and comparison user's analytics.                 | `userAnalytics`                                                    |
| `PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_FETCH_DATE` | Local storage variable prefix for storing the date when analytics data was last fetched.           | `lastFetchAnalyticsDate`                                           |
| `PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_FETCH_DATE`  | Local storage variable prefix for storing the date when OpenRank data was last fetched.            | `openrankSuggestionsTimestamp`                                     |
| `PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_DATA`        | Local storage variable for storing OpenRank suggestions based on wallet activity and social graph. | `openrankSuggestions`                                              |
| `PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_SHOWN_DATA`  | Local storage variable for storing the list of already shown OpenRank suggestions.                 | `shownOpenrankSuggestions`                                         |
| `PLASMO_PUBLIC_LOCAL_VAR_CHANNELS_LIST`        | Local storage variable for storing the list of user's channels.                                    | `channels`                                                         |
| `PLASMO_PUBLIC_LOCAL_VAR_CHANNELS_FETCH_DATE`  | Local storage variable for storing the date when the channels data was fetched.                    | `channelsLastFetchTime`                                            |

## Launching the extension

Local launch:

1. Install Dependencies:

   ```bash
   pnpm install
   ```

2. Launch the extension locally:

   ```bash
   pnpm install
   ```

   This will create the `./build` folder in the root of the project. Use the `"chrome-mv3-dev"` folder for local testing

3. Load the Extension in Chrome:

   - Go to [chrome://extensions](chrome://extensions "chrome://extensions")
   - Click on **"Load unpacked"** and select the chrome-mv3-dev folder

4. The extension is now installed and ready to use

## Important notes

1. To use the extension, you must also run the backend service available in the following repository: [Link to Backend Repository]
2. For local backend use, set the **PLASMO_PUBLIC_DOMAIN** variable to http://localhost:3000

# License

This project is licensed under the Creative Commons Non-Commercial (CC BY-NC 4.0) license. This allows you to use the product for personal and non-commercial purposes. Commercial use is allowed only under a revenue-sharing agreement
