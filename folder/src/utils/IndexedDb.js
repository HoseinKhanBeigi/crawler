class IndexedDb {
  constructor(dbName, dbVersion, onUpgrade) {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject(new Error('indexedDb not supported'));
      }
      const db = indexedDB.open(dbName, dbVersion);
      if (onUpgrade && typeof onUpgrade === 'function') {
        db.onupgradeneeded = ev => {
          onUpgrade(ev.target.result, ev.oldVersion, ev.newVersion);
        };
      }
      db.onsuccess = ev => {
        this.db = ev.target.result;
        resolve(this);
      };
      db.onerror = error => {
        reject(error);
      };
    });
  }

  getAll(storeName, query?) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const request = transaction.objectStore(storeName).getAll(query);
      request.onsuccess = ev => {
        resolve(ev.target.result);
      };
      request.onerror = error => {
        reject(error);
      };
    });
  }

  search(storeName) {
    return filterCallback =>
      new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, 'readonly');
        const request = transaction.objectStore(storeName).openCursor();
        const filteredItems = [];
        request.onsuccess = ev => {
          const cursor = ev.target.result;
          if (cursor) {
            const item = cursor.value;
            if (filterCallback(item)) {
              filteredItems.push(item);
            }
            cursor.continue();
          } else {
            resolve(filteredItems);
          }
        };
        request.onerror = error => reject(error);
      });
  }

  addAll(items) {
    if (!Array.isArray(items)) {
      throw new Error('items is not Array');
    }
    return storeName =>
      new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        // eslint-disable-next-line no-plusplus
        items.forEach(item => {
          store.add(item);
        });
        transaction.oncomplete = () => {
          resolve(true);
        };
        transaction.onerror = error => {
          reject(error);
        };
      });
  }
}

export default IndexedDb;
