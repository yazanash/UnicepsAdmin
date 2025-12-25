"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  ReleaseType,
  TargetOS_REVERSE,
  DownloadSource_REVERSE,
} from "@/types/release";
import Link from "next/link";
interface ReleaseProps {
  releases: ReleaseType[];
  productId: string;
}
const ReleasesTable = ({ productId, releases }: ReleaseProps) => {
  const [localReleases, setLocalReleases] = useState(releases);
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Releases</CardTitle>
          <Link href={`/admin/products/${productId}/releases/new`}>
            <Button>Add New Release</Button>
          </Link>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Target OS</TableHead>
                <TableHead>Download Source</TableHead>
                <TableHead>Download Url</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localReleases.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.version}</TableCell>
                  <TableCell>{TargetOS_REVERSE[req.targetOS]}</TableCell>
                  <TableCell>
                    {DownloadSource_REVERSE[req.downloadSource]}
                  </TableCell>
                  <TableCell>{req.downloadUrl}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleasesTable;
