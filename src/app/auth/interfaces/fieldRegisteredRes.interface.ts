export interface FieldRegisteredRes {
  field: UniqueFields;
  alreadyRegistered: boolean;
}

interface UniqueFields {
  id?: string;
  username?: string;
  email?: string;
}
