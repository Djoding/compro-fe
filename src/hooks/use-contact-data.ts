"use client";

import { contactAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface ContactInfo {
  id: string;
  location_id: string;
  location_en: string;
  phone: string;
  email: string;
  operationHours_id: string;
  operationHours_en: string;
  updatedAt: string;
  location: string;
  operationHours: string;
}

export function useContactData() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await contactAPI.getInfo();
      setContactInfo((response.data as ContactInfo) || null);
    } catch (err) {
      console.error("Error fetching contact data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch contact data"
      );
      setContactInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    contactInfo,
    loading,
    error,
    refetch: fetchData,
  };
}
