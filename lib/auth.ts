import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/bazar-dor";
const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID || "") as string,
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET_ID || "") as string,
    },
    github: {
      clientId: (process.env.GITHUB_CLIENT_ID || "") as string,
      clientSecret: (process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET_ID || "") as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
