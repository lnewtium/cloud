export type IFile = {
  id: number;
  name: string;
  type: string;
  accessLink: string | null;
  size: number;
  path: string;
  date: string;
  parentId: number | null;
  userId: number;
};

export interface IFolder extends IFile {
  type: "Folder";
}
