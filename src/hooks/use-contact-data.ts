"use client";

import { useState, useEffect } from "react";
import { contactAPI } from "@/lib/api";

interface ContactInfo {
  id?: string | number;
  phone_id?: string;
  phone_en?: string;
  email?: string;
  address_id?: string;
  address_en?: string;
  operatingHours_id?: string;
  operatingHours_en?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
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
      setContactInfo(response.data || null);
    } catch (err) {
      console.error('Error fetching contact data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch contact data');
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
    refetch: fetchData
  };
}
