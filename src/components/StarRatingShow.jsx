import { Star } from 'lucide-react';

export function StarRatingShow({ rating }) {
  const stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(<Star
        key={i}
        size={20}
        fill={i < rating ? '#facc15' : 'none'} // preenche até o rating
        stroke="#facc15" // contorno amarelo
      />)
    
  }

  return <div className="flex gap-1">{stars}</div>;
}