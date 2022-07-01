const storage = {
  get<T = any>(key: string): T {
    const data = JSON.parse(localStorage.getItem(key) ?? 'false');
    return data;
  },
  set<T = any>(key: string, value: T) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    return localStorage.removeItem(key);
  },
};
export default storage;
