"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FAQsType } from "@/types/faqs";
import { useState } from "react";
import { useEffect } from "react";
interface UserStepModalProps {
  productId: number;
  faq?: FAQsType;
  onSave: (feature: FAQsType) => void;
}
const FAQsModal = ({ productId, faq, onSave }: UserStepModalProps) => {
  const [newItem, setItem] = useState<Partial<FAQsType>>({
    question: "",
    answer: "",
    productId,
  });
  const [open, setOpen] = useState(false);
  const isEdit = !!faq?.id;
  useEffect(() => {
    if (faq) {
      setItem(faq);
    } else {
      setItem({ question: "", answer: "", productId });
    }
  }, [faq, open]);
  const handleAdd = () => {
    // نمرر العنصر الجديد للـ callback
    onSave(newItem as FAQsType);
    // إعادة تعيين الفورم
    setItem({
      question: "",
      answer: "",
      productId,
    });
    setOpen(false);
    if (!isEdit) {
      setItem({ question: "", answer: "", productId });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon">
            Edit
          </Button> // شكل زر التعديل في الجدول
        ) : (
          <Button>Add FAQ</Button> // شكل زر الإضافة الرئيسي
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <Label>Question</Label>
            <Input
              value={newItem.question || ""}
              onChange={(e) =>
                setItem({ ...newItem, question: e.target.value })
              }
            />
          </div>
          <div className="col-span-3 space-y-2">
            <Label>Answer</Label>
            <Textarea
              value={newItem.answer || ""}
              onChange={(e) => setItem({ ...newItem, answer: e.target.value })}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd}>
            {isEdit ? "Save Changes" : "Add FAQ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FAQsModal;
