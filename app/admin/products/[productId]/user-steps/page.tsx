"use client";
import { UserStepType } from "@/types/userStep";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import UserStepModal from "./components/UserStepModal";
const UserStepsPage = () => {
  const params = useParams();
  const productId = params.productId;
  const [userSteps, setUserSteps] = useState<UserStepType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/UserStep/product/${productId}`)
      .then((res) => {
        setUserSteps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>User Steps</CardTitle>
          <UserStepModal
            productId={Number(productId)}
            onSave={async (userStep) => {
              const res = await api.post(`/UserStep`, userStep);
              const createdStep = res.data;
              setUserSteps((prev) => {
                const currentStep = prev || [];
                return [...currentStep, createdStep];
              });
            }}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Step Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSteps!.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.stepNumber}</TableCell>
                  <TableCell>{req.title}</TableCell>
                  <TableCell>{req.description}</TableCell>
                  <TableCell>
                    <UserStepModal
                      productId={Number(productId)}
                      userStep={req}
                      onSave={async (userStep) => {
                        const res = await api.put(
                          `/UserStep/${userStep.id}`,
                          userStep
                        );
                        const createdStep = res.data;
                        setUserSteps(
                          (prev) =>
                            prev?.map((u) =>
                              u.id === userStep.id ? userStep : u
                            ) || []
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!userSteps && <div>No UserSteps yet</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStepsPage;
