import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to subscribe to real-time alert changes.
 * Automatically invalidates relevant queries when alerts are created, updated, or deleted.
 */
export function useRealtimeAlerts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("alerts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alerts",
        },
        () => {
          // Invalidate all alert-related queries immediately
          queryClient.invalidateQueries({ queryKey: ["alerts"] });
          queryClient.invalidateQueries({ queryKey: ["alerts-by-severity"] });
          queryClient.invalidateQueries({ queryKey: ["alerts-by-source"] });
          queryClient.invalidateQueries({ queryKey: ["alerts-over-time"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
