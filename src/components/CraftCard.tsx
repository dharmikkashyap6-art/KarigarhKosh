import { Link } from "react-router-dom";
import type { Craft } from "@/data/crafts";
import { getCraftImage } from "@/lib/craftImages";
import PixelTransition from "@/components/effects/PixelTransition";

const CraftCard = ({ craft }: { craft: Craft }) => {
  const img = getCraftImage(craft.image);

  return (
    <Link to={`/discover?craft=${craft.id}`} className="group block">
      <div className="bg-sandstone border border-gold overflow-hidden gold-border-top transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden">
          <PixelTransition
            firstContent={
              <img
                src={img}
                alt={craft.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            }
            secondContent={
              <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-royal p-4">
                <p className="font-body text-sm text-parchment text-center leading-relaxed">
                  {craft.description}
                </p>
              </div>
            }
            gridSize={8}
            pixelColor="hsl(22 100% 50%)"
            animationStepDuration={0.4}
            aspectRatio="0%"
            className="!w-full !border-0 !rounded-none"
            style={{ height: '100%', borderRadius: 0 }}
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-base text-heritage-heading">{craft.name}</h3>
            {craft.endangered && (
              <span className="seal-badge text-[9px]">Endangered</span>
            )}
          </div>
          <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{craft.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
            <span>{craft.origin}, {craft.region}</span>
            <span>{craft.artisanCount} artisans</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CraftCard;
