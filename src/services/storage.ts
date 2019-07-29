type JSON = {
  [key: string]: any
};

interface StorageEvent {
  key: string;
  newValue: any;
  oldValue: any;
  url: string;
  uri: string;
}

class Storage {
  private _storage: any;
  private _listeners: JSON;
  private _listening: boolean;
  private _prevKey: string;
  private _prevValue: string;

  constructor (implementation: any) {
    this._storage = implementation;
    this._listeners = {};
    this._listening = false;
    this._prevKey = '';
    this._prevValue = '';
  }

  set (key: string, value: any): void {
    this._storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const result = this._storage.getItem(key);
    if (result === 'undefined') return null;
    return JSON.parse(result);
  }

  remove(key: string): void {
    this._storage.removeItem(key);
  }

  clear(): void {
    this._storage.clear();
  }

  contains(key: string): boolean {
    return !!this._storage.getItem(key);
  }

  watch(key: string, fn: Function): void {
    if (this._listeners[key]) {
      this._listeners[key].push(fn);
    } else {
      this._listeners[key] = [fn];
    }
    if (!this._listening) {
      this._listen();
    }
  }

  unwatch(key: string, fn: Function): void {
    const listener = this._listeners[key];
    if (listener.length > 1) {
      listener.splice(listener.indexOf(fn), 1);
    } else {
      this._listeners[key] = [];
    }
  }

  private _listen (): void {
    window.addEventListener('storage', this._change.bind(this));
  }

  // private
  private _change (event: StorageEvent): void {
    const all = this._listeners[event.key];
    if (all) all.forEach((listener: Function) => this._fire(listener, event));
  }

  // private
  private _fire (listener: Function, event: StorageEvent): void {
    const {
      key, newValue, oldValue, url, uri
    } = event;
    const isPrevKey = this._prevKey === key;
    const isPrevValue = this._prevValue === newValue;

    if (isPrevKey && isPrevValue) return;
    if (newValue != oldValue) {
      listener(
        JSON.parse(newValue),
        JSON.parse(oldValue),
        url || uri
      );
    }

    this._prevKey = key;
    this._prevValue = newValue;
  }
}

const StorageService = new Storage(localStorage);
const SessionStorage = new Storage(sessionStorage);

export {
  StorageService,
  SessionStorage,
};

export default StorageService;
