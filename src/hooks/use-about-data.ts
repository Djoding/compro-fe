"use client";

import { useState, useEffect } from "react";
import { companyProfileAPI, journeyAPI } from "@/lib/api";

interface CompanyProfile {
  id?: string | number;
  name?: string;
  description_id?: string;
  description_en?: string;
  vision_id?: string;
  vision_en?: string;
  mission_id?: string;
  mission_en?: string;
  phone?: string;
  email?: string;
  address_id?: string;
  address_en?: string;
  website?: string;
  founded_year?: number;
  logo?: string;
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
    journey: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch company profile and journey data in parallel
      const [profileResponse, journeyResponse] = await Promise.all([companyProfileAPI.getProfile(), journeyAPI.getAll()]);

      setData({
        companyProfile: profileResponse.data || null,
        journey: Array.isArray(journeyResponse.data) ? journeyResponse.data : []
      });
    } catch (err) {
      console.error("Error fetching about data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch about data");
      // Set empty data on error to use fallbacks
      setData({
        companyProfile: null,
        journey: []
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
    refetch: fetchData
  };
}
