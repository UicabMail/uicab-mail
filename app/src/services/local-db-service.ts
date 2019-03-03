import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const DB_NAME = "uicab-mail";

export class LocalDBService {
  private db = low(new LocalStorage(DB_NAME));

  get<T>(key: string): T | undefined {
    return this.db.get(key).value();
  }

  set<T>(key: string, value: T): void {
    this.db.set(key, value).write();
  }

  unset(key: string): void {
    this.db.unset(key).write();
  }
}
