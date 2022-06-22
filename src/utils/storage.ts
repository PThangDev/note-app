const storage = {
  get<T = any>(key: string): T {
    const data = JSON.parse(sessionStorage.getItem(key) ?? 'false');
    return data;
  },
  set<T>(key: string, value: T) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    return sessionStorage.removeItem(key);
  },
};
export default storage;
