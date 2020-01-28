const isBrowser = (): boolean => typeof window !== "undefined"
const safetyGet = (key: string, initialValue: any = {}): Function => (): void =>
  isBrowser() && window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : initialValue
export const safetySet = (key: string) => (data: any) =>
  isBrowser() && window.localStorage.setItem(key, JSON.stringify(data))

export const getHabits = safetyGet("habits", [])
export const setHabits = safetySet("habits")
