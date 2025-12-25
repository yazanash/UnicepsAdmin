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
import { CashRequestType } from "@/types/cashrequest";
import CashRequestModal from "./CashRequestModal";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
interface CashRequestProps {
  requests: CashRequestType[];
  // planItemStats: Record<number, number>; // {itemId: subscriptionCount}
}

const CashRequestTable = ({ requests }: CashRequestProps) => {
   const [localRequests, setLocalRequests] = useState(requests);

  const updateStatus = (id: String, status: String) => {
    setLocalRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cash requests</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>PaymentGateway</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>TransferCode</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localRequests.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.paymentGateway}</TableCell>
                  <TableCell>{req.subscription}</TableCell>
                  <TableCell>{req.transferCode ?? "-"}</TableCell>
                  <TableCell>{req.amount ?? "-"}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell>{req.createdAt}</TableCell>
                  <TableCell>
                    <CashRequestModal
                      request={req}
                      onAccept={async (id) => {
                       const res =  await api.post(`/CashRequest/ChangeCashRequestStatus`, {
                          id: id,
                          cashRequestStatus: 1,
                        });
                        console.log(res.status);
                        if(res.status===200){
                          updateStatus(id,"Accepted")
                        }
                      }}
                      onDecline={async (id) => {
                       const res =  await api.post(`/CashRequest/ChangeCashRequestStatus`, {
                          id: id,
                          cashRequestStatus: 2,
                        });
                         if(res.status===200){
                          updateStatus(id,"Declined")
                        }
                      }}
                    />
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

export default CashRequestTable;
