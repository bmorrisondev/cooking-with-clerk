export {}

declare global {
  interface UserPublicMetadata {
    isBetaUser?: boolean
    isAdmin?: boolean
  }
}