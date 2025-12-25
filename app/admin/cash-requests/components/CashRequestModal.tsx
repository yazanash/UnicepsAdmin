"use client"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CashRequestType } from "@/types/cashrequest";
interface ViewRequestProps {
  request: CashRequestType;
  onAccept: (id: String) => void;
  onDecline: (id: String) => void;
}
const CashRequestModal = ({
  request,
  onAccept,
  onDecline,
}: ViewRequestProps) => {
  const [open, setOpen] = useState(false);
  const handleAccept = () => {
    onAccept(request.id);
    setOpen(false);
  };
  const handleDecline = () => {
    console.log("clicked")
    onDecline(request.id);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cash Request #{request.id}</DialogTitle>
        </DialogHeader>
        <DialogDescription/>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {request.email}
          </p>
          <p>
            <strong>Subscription:</strong> {request.subscription}
          </p>
          <p>
            <strong>Gateway:</strong> {request.paymentGateway}
          </p>
          <p>
            <strong>Transfer Code:</strong> {request.transferCode}
          </p>
          <p>
            <strong>Amount:</strong> {request.amount}
          </p>
          {/* {request.imageUrl && <img src={request.imageUrl} alt="Receipt" className="rounded-md" />} */}
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="default" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="destructive" onClick={handleDecline}>
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CashRequestModal;
