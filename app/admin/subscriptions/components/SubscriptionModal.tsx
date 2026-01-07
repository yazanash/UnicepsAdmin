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
import { SubscriptionType } from "@/types/subscriptionType";
interface ViewRequestProps {
  request: SubscriptionType;
  onAccept: (id: String) => void;
  onDecline: (id: String) => void;
}
const SubscriptionModal = ({
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
          <DialogTitle>Subscription #{request.id}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {request.email}
          </p>
          <p>
            <strong>Plan:</strong> {request.plan}
          </p>
          <p>
            <strong>Price: </strong> {request.price}
          </p>
          <p>
            <strong>Start Date :</strong>{" "}
            {request.startDate?.toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong> {request.endDate?.toLocaleDateString()}
          </p>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="default" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="destructive" onClick={handleDecline}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
