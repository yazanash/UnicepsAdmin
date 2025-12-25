"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PaymentGateway } from "@/types/payment-gateway";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import GatewayModal from "./PaymentGatewayModal";
interface PaymentGateProps {
  gateways: PaymentGateway[];
}

const PaymentGatewayTable = ({ gateways }: PaymentGateProps) => {
  const [localGateways, setLocalGateways] = useState(gateways);
  const handleSaved = (gateway: PaymentGateway, isEdit: boolean) => {
    setLocalGateways((prev) => {
      if (isEdit) {
        return prev.map((g) => (g.id === gateway.id ? gateway : g));
      } else {
        return [...prev, gateway];
      }
    });
  };
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Payment gateways</CardTitle>
          <GatewayModal onSaved={handleSaved} />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Gateway Name</TableHead>
                <TableHead>Transfer Info</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localGateways.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.transferInfo}</TableCell>

                  <TableCell>
                    <GatewayModal gateway={req} onSaved={handleSaved} />
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

export default PaymentGatewayTable;
