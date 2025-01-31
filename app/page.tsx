import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1f24] text-white flex flex-col items-center px-12">
      {/* Header */}
      <header className="container mx-auto max-w-6xl px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
        <img src="/logo-solid-con-texto-verde.svg" alt="Logo" width={160} height={100} />
        </Link>
        <a href="mailto:contact@alwaystrue.io">
          <Button
          variant="outline"
          className="border-[#a5e887] text-[#a5e887] bg-[#1a1f24] hover:bg-[#a5e887] hover:text-black transition-colors"
        >
          Contact
        </Button>
        </a>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] text-center max-w-4xl">
        {/* Badge */}
        <div className="border /*bg-gradient-to-r from-[#a5e887] to-[#64b6ac]*/ text-white px-6 py-2 mb-4 rounded-full inline-flex items-center">
          Cardano Smart Contract Audits 🔍👨‍💻
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-5xl lg:text-5xl font-mono font-bold max-w-4xl leading-tight mb-24 tracking-tight ">
          My Name Is <span className="text-[#a5e887]">AlwaysTrue</span>,
          <br />
          You Wrote A Bug, Prepare To Die
        </h1>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mb-24 leading-relaxed">
          <span className="text-[#a5e887]">always</span>
          <span className="text-[#a5e887] font-black">true</span> is a cybersecurity company focused on the Cardano ecosystem. We
          specialize in <span className="text-[#64b6ac]">smart contract security and optimization audits</span> and are dedicated to ensuring safe, efficient,
          and scalable decentralized applications. Our expert team combines years of development experience in Cardano
          to deliver tailored solutions.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:contact@alwaystrue.io"
          className="inline-block bg-gradient-to-r from-[#a5e887] to-[#64b6ac] text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Contact Us For An Audit
        </a>
      </main>
    </div>
  )
}
