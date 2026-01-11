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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const imageSrc = request.imageUrl
    ? `${BASE_URL}${request.imageUrl}`
    : "/placeholder-app.png";
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
        <div className="relative group">
     <p className="text-sm font-bold mb-1">Receipt Image:</p>
     <div className="max-h-75 overflow-y-auto border rounded-md bg-muted/30">
        <img 
          src={imageSrc} 
          alt="Receipt" 
          className="w-full h-auto object-contain cursor-zoom-in" 
          onClick={() => window.open(imageSrc, '_blank')}
        />
     </div>
     <span className="text-[10px] text-muted-foreground mt-1 block">
        * انقر على الصورة لفتحها بالحجم الكامل
     </span>
  </div>
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
