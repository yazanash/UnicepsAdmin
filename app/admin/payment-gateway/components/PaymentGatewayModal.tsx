"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // من shadcn/ui
import { api } from "@/lib/api";
import { PaymentGateway } from "@/types/payment-gateway";

interface GatewayModalProps {
  gateway?: PaymentGateway;
  onSaved: (gateway: PaymentGateway, isEdit: boolean) => void;
}

const GatewayModal = ({ gateway, onSaved }: GatewayModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(gateway?.name ?? "");
  const [transferInfo, setTransferInfo] = useState(gateway?.transferInfo ?? "");
  const [isActive, setIsActive] = useState(gateway?.isActive ?? true);

  const handleSave = async () => {
    let saved: PaymentGateway;
    if (gateway) {
      // تعديل
      await api.put(`/PaymentGateway/${gateway.id}`, {
        id: gateway.id,
        name,
        transferInfo,
        isActive,
      });
      saved = { ...gateway, name, transferInfo, isActive };
      onSaved(saved, true);
    } else {
      // إضافة
      const res = await api.post(`/PaymentGateway`, {
        name,
        transferInfo,
        isActive,
      });
      saved = res.data; // السيرفر بيرجع الـ Gateway الجديد
      onSaved(saved, false);
    }
    setName("");
    setTransferInfo("");
    setIsActive(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={gateway ? "outline" : "default"}>
          {gateway ? "Edit" : "Add Gateway"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gateway ? "Edit Gateway" : "Add Gateway"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Transfer Info</Label>
            <Textarea
              value={transferInfo}
              onChange={(e) => setTransferInfo(e.target.value)}
              placeholder="اكتب تعليمات التحويل هنا..."
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <Label>Active</Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GatewayModal;
