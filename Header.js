import React from 'react';

export default function Header({ title }) {
  return (
    <div className="border-b pb-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}
