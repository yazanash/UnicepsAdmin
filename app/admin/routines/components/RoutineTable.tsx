"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoutineTemplateType, {
  TargetGender_REVERSE,
  TargetLevel_REVERSE,
} from "@/types/routineType";
import Link from "next/link";
import React, { useState } from "react";
import RoutineModal from "./RoutineModal";
interface RoutinesProps {
  routines: RoutineTemplateType[];
}
const RoutineTable = ({ routines }: RoutinesProps) => {
  const [localRoutines, setlocalRoutines] = useState(routines);
  console.log(localRoutines);
  const handleSaved = (routine: RoutineTemplateType, isEdit: boolean) => {
    setlocalRoutines((prev) => {
      if (isEdit) {
        return prev.map((g) => (g.apiId === routine.apiId ? routine : g));
      } else {
        return [...prev, routine];
      }
    });
  };
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Routines</CardTitle>
          <RoutineModal onSaved={handleSaved} />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Routine Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localRoutines.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.title}</TableCell>
                  <TableCell>
                    {TargetGender_REVERSE[req.targetGender]}
                  </TableCell>
                  <TableCell>{TargetLevel_REVERSE[req.level]}</TableCell>
                  <TableCell>
                    <RoutineModal routine={req} onSaved={handleSaved} />
                    {/* <Link href={`/admin/products/${req.id}`}>
                      <Button className="mx-2"> Manage</Button>
                    </Link>
                    <Link href={`/admin/products/${req.id}/plans`}>
                      <Button className="mx-2"> Manage Plans</Button>
                    </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutineTable;
