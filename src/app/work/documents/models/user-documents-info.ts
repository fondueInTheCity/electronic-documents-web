import {DocumentInfo} from '../../organizations/list-organizations/organization-view/organizations-documents/models/document-info';

export class UserDocumentsInfo {
  heapDocuments: DocumentInfo[];
  waitingDocuments: DocumentInfo[];
  progressDocuments: DocumentInfo[];
  answeredDocuments: DocumentInfo[];
  joinToMeDocuments: DocumentInfo[];
}
