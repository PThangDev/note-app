const storage = {
  get<T = any>(key: string): T | any {
    try {
      const data = JSON.parse(localStorage.getItem(key) ?? 'false');
      return data;
    } catch (error) {
      storage.remove(key);
    }
  },
  set<T = any>(key: string, value: T) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    return localStorage.removeItem(key);
  },
};
export default storage;
