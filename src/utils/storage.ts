export default {
  get: (key: string) => {
    localStorage.getItem(key);
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  clear:()=>{
    localStorage.clear()
  }
};
