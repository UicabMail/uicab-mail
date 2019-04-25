export class EventType {
  readonly INITIALIZATION = "-1";

  readonly REGISTER = "4396";
  readonly LOGIN = "10910";
  readonly LOGIN_OUT = "10911";
  readonly USERS = "7234";
  readonly SEND = "2373";
  readonly RECEIVED = "9511";
  readonly MAILS = "9105";
  readonly MESSAGING = "9709";

  readonly GET_USER = "6457234";
  readonly ADD_USER = "1337234";
  readonly REMOVE_USER = "1337234";
  readonly UPDATE_USER = "7072324";
  readonly SEARCH_USER = "33247234";

  readonly ERROR_MESSAGE = "3449401";
  readonly ERROR_NOTIFICATION = "3449402";

  readonly GET_DEPT = "6453305";
  readonly ADD_DEPT = "1333305";
  readonly REMOVE_DEPT = "4893305";
  readonly UPDATE_DEPT = "70353305";
}

export const eventType = new EventType();
