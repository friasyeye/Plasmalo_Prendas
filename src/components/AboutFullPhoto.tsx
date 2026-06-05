import Image from "next/image";

export function AboutFullPhoto() {
  return (
    <div style={{ width: "100%", height: "480px", overflow: "hidden", position: "relative" }}>
      <Image
        src="/images/about-full-photo.png"
        alt="Man walking with vintage carrying case in industrial building"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="100vw"
      />
    </div>
  );
}
