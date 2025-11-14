import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function KpiCard({ title, value, icon }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 border border-blue-100">
      {icon && (
        <div className="p-3 bg-black text-white rounded-xl flex items-center justify-center">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-blue-700">{value}</h2>
      </div>
    </div>
  );
}

interface CardsGridProps {
  cards: Array<{
    title: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
}

export function CardsGrid({ cards }: CardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, index) => (
        <KpiCard key={index} title={card.title} value={card.value} icon={card.icon} />
      ))}
    </div>
  );
}
