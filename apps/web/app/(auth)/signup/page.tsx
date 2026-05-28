import { SignupForm } from "~/components/signup-form";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#C9732B]/20 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#1F4A3B]/20 blur-[140px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden flex-col justify-between border-r border-white/10 p-12 lg:flex">
          {/* Logo */}
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9732B] to-[#B56A3C] text-lg font-black text-white shadow-[0_10px_40px_rgba(201,115,43,0.35)]">
                C
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  ChaiForms
                </h1>

                <p className="text-sm text-white/40">
                  Futuristic Form Builder
                </p>
              </div>
            </div>
          </div>

          {/* Hero */}
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#F3EBDD]">
              Start Creating
            </div>

            <h2 className="text-6xl font-black leading-none tracking-tight">
              Launch your
              <br />
              creator
              <br />
              workspace.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-white/55">
              Design immersive forms, collect responses,
              and create futuristic experiences for your audience.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <p className="text-sm text-white/40">
                  Active Creators
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  8K+
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <p className="text-sm text-white/40">
                  Forms Built
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  12K+
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <p className="text-sm text-white/40">
                  Responses
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  3M+
                </h3>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-white/30">
            <p>© 2026 ChaiForms</p>

            <div className="flex items-center gap-6">
              <button className="transition hover:text-white">
                Privacy
              </button>

              <button className="transition hover:text-white">
                Terms
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}