import { Link } from "react-router-dom";
import type { Craftsman } from "@/data/craftsmen";
import { getCraftImage } from "@/lib/craftImages";
import TiltedCard from "@/components/effects/TiltedCard";

const CraftsmanCard = ({ craftsman }: { craftsman: Craftsman }) => {
  const img = getCraftImage(craftsman.image);

  return (
    <Link to={`/craftsman/${craftsman.id}`} className="group block">
      <div className="bg-sandstone border border-gold overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative h-72 overflow-hidden flex items-center justify-center">
          <TiltedCard
            imageSrc={img}
            altText={craftsman.craft}
            captionText={craftsman.name}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="260px"
            imageWidth="100%"
            scaleOnHover={1.05}
            rotateAmplitude={10}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={craftsman.endangered}
            overlayContent={
              <span className="seal-badge bg-primary text-primary-foreground text-[10px] m-3">
                Endangered
              </span>
            }
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg text-heritage-heading mb-1">{craftsman.name}</h3>
          <p className="font-body text-sm text-muted-foreground mb-2">{craftsman.craft} · {craftsman.location}</p>
          <div className="flex items-center justify-between">
            <span className="seal-badge text-[10px]">{craftsman.region}</span>
            <span className="font-body text-xs text-muted-foreground">{craftsman.experience}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CraftsmanCard;
