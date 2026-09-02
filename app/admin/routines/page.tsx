"use client";
import React, { useEffect, useState } from "react";
import RoutineTable from "./components/RoutineTable";
import RoutineTemplateType from "@/types/routineType";
import { api } from "@/lib/api";

const Routines = () => {
  const [routines, setRoutines] = useState<RoutineTemplateType[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/RoutineTemplates/all`)
      .then((res) => {
        console.log(res.data);
        setRoutines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching routines", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-5">Loading</div>;
  if (!routines) return <div className="text-center p-5">No Templates Yet</div>;

  return <RoutineTable routines={routines} />;
};

export default Routines;
