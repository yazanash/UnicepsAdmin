"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TargetOSEnum, DownloadSourceEnum } from "@/types/release";
import { api } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB لكل chunk

const TargetOS = [
  { label: "Windows", value: TargetOSEnum.Windows },
  { label: "MacOS", value: TargetOSEnum.MacOS },
  { label: "Linux", value: TargetOSEnum.Linux },
  { label: "Android", value: TargetOSEnum.Android },
  { label: "IOS", value: TargetOSEnum.IOS },
];
const DownloadSource = [
  { label: "GooglePlay", value: DownloadSourceEnum.GooglePlay },
  { label: "Website", value: DownloadSourceEnum.Website },
  { label: "MicrosoftStore", value: DownloadSourceEnum.MicrosoftStore },
  { label: "AppStore", value: DownloadSourceEnum.AppStore },
];

export default function NewReleasePage() {
  const params = useParams();
  const productId = Number(params.productId);
  const router = useRouter();

  const [version, setVersion] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [targetOS, setTargetOS] = useState(TargetOSEnum.Windows);
  const [downloadSource, setDownloadSource] = useState(
    DownloadSourceEnum.Website
  );
  const [changeLog, setChangeLog] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFileInChunks = async (file: File) => {
    const uploadId = crypto.randomUUID();
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedBytes = 0;
    let downloadUrl = "";
    console.log("file uploaded");
    console.log(totalChunks);
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("UploadId", uploadId);
      formData.append("ChunkIndex", String(i));
      formData.append("TotalChunks", String(totalChunks));
      formData.append("Chunk", chunk);

      const res = await api.post(`/Release/upload-chunk`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.downloadUrl) {
        downloadUrl = res.data.downloadUrl;
      }

      uploadedBytes += chunk.size;
      setProgress(Math.round((uploadedBytes / file.size) * 100));
    }

    return downloadUrl;
  };

  const handleSave = async () => {
    if (file){
        const fileUrl = await uploadFileInChunks(file);
        setDownloadUrl(fileUrl);
    }

    // 1. رفع الملف بالـ chunks
    
      console.log( {
      productId,
      version,
      targetOS,
      downloadSource,
      changeLog,
      downloadUrl
    });
    // 2. إنشاء الـ Release
    await api.post(`/Release/upload`, {
      productId,
      version,
      targetOS,
      downloadSource,
      changeLog,
      downloadUrl
    });

    router.push(`/admin/products/${productId}/releases`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Add Release for Product {productId}
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className=" space-y-2">
          <Label>Version</Label>
          <Input value={version} onChange={(e) => setVersion(e.target.value)} />
        </div>

        <div className=" space-y-2">
          <Label>Target OS</Label>

          <Select
            value={String(targetOS)}
            onValueChange={(e) => setTargetOS(Number(e))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="TargetOS" />
            </SelectTrigger>
            <SelectContent>
              {TargetOS.map((p) => (
                <SelectItem key={p.value} value={String(p.value)}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className=" space-y-2">
          <Label>Download Source</Label>

          <Select
            value={String(downloadSource)}
            onValueChange={(e) => setDownloadSource(Number(e))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Download Source" />
            </SelectTrigger>
            <SelectContent>
              {DownloadSource.map((p) => (
                <SelectItem key={p.value} value={String(p.value)}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-3 space-y-2">
          <Label>ChangeLog</Label>
          <Textarea
            value={changeLog}
            onChange={(e) => setChangeLog(e.target.value)}
            rows={4}
          />
        </div>
        <div className=" space-y-2">
          <Label>DownloadUrl</Label>
          <Input
            type="url"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>File</Label>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded">
            <div
              className="bg-blue-500 text-white text-xs leading-none py-1 text-center rounded"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleSave}>Save Release</Button>
    </div>
  );
}
