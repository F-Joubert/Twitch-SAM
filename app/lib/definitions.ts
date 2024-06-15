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