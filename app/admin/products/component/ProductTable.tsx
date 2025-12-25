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
import { ProductType, PLATFORM_MAP_REVERSE } from "@/types/products";
import ProductModal from "./ProductModal";
import Link from "next/link";
interface ProductsProps {
  products: ProductType[];
}
const ProductTable = ({ products }: ProductsProps) => {
  const [localProducts, setLocalProducts] = useState(products);
  const handleSaved = (product: ProductType, isEdit: boolean) => {
    setLocalProducts((prev) => {
      if (isEdit) {
        return prev.map((g) => (g.id === product.id ? product : g));
      } else {
        return [...prev, product];
      }
    });
  };
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Products</CardTitle>
          <ProductModal onSaved={handleSaved} />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localProducts.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{PLATFORM_MAP_REVERSE[req.platform]}</TableCell>
                  <TableCell>
                    <ProductModal product={req} onSaved={handleSaved} />
                    <Link href={`/admin/products/${req.id}`}>
                      <Button className="mx-2"> Manage</Button>
                    </Link>
                    {/* <Link href={`/admin/products/${req.id}/plans`}>
                      <Button className="mx-2"> Manage Plans</Button>
                    </Link> */}
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

export default ProductTable;
