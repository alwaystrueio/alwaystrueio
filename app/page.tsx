import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1f24] text-white flex flex-col items-center px-12">
      {/* Header */}
      <header className="container mx-auto max-w-6xl px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 w-[140px] md:w-[180px]">
        <Image src="/logo-solid-con-texto-verde.svg" alt="Logo" width={180} height={100} />
        </Link>
        <a href="mailto:contact@alwaystrue.io">
          <Button
          variant="outline"
          className="text-md md:text-lg border-[#a5e887] text-[#a5e887] bg-[#1a1f24] hover:bg-[#a5e887] hover:text-black transition-colors"
        >
          Contact
        </Button>
        </a>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] text-center max-w-5xl">
        {/* Badge */}
        <div className=" text-md md:text-lg border /*bg-gradient-to-r from-[#a5e887] to-[#64b6ac]*/ text-white px-6 py-2 mb-4 rounded-full inline-flex items-center">
          Cardano Smart Contract Audits 🔍👨‍💻
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-6xl lg:text-6xl font-bold font-mono max-w-5xl leading-tight mb-24 tracking-tighter ">
          My Name Is <span className="text-[#a5e887] font-thin">always</span>
          <span className="text-[#a5e887] font-black">true</span>,
          <br />
          You Wrote A Bug, Prepare To Die
        </h1>

        {/* Description */}
        <p className="text-gray-400 max-w-3xl mb-24 leading-relaxed text-md md:text-lg">
          <span className="text-[#a5e887]">always</span>
          <span className="text-[#a5e887] font-black">true</span> is a cybersecurity company focused on the Cardano ecosystem. We
          specialize in <span className="text-[#64b6ac]">smart contract security and optimization audits</span> and are dedicated to ensuring safe, efficient,
          and scalable decentralized applications. Our expert team combines years of development experience in Cardano
          to deliver tailored solutions.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:contact@alwaystrue.io"
          className="text-md md:text-lg inline-block bg-gradient-to-r from-[#a5e887] to-[#64b6ac] text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Contact Us For An Audit
        </a>
      </main>
    </div>
  )
}
