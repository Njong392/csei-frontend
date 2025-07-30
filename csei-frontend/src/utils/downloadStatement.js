import fetchWithCookies from "./fetchWrapper";

export const downloadAccountStatement = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/members/account`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/pdf",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to download statement");
    }

    // Get the PDF blob
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Generate filename with current date
    const today = new Date().toISOString().split("T")[0];
    link.download = `account-statement-${today}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Error downloading statement:", error);
    throw error;
  }
};