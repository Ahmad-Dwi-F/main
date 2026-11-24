import { useCallback, useEffect, useState } from "react";
import { tutorSayaApi } from "../services/api/tutorSayaApi";

export function useTutorProfile() {
  const [state, setState] = useState({ profile: null, loading: true });

  useEffect(() => {
    let cancelled = false;

    tutorSayaApi
      .getProfile()
      .then((profile) => {
        if (!cancelled) setState({ profile, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ profile: null, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const saveProfession = useCallback(async (profession) => {
    const profile = await tutorSayaApi.saveProfile(profession);
    setState({ profile, loading: false });
  }, []);

  return { ...state, saveProfession };
}
