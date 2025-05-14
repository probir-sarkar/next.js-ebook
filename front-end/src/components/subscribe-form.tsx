"use client";
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
import { client } from "@/config/client";

const formSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  token: z.string().min(1, "Please verify you are not a robot"),
});
type FormType = z.infer<typeof formSchema>;

export default function SubscribeForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      token: "",
    },
  });

  async function onSubmit(data: FormType) {
    const response = await client.subscribe.$post({
      json: data,
    });
    console.log(response);
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
          name="token"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <TurnstileWidget
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
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
        >
          <Download className="h-4 w-4 mr-2" />
          {form.formState.isSubmitting ? "Processing..." : "Get Free E-Book"}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </Form>
  );
}
