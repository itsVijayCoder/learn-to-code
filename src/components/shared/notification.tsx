import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
   type: "success" | "error" | "warning" | "info";
   title?: string;
   message: string;
   className?: string;
}

const iconMap = {
   success: CheckCircle2,
   error: XCircle,
   warning: AlertCircle,
   info: Info,
};

const colorMap = {
   success:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
   error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
   warning:
      "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
   info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
};

const Notification = ({
   type,
   title,
   message,
   className,
}: NotificationProps) => {
   const Icon = iconMap[type];

   return (
      <Alert className={cn(colorMap[type], className)}>
         <Icon className='h-4 w-4' />
         {title && <AlertTitle>{title}</AlertTitle>}
         <AlertDescription>{message}</AlertDescription>
      </Alert>
   );
};

export { Notification };
