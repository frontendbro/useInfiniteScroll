export type TypeUser = {
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  }
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  }
  id: {
    name: string;
    value: string;
  }
}