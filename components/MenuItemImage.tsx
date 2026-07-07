interface MenuItemImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function MenuItemImage({ src, alt, className }: MenuItemImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}
