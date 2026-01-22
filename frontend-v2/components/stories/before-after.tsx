import Image from "next/image";

interface BeforeAfterProps {
  before: string;
  after: string;
  caption: string;
}

export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
        Before & After
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Before Image */}
        <div className="space-y-2">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={before}
              alt="Before"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
              Before
            </div>
          </div>
        </div>

        {/* After Image */}
        <div className="space-y-2">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={after}
              alt="After"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
              After
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-muted-foreground text-sm italic">
        {caption}
      </p>
    </div>
  );
}
