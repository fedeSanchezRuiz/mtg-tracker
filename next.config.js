const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'FedeTester',
        mongodb_password: 'Y88sfl52aqWbWeQT',
        mongodb_cluster: 'cluster0',
        mongodb_database: 'DEV-Tracker',
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'FedeTester',
      mongodb_password: 'Y88sfl52aqWbWeQT',
      mongodb_cluster: 'cluster0',
      mongodb_database: 'MTG-Tracker',
    },
  };
};

module.exports = nextConfig;
