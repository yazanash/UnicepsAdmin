"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LicenseType } from "@/types/products";
import LicenseModal from "./LicenseModal";
import { Download, Trash2, Calendar, Monitor } from "lucide-react";
import { api } from "@/lib/api";

interface LicenseTableProps {
  licenses: LicenseType[];
}

const LicenseTable = ({ licenses }: LicenseTableProps) => {
  const [localLicenses, setLocalLicenses] = useState(licenses);

  const handleSaved = (license: LicenseType, isEdit: boolean) => {
    setLocalLicenses((prev) => {
      if (isEdit) {
        return prev.map((l) => (l.id === license.id ? license : l));
      } else {
        return [...prev, license];
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الترخيص؟")) {
      try {
        await api.delete(`/Licenses/${id}`);
        setLocalLicenses((prev) => prev.filter((l) => l.id !== id));
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const downloadLicense = async (license: LicenseType) => {
    try {
      const response = await api.get(
        `Licenses/download-license/${license.id}`,
        {
          responseType: "blob",
        },
      );

      const contentDisposition = response.headers["content-disposition"];

      let fileName = `${license.customerName}.unxlic`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
        );
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, "");
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Uniceps Licenses</CardTitle>
          <LicenseModal onSaved={handleSaved} />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer name</TableHead>
                <TableHead>Expire Date</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localLicenses.map((lic) => (
                <TableRow key={lic.id}>
                  <TableCell className="font-bold">
                    {lic.customerName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {lic.expireDate
                        ? new Date(lic.expireDate).toDateString()
                        : "Unlimited"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-slate-400" />
                      {lic.maxDevices}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {/* زر التحميل */}
                      <button
                        onClick={() => downloadLicense(lic)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Download size={18} />
                      </button>

                      {/* زر التعديل (المودال) */}
                      <LicenseModal license={lic} onSaved={handleSaved} />

                      {/* زر الحذف */}
                      <button
                        onClick={() => handleDelete(lic.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default LicenseTable;
