import {DocumentInfo} from '../../work/organizations/list-organizations/organization-view/organizations-documents/models/document-info';

export class MyOrganizationDocumentsInfo {
  heapDocuments: DocumentInfo[];
  waitingDocuments: DocumentInfo[];
  progressDocuments: DocumentInfo[];
  joinToMeDocuments: DocumentInfo[];
  answeredDocuments: DocumentInfo[];
}
