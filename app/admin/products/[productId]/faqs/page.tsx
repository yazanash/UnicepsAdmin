"use client";
import { FAQsType } from "@/types/faqs";
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
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import FAQsModal from "./components/FAQsModal";

const Faqs = () => {
  const params = useParams();
  const productId = params.productId;
  const [faqs, setFaqs] = useState<FAQsType[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/FAQ/product/${productId}`)
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>User Steps</CardTitle>
          <FAQsModal
            productId={Number(productId)}
            onSave={async (faq) => {
              const res = await api.post(`/FAQ`, faq);
              const createdfaq = res.data;
              setFaqs((prev) => {
                const currentFaq = prev || [];
                return [...currentFaq, createdfaq];
              });
            }}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs!.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{String(req.id)}</TableCell>
                  <TableCell>{req.question}</TableCell>
                  <TableCell>{req.answer}</TableCell>
                  <TableCell>
                    <FAQsModal
                      productId={Number(productId)}
                      faq={req}
                      onSave={async (faq) => {
                        const res = await api.put(`/FAQ/${faq.id}`, faq);
                        const createdStep = res.data;
                        setFaqs(
                          (prev) =>
                            prev?.map((u) => (u.id === faq.id ? faq : u)) || []
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!faqs && <div>No UserSteps yet</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Faqs;
