"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import TurnstileWidget from "./common/TurnstileWidget";

const formSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  "cf-turnstile-response": z.string().optional(),
});
type FormType = z.infer<typeof formSchema>;

export default function SubscribeForm() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      "cf-turnstile-response": "",
    },
  });

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.turnstile) {
  //     window.turnstile.render(turnstileRef.current!, {
  //       sitekey: "1x00000000000000000000AA", // Use your actual sitekey here
  //       callback: (token: string) => {
  //         setToken(token)
  //       },
  //       "error-callback": () => {
  //         setToken("")
  //       },
  //       "expired-callback": () => {
  //         setToken("")
  //       },
  //     })
  //   }
  // }, [])

  async function onSubmit(data: FormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="bg-gray-900 border-gray-700 focus:border-emerald-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-900 border-gray-700 focus:border-emerald-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cf-turnstile-response"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <TurnstileWidget
                  sitekey="1x00000000000000000000AA"
                  onSuccess={(token) => {
                    onChange(token);
                  }}
                  onError={() => {
                    toast.error("Turnstile verification failed");
                  }}
                  onExpire={() => {
                    toast.error("Turnstile verification expired");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={isLoading}
        >
          <Download className="h-4 w-4 mr-2" />
          {isLoading ? "Processing..." : "Get Free E-Book"}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </Form>
  );
}
