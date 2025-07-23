import Image from "next/image";

export default function TeknaLogiIcon({
  className = "w-8 h-8",
}: Readonly<{ className?: string }>) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/tekna-logo.png"
        alt="Teknalogi Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
