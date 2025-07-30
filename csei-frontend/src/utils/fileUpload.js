export const uploadFileWithProgress = (file, onProgress, endpoint) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("engagementLetter", file);

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    });

    // Handle successful upload
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.fileUrl || response.file?.location);
        } catch (error) {
          reject(new Error("Invalid server response"));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.error || "Upload failed"));
        } catch {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    // Handle aborts
    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    // Set up request
    xhr.open("POST", endpoint);

    // Add auth headers if needed
    xhr.withCredentials = true;

    // Send the request
    xhr.send(formData);
  });
};


export const validateFile = (file) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "Please upload a PDF, DOC, or DOCX file" };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "File size must be less than 10MB" };
  }

  return { isValid: true, error: null };
};


export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};


export const getFileIcon = (mimeType) => {
  switch (mimeType) {
    case "application/pdf":
      return "fas fa-file-pdf text-red-500";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "fas fa-file-word text-blue-500";
    default:
      return "fas fa-file text-gray-500";
  }
};
