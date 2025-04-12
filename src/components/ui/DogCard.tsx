
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import FeatureBadge from "./FeatureBadge";
import { useState } from "react";
import { Link } from "react-router-dom";

interface DogCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  image: string;
  location: string;
  featured?: boolean;
  className?: string;
}

const DogCard = ({
  id,
  name,
  breed,
  age,
  size,
  gender,
  image,
  location,
  featured = false,
  className,
}: DogCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl",
        featured ? "md:col-span-2 lg:col-span-1" : "",
        className
      )}
    >
      <div className="aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={image}
          alt={`${name} - ${breed}`}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-pawscare-500 text-pawscare-500" : ""}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-lg font-medium">{name}</h3>
          <FeatureBadge>{gender}</FeatureBadge>
        </div>
        <p className="text-sm text-muted-foreground">{breed}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FeatureBadge variant="outline">{age}</FeatureBadge>
          <FeatureBadge variant="outline">{size}</FeatureBadge>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{location}</span>
          <Link
            to={`/adopt/${id}`}
            className="rounded-full bg-pawscare-500 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-pawscare-600"
          >
            Meet {name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
