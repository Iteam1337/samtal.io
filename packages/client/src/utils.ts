export enum StorageKeys {
  ChatMember = "chatMember",
}

interface ChatMember {
  name: string
  id: string
}

export const setStorage = (
  key: StorageKeys,
  value: ChatMember
): void | boolean => {
  try {
    const serializedEntry = JSON.stringify(value)
    window.localStorage.setItem(key, serializedEntry)
  } catch (err) {
    return false
  }
}

export const getStorage = (key: StorageKeys): ChatMember | undefined => {
  try {
    const serializedEntry = window.localStorage.getItem(key)

    if (serializedEntry === null) {
      return undefined
    }

    return JSON.parse(serializedEntry)
  } catch (err) {
    return undefined
  }
}

export const unsetStorage = (key: StorageKeys): void =>
  window.localStorage.removeItem(key)

export default {
  getStorage,
  setStorage,
  unsetStorage,
}
