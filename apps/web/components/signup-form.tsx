
"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { Input } from "~/components/ui/input";
import { useSignup } from "~/hooks/api/auth";


type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
};

export function SignupForm() {

  const router = useRouter();

  const {
    createUserWithEmailAndPasswordAsync,
  } = useSignup();

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = useForm<SignupFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<
    SignupFormValues
  > = async (values) => {

    await createUserWithEmailAndPasswordAsync({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });

    router.replace("/dashboard");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/[0.03]
        p-8
        shadow-[0_0_80px_rgba(0,0,0,0.45)]
        backdrop-blur-3xl
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.12),transparent_30%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
            Create Account
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white">
            Sign Up
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Start building futuristic forms and immersive experiences.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="mb-3 block text-sm font-medium text-white/70">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

              <Input
                type="text"
                placeholder="Rohit Chornele"
                className="
                  h-14
                  rounded-2xl
                  border-white/10
                  bg-white/[0.03]
                  pl-12
                  text-white
                  placeholder:text-white/25
                  focus-visible:ring-[#C9732B]/20
                "
                {...register("fullName")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-3 block text-sm font-medium text-white/70">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

              <Input
                type="email"
                placeholder="you@example.com"
                className="
                  h-14
                  rounded-2xl
                  border-white/10
                  bg-white/[0.03]
                  pl-12
                  text-white
                  placeholder:text-white/25
                  focus-visible:ring-[#C9732B]/20
                "
                {...register("email")}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-3 block text-sm font-medium text-white/70">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

              <Input
                type="password"
                className="
                  h-14
                  rounded-2xl
                  border-white/10
                  bg-white/[0.03]
                  pl-12
                  text-white
                  placeholder:text-white/25
                  focus-visible:ring-[#C9732B]/20
                "
                {...register("password")}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-[#C9732B]
              to-[#B56A3C]
              text-sm
              font-semibold
              text-white
              shadow-[0_15px_50px_rgba(201,115,43,0.3)]
              transition-all
              duration-300
              hover:scale-[1.01]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/45">
          Already have an account?{" "}

          <Link
            href="/login"
            className="font-medium text-[#C9732B] transition hover:text-[#E89A57]"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}