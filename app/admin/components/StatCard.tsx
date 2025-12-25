
import { LucideIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string; // اختياري لتعديل تصميم البطاقة
}
const StatCard = ({ title, value, icon: Icon, className }: StatCardProps) => {
  return (
   <div className={`flex items-center p-4 border rounded-lg shadow ${className}`}>
      {/* أيقونة البطاقة */}
      <div className="p-3  rounded-full">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>

      {/* النصوص */}
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </div>
  )
}

export default StatCard