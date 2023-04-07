export const IsLoginSelector = (state) => state.Auth.isLoggedIn

export const MessageSelector = (state) => state.messages

export const UserSelector = (state)=> state.Auth.user

export const TokenSelector = (state)=> state.Auth.access_token
