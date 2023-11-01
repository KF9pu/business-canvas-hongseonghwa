export interface I_Response {
  ok: boolean;
  data?: any;
  error?: any;
}
export interface I_OnlyChildProps {
  children: React.ReactNode;
}
export interface I_NoneProps {}

export enum E_CardsType {
  URL,
  IMAGE,
  NONE,
}

export enum E_IconType {
  EDIT,
  TRASH,
}

export interface I_card {
  key: number | undefined;
  url: string;
  name?: string;
  date: number | string;
  type: E_CardsType;
}
