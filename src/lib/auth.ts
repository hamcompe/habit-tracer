interface UserObject {
  uid: string
  displayName: string
  photoURL: string
  email: string
  emailVerified: boolean
  phoneNumber: null
  isAnonymous: boolean
  tenantId: null
  providerData: {
    uid: string
    displayName: string
    photoURL: string
    email: string
    phoneNumber: null
    providerId: string
  }[]
  apiKey: string
  appName: string
  authDomain: string
  stsTokenManager: {
    apiKey: string
    refreshToken: string
    accessToken: string
    expirationTime: number
  }
  redirectEventId: number
  lastLoginAt: string
  createdAt: string
}

export const isBrowser = (): boolean => typeof window !== "undefined"

export const getUser = (): UserObject => {
  return isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}
}

export const setUser = (user: UserObject): void =>
  isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))

export const isLoggedIn = (): boolean => {
  const user = getUser()
  return !!user.email
}

export const logout = (firebase): Promise<void> => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({} as UserObject)
        resolve()
      })
  })
}
