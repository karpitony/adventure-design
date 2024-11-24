import type { App } from "firebase-admin/app";

declare global {
  var firebaseAdminApp: App | undefined;
}