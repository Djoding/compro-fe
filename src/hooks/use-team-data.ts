"use client";

import { teamAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  teamMemberId: string;
}

interface TeamMemberData {
  id: string;
  name: string;
  position_id: string;
  position_en: string;
  imageUrl: string;
  roleCategory: string;
  createdAt: string;
  updatedAt: string;
  socialMedia: SocialMedia[];
  position: string;
  // Fallback fields for compatibility
  department?: string;
  email?: string;
  phone?: string;
  bio_id?: string;
  bio_en?: string;
  expertise?: string[];
  is_active?: boolean;
  order_position?: number;
}

export function useTeamData() {
  const [team, setTeam] = useState<TeamMemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await teamAPI.getAll();
      setTeam(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch team data"
      );
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    team,
    loading,
    error,
    refetch: fetchData,
  };
}
