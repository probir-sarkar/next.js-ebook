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
import TurnstileWidget from "./common/TurnstileWidget";
import { client } from "@/config/client";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

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
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      token: "",
    },
  });

  async function onSubmit(data: FormType) {
    const res = await client.subscribe.$post({
      json: data,
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        toast.success("Subscription successful");
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    }
  }

  return (
    <div className="bg-black p-6 rounded-xl border border-gray-800 h-full flex justify-center items-center">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center items-center flex-col gap-4"
        >
          <Image src="/envelope.png" alt="envelope" height={150} width={150} />
          <p>Please check your email</p>
        </motion.div>
      ) : (
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
              {form.formState.isSubmitting
                ? "Processing..."
                : "Get Free E-Book"}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </Form>
      )}
    </div>
  );
}
