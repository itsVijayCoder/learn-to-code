declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NEXT_PUBLIC_APP_URL: string;
         NEXTAUTH_URL: string;
         NEXTAUTH_SECRET: string;
         SUPABASE_URL: string;
         SUPABASE_ANON_KEY: string;
         SUPABASE_SERVICE_KEY: string;
      }
   }
}

export {};
