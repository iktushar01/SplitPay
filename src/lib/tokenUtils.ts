import { setCookie } from "./cookieUtils";

/**
 * Utility functions for handling JWT tokens
 */

type JwtPayload = {
  exp?: number;
  [key: string]: unknown;
};

/**
 * Decodes a JWT token and returns the payload
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf8")
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export async function setTokenInCookies(
  name: string,
  token: string,
  fallbackMaxAgeInSeconds = 60 * 60 * 24
) {
  const maxAgeInSeconds =
    name === "better-auth.session_token"
      ? fallbackMaxAgeInSeconds
      : getTokenExpirationTime(token) ?? fallbackMaxAgeInSeconds;

  await setCookie(name, token, maxAgeInSeconds);
}

/**
 * Checks if a JWT token is expiring soon (within 5 minutes)
 */
export function isTokenExpiringSoon(token: string, thresholdSeconds: number = 300): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true; // Treat as expiring if we can't decode
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - now;

    return expiresIn < thresholdSeconds;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Treat as expiring on error
  }
}

/**
 * Gets the remaining time in seconds until a token expires
 */
export function getTokenExpirationTime(token: string): number | null {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, decoded.exp - now);
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return null;
  }
}

/**
 * Checks if a token is already expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
}
