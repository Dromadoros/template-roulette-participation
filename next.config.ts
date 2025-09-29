import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AWS_REGION: process.env.AWS_REGION,
    DYNAMODB_GAME_DATA_TABLE: process.env.DYNAMODB_GAME_DATA_TABLE,
    DYNAMODB_GAME_SESSIONS_TABLE: process.env.DYNAMODB_GAME_SESSIONS_TABLE,
  },
};

export default nextConfig;
