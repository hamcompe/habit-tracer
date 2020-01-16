const isBrowser = () => typeof window !== "undefined"
const safetyGet = (key, initialValue = {}) => () =>
  isBrowser() && window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : initialValue
export const safetySet = key => data =>
  isBrowser() && window.localStorage.setItem(key, JSON.stringify(data))

export const getHabits = safetyGet("habits", [])
export const setHabits = safetySet("habits")
