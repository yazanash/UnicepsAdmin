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
import {
  ProductType,
  PlatformEnum,
  PLATFORM_MAP_REVERSE,
} from "@/types/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const TargetLanguages = [
  {
    label: TargetLanguage_REVERSE[TargetLanguage.English],
    value: TargetLanguage.English,
  },
  {
    label: TargetLanguage_REVERSE[TargetLanguage.Arabic],
    value: TargetLanguage.Arabic,
  },
];
const TargetGenders = [
  {
    label: TargetGender_REVERSE[TargetGender.Both],
    value: TargetGender.Both,
  },
  {
    label: TargetGender_REVERSE[TargetGender.Male],
    value: TargetGender.Male,
  },
  {
    label: TargetGender_REVERSE[TargetGender.Female],
    value: TargetGender.Female,
  },
];
const Levels = [
  {
    label: TargetLevel_REVERSE[TargetLevel.None],
    value: TargetLevel.None,
  },
  {
    label: TargetLevel_REVERSE[TargetLevel.Beginner],
    value: TargetLevel.Beginner,
  },
  {
    label: TargetLevel_REVERSE[TargetLevel.Novice],
    value: TargetLevel.Novice,
  },
  {
    label: TargetLevel_REVERSE[TargetLevel.Intermediate],
    value: TargetLevel.Intermediate,
  },
  {
    label: TargetLevel_REVERSE[TargetLevel.Advanced],
    value: TargetLevel.Advanced,
  },
  {
    label: TargetLevel_REVERSE[TargetLevel.Elite],
    value: TargetLevel.Elite,
  },
];
import { ScrollArea } from "@radix-ui/react-scroll-area";
import RoutineTemplateType, {
  TargetGender,
  TargetGender_REVERSE,
  TargetLanguage,
  TargetLanguage_REVERSE,
  TargetLevel,
  TargetLevel_REVERSE,
} from "@/types/routineType";
import { Languages } from "lucide-react";
interface RoutineModalProps {
  routine?: RoutineTemplateType;
  onSaved: (routine: RoutineTemplateType, isEdit: boolean) => void;
}

const RoutineModal = ({ routine, onSaved }: RoutineModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(routine?.title ?? "");
  const [targetLangauge, setTargetLangauge] = useState<TargetLanguage>(
    routine?.targetLanguage ?? TargetLanguage.Arabic,
  );
  const [targetGender, setTargetGender] = useState<TargetGender>(
    routine?.targetGender ?? TargetGender.Both,
  );
  const [level, setLevel] = useState<TargetLevel>(
    routine?.level ?? TargetLevel.None,
  );
  const [description, setDescription] = useState(routine?.description ?? "");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("TargetGender", String(targetGender));
    formData.append("TargetLanguage", String(targetLangauge));
    formData.append("Level", String(level));
    if (file) formData.append("File", file);

    try {
      let res;
      if (routine) {
        res = await api.put(`/RoutineTemplates/${routine.apiId}`, formData);
      } else {
        res = await api.post(`/RoutineTemplates`, formData);
      }

      const savedData = res.data || {
        id: routine?.apiId || Math.random(),
        title,
        description,
        targetLangauge,
        targetGender,
      };

      onSaved(savedData, !!routine);

      // ✅ وضع الإغلاق في النهاية لضمان تنفيذه
      setOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={routine ? "outline" : "default"}>
          {routine ? "Edit" : "Add Routine"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col p-2 overflow-hidden">
        <DialogHeader>
          <DialogTitle>{routine ? "Edit Routine" : "Add Routine"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 p-6 pt-2 overflow-y-auto border-y border-white/5">
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Input
                type="file"
                accept=".unx"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب وصف البرنامج"
                rows={4}
              />
            </div>
            <div>
              <Label>Target Language</Label>

              <Select
                value={String(targetLangauge)}
                onValueChange={(e) => setTargetLangauge(Number(e))}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {TargetLanguages.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Target Gender</Label>

              <Select
                value={String(targetGender)}
                onValueChange={(e) => setTargetGender(Number(e))}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {TargetGenders.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Level</Label>

              <Select
                value={String(level)}
                onValueChange={(e) => setLevel(Number(e))}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {Levels.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoutineModal;
