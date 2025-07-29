"use client";

import { useState, useEffect } from "react";
import { teamAPI } from "@/lib/api";

interface TeamMember {
  id?: string | number;
  name?: string;
  position_id?: string;
  position_en?: string;
  department?: string;
  email?: string;
  phone?: string;
  bio_id?: string;
  bio_en?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  expertise?: string[];
  is_active?: boolean;
  order_position?: number;
}

export function useTeamData() {
  const [team, setTeam] = useState<TeamMember[]>([]);
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
      setError(err instanceof Error ? err.message : "Failed to fetch team data");
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
    refetch: fetchData
  };
}
