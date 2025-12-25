"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plan } from "@/types/plans";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
interface EditPlanModalProps {
  plan: Plan;
  onSave: (updatedPlan: Plan) => void;
}

const EditPlanModal = ({ plan, onSave }: EditPlanModalProps) => {
  const [editedPlan, setEditedPlan] = useState<Plan>(plan);
    const [open, setOpen] = useState(false);
  const handleSave = () => {
    onSave(editedPlan);
    setOpen(false);
  };
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><PencilIcon /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label>Name</label>
            <Input
              value={editedPlan.name}
              onChange={(e) =>
                setEditedPlan({ ...editedPlan, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Target User Type</label>
            <Input
              type="number"
              value={editedPlan.targetUserType}
              onChange={(e) =>
                setEditedPlan({
                  ...editedPlan,
                  targetUserType: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanModal;
