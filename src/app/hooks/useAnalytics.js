import { useEffect } from "react";

export function usePageViewTracking(profileId) {
  useEffect(() => {
    if (!profileId) return;
    
    // Send page view tracking request
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics/page-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileId }),
        });
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };
    
    trackPageView();
  }, [profileId]);
}

export function trackClick(profileId, elementId) {
  if (!profileId) return;
  
  // Send click tracking request
  fetch("/api/analytics/click", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId, elementId }),
  }).catch((error) => {
    console.error("Error tracking click:", error);
  });
}