"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  ProductType,
  PLATFORM_MAP_REVERSE,
  PlatformEnum,
} from "@/types/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  ListChecks,
  HelpCircle,
  Laptop,
  Smartphone,
  Globe,
} from "lucide-react";
import Link from "next/link";
// import { Badge } from "@/components/ui/badge";

const ProductControl = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات المنتج الأساسية
    api
      .get(`/Product/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading)
    return <div className="p-8 text-center">جاري تحميل بيانات المنتج...</div>;
  if (!product)
    return <div className="p-8 text-center">عذراً، المنتج غير موجود.</div>;

  const menuItems = [
    {
      title: "Plans & Pricing",
      desc: "إدارة خطط الدفع والأسعار",
      icon: <CreditCard />,
      href: `/admin/products/${productId}/plans`,
      color: "bg-blue-500",
    },
    {
      title: "Releases",
      desc: "رفع وتحديث نسخ المنتج",
      icon: <Package />,
      href: `/admin/products/${productId}/releases`,
      color: "bg-green-500",
    },
    {
      title: "Features",
      desc: "تعديل قائمة ميزات المنتج",
      icon: <LayoutDashboard />,
      href: `/admin/products/${productId}/features`,
      color: "bg-purple-500",
    },
    {
      title: "User Steps",
      desc: "خطوات البدء والاستخدام",
      icon: <ListChecks />,
      href: `/admin/products/${productId}/user-steps`,
      color: "bg-orange-500",
    },
    {
      title: "FAQs",
      desc: "الأسئلة الشائعة والدعم",
      icon: <HelpCircle />,
      href: `/admin/products/${productId}/faqs`,
      color: "bg-pink-500",
    },
  ];
  return (
    <div className="p-8 space-y-8">
      {/* قسم معلومات المنتج الأساسية */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-xl shadow-sm border">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold ">
              {product.name}
            </h1>
            {/* <Badge variant="outline" className="text-sm px-3 py-1"> */}
            ID: #{product.id}
            {/* </Badge> */}
          </div>
          <div className="flex items-center gap-2">
            {product.platform === PlatformEnum.Desktop ? (
              <Laptop size={18} />
            ) : (
              <Smartphone size={18} />
            )}
            <span>المنصة: {PLATFORM_MAP_REVERSE[product.platform]}</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          {/* زر سريع لتعديل بيانات المنتج الأساسية بنفس المودال القديم */}
          {/* <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 px-4 py-2">
                Active Product
             </Badge> */}
        </div>
      </div>

      {/* شبكة خيارات الإدارة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="hover:shadow-md transition-all cursor-pointer group border-none ring-1 ring-gray-800">
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  className={`p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductControl;
