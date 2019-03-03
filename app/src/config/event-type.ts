class EventType {
  readonly INITIALIZATION = "-1";
  readonly REGISTER = "4396";
  readonly LOGIN = "10910";
  readonly LOGIN_OUT = "10911";
  readonly USERS = "7234";
  readonly SEND = "2373";
  readonly RECEIVED = "9511";
  readonly MAILS = "9105";
  readonly MESSAGING = "9709";

  readonly ADD_USER = "1337234";
  readonly UPDATE_USER = "7072324";

  readonly ERROR_MESSAGE = "3449401";
  readonly ERROR_NOTIFICATION = "3449402";
}

export const eventType = new EventType();
