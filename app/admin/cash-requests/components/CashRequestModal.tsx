"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CashRequestType } from "@/types/cashrequest";
import { Input } from "@/components/ui/input";
interface ViewRequestProps {
  request: CashRequestType;
  onAccept: (id: String, message?: string) => void;
  onDecline: (id: String, message?: string) => void;
}
const CashRequestModal = ({
  request,
  onAccept,
  onDecline,
}: ViewRequestProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleAccept = () => {
    onAccept(request.id, message);
    setOpen(false);
  };
  const handleDecline = () => {
    console.log("clicked");
    onDecline(request.id, message);
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
        <DialogDescription />
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {request.email}
          </p>
          <p>
            <strong>Gateway:</strong> {request.paymentGateway}
          </p>
          <p>
            <strong>Subscription:</strong> {request.subscription} -{" "}
            {request.subscriptionPrice}
          </p>
          <p>
            <strong>Coupon:</strong> {request.couponCode ?? ""}
          </p>
          <p>
            <strong>Transfer Code:</strong> {request.transferCode}
          </p>
          <p>
            <strong>Final Price:</strong> {request.finalPrice}
          </p>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Approve / Decline Message (optional)
          </label>
          <Input
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-dark-950 border-slate-800 text-white"
          />
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
