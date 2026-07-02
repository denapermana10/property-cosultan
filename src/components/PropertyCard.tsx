import React from 'react';
import { Property } from '../types';
import { MapPin, Bed, Bath, Car, Maximize2, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { openWhatsAppProperty } from '../lib/whatsapp';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelectProperty }) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Hot Offer':
        return 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold animate-pulse';
      case 'Sold Out':
        return 'bg-gray-700 text-gray-200 font-semibold';
      case 'Booking':
        return 'bg-blue-600 text-white font-semibold';
      default:
        return 'bg-emerald-600 text-white font-semibold';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className={`text-xs px-3 py-1 rounded-full shadow-md ${getStatusBadgeColor(property.status)}`}>
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-white/20">
            {property.cluster}
          </span>
        </div>

        {/* Price Tag Overlay on Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold block">Harga Mulai</span>
            <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight drop-shadow-md">
              {property.price}
            </div>
          </div>
          <span className="text-xs bg-emerald-600/90 text-white px-2 py-0.5 rounded font-medium backdrop-blur-xs">
            SHM / AJB
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-heading font-bold text-base text-gray-900 dark:text-white line-clamp-2 cursor-pointer group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition"
          >
            {property.title}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-2 my-4 py-3 px-2.5 bg-gray-50 dark:bg-gray-900/80 rounded-2xl border border-gray-100 dark:border-gray-800 text-center text-xs">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-gray-400 font-medium text-[10px]">
                <Bed className="w-3.5 h-3.5 text-emerald-600" /> KT
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-1 text-gray-400 font-medium text-[10px]">
                <Bath className="w-3.5 h-3.5 text-emerald-600" /> KM
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{property.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-1 text-gray-400 font-medium text-[10px]">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-600" /> LT
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{property.lt} m²</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-1 text-gray-400 font-medium text-[10px]">
                <Car className="w-3.5 h-3.5 text-emerald-600" /> LB
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{property.lb} m²</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-xs transition duration-200"
          >
            <span>Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openWhatsAppProperty(property.title, property.price, property.location)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
