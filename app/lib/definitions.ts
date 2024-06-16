// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type Credentials = {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
    botUsername: string;
};

export type Voice = {
    id: string;
    name: string;
    pitch: number;
    speed: number;
    mouth: number;
    throat: number;
}

export type VoiceForm = {
    name: string;
    pitch: number;
    speed: number;
    mouth: number;
    throat: number;
}

export type AccessToken = {
    accessToken: string; //   The access token which is necessary for every request to the Twitch API.
    expiresIn: number | null; //   The time, in seconds from the obtainment date, when the access token expires.
    obtainmentTimeStamp: number; //   The date when the token was obtained, in epoch milliseconds.
    refreshToken: string | null; //   The refresh token which is necessary to refresh the access token once it expires.
    scrope: string[]; //   The scope the access token is valid for, i.e. what the token enables you to do.
  }