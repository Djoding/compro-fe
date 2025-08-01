"use client";

import { companyProfileAPI, journeyAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface CompanyProfile {
  id: string;
  companyOverview_id: string;
  companyOverview_en: string;
  coreValues_id: string;
  coreValues_en: string;
  vision_id: string;
  vision_en: string;
  mission_id: string;
  mission_en: string;
  customerService_id: string;
  customerService_en: string;
  updatedAt: string;
  companyOverview: string;
  coreValues: string;
  vision: string;
  mission: string;
  customerService: string;
}

interface Journey {
  id?: string | number;
  year?: number;
  title_id?: string;
  title_en?: string;
  description_id?: string;
  description_en?: string;
  achievement_id?: string;
  achievement_en?: string;
  image?: string;
}

interface AboutData {
  companyProfile: CompanyProfile | null;
  journey: Journey[];
}

export function useAboutData() {
  const [data, setData] = useState<AboutData>({
    companyProfile: null,
    journey: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch company profile and journey data in parallel
      const [profileResponse, journeyResponse] = await Promise.all([
        companyProfileAPI.getProfile(),
        journeyAPI.getAll(),
      ]);

      setData({
        companyProfile:
          profileResponse.data && Object.keys(profileResponse.data).length > 0
            ? (profileResponse.data as CompanyProfile)
            : null,
        journey: Array.isArray(journeyResponse.data)
          ? journeyResponse.data
          : [],
      });
    } catch (err) {
      console.error("Error fetching about data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch about data"
      );
      // Set empty data on error to use fallbacks
      setData({
        companyProfile: null,
        journey: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    ...data,
    loading,
    error,
    refetch: fetchData,
  };
}
