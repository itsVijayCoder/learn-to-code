import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EmptyStateProps {
   title: string;
   description: string;
   icon?: React.ReactNode;
   action?: React.ReactNode;
}

const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
   return (
      <Card className='text-center py-12'>
         <CardContent className='space-y-6'>
            {icon && (
               <div className='flex justify-center'>
                  <div className='p-4 rounded-full bg-muted'>{icon}</div>
               </div>
            )}
            <div className='space-y-2'>
               <h3 className='text-lg font-semibold'>{title}</h3>
               <p className='text-muted-foreground'>{description}</p>
            </div>
            {action && <div className='flex justify-center'>{action}</div>}
         </CardContent>
      </Card>
   );
};

interface ErrorStateProps {
   title?: string;
   message: string;
   retry?: () => void;
}

const ErrorState = ({
   title = "Something went wrong",
   message,
   retry,
}: ErrorStateProps) => {
   return (
      <Card className='text-center py-12 border-destructive/50'>
         <CardContent className='space-y-4'>
            <div className='space-y-2'>
               <h3 className='text-lg font-semibold text-destructive'>
                  {title}
               </h3>
               <p className='text-muted-foreground'>{message}</p>
            </div>
            {retry && (
               <button
                  onClick={retry}
                  className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
               >
                  Try Again
               </button>
            )}
         </CardContent>
      </Card>
   );
};

interface LoadingStateProps {
   title?: string;
   description?: string;
}

const LoadingState = ({ title, description }: LoadingStateProps) => {
   return (
      <Card>
         <CardHeader>
            {title && (
               <CardTitle>
                  <Skeleton className='h-6 w-48' />
               </CardTitle>
            )}
         </CardHeader>
         <CardContent className='space-y-4'>
            {description && <Skeleton className='h-4 w-full' />}
            <div className='space-y-2'>
               <Skeleton className='h-4 w-full' />
               <Skeleton className='h-4 w-3/4' />
               <Skeleton className='h-4 w-1/2' />
            </div>
         </CardContent>
      </Card>
   );
};

export { EmptyState, ErrorState, LoadingState };
