import { validateFile } from "./fileUpload";

export function handleFileSelect(event, fileRef, errorRef) {
  const file = event.target.files[0];
  if (file) {
    validateAndSetFile(file, fileRef, errorRef);
  }
}

export function handleFileDrop(event, dragOverRef, fileRef, errorRef) {
  dragOverRef.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    validateAndSetFile(file, fileRef, errorRef);
  }
}

export function validateAndSetFile(file, fileRef, errorRef) {
    console.log("fileRef:", fileRef, "errorRef:", errorRef);
  const validation = validateFile(file);
  if (!validation.isValid) {
    errorRef.value = validation.error;
    return;
  }
  fileRef.value = file;
  errorRef.value = "";
}

export function removeFile(fileRef) {
  fileRef.value = null;
}
