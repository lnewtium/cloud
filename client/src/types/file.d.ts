export type IFileResponse = {
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

export interface IFolderResponse extends IFileResponse {
  type: "Folder";
}

export type IFile = IFileResponse & { progress: number };
export type IFolder = IFolderResponse & { progress: number };
