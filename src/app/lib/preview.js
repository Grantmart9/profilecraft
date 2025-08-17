// Utility functions for live preview functionality

export function generatePreviewUrl(profileId, layoutId) {
  // Generate a preview URL for the profile
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/preview/${profileId}/${layoutId}`;
}

export function validatePreviewToken(token, profileId) {
  // Validate the preview token (in a real implementation, you would check against a database)
  // For now, we'll just check if the token exists and matches the profile ID
  try {
    const decodedToken = atob(token);
    const [id, timestamp] = decodedToken.split(":");
    
    // Check if the token is for the correct profile and not expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp);
    return id === profileId && tokenAge < 24 * 60 * 60 * 1000;
  } catch (error) {
    return false;
  }
}

export function generatePreviewToken(profileId) {
  // Generate a preview token for sharing
  const tokenData = `${profileId}:${Date.now()}`;
  return btoa(tokenData);
}

export function getPreviewLayout(layoutData) {
  // Process layout data for preview
  // This would typically involve sanitizing and preparing the HTML for safe rendering
  if (!layoutData || !layoutData.html) {
    return "<div>No layout data available</div>";
  }
  
  // In a real implementation, you would sanitize the HTML here
  // For now, we'll just return the HTML as-is
  return layoutData.html;
}