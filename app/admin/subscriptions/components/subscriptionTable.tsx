"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SubscriptionType } from "@/types/subscriptionType";
import SubscriptionModal from "./SubscriptionModal";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
interface SubscriptionsProps {
  subs: SubscriptionType[];
}

const SubscriptionsTable = ({ subs }: SubscriptionsProps) => {
  const [localSubs, setLocalSubs] = useState(subs);
  const [searchEmail, setSearchEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = (id: string) => {
    setLocalSubs((prev) => prev.filter((req) => req.id !== id));
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // تحديد نوع البيانات المتوقعة من الـ API
      const res = await api.get<SubscriptionType[]>(
        `/Membership/pending-subscriptions`,
        {
          params: { email: searchEmail },
        }
      );

      const formattedSubs: SubscriptionType[] = res.data.map((s) => ({
        ...s,
        startDate: s.startDate ? new Date(s.startDate) : undefined,
        endDate: s.endDate ? new Date(s.endDate) : undefined,
      }));
      setLocalSubs(formattedSubs);

      if (formattedSubs.length === 0) {
        toast.info("No results found");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setLocalSubs([]);
        toast.info("No subscriptions found for this email");
      } else {
        toast.error("Failed to fetch subscriptions");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Subscriptions</CardTitle>

          {/* قسم البحث */}
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // البحث عند ضغط Enter
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localSubs.map((req, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{req.id}</TableCell> */}
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.plan}</TableCell>
                  <TableCell>{req.price}</TableCell>
                  <TableCell>
                    {req.startDate
                      ? new Date(req.startDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {req.endDate
                      ? new Date(req.startDate!).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <SubscriptionModal
                      request={req}
                      onAccept={async (id) => {
                        const res = await api.post(
                          `/Membership/activate-subscription`,
                          {
                            membershipId: id,
                          }
                        );
                        console.log(res.status);
                        if (res.status === 200) {
                          updateStatus(id);
                          toast.success("Activated", {
                            description: "Subscription activated successfully",
                          });
                        }
                      }}
                      onDecline={async (id) => {
                        const res = await api.delete(
                          `/Membership/delete-subscription`,
                          {
                            data: { membershipId: id },
                          }
                        );
                        if (res.status === 200) {
                          updateStatus(id);
                          toast.success("Declined", {
                            description: "Subscription activated successfully",
                          });
                        }
                      }}
                    />
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

export default SubscriptionsTable;
