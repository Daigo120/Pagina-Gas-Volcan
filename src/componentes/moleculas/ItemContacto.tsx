import React from 'react';

interface ItemContactoProps {
  iconClass: string;
  title: string;
  children: React.ReactNode;
}

const ItemContacto: React.FC<ItemContactoProps> = ({ iconClass, title, children }) => {
  return (
    <div className="d-flex mb-4">
      <div className="text-volcan me-3">
        <i className={`bi ${iconClass} fs-3`}></i>
      </div>
      
      <div className="text-start">
        <h6 className="fw-bold mb-1">{title}</h6>
        <div className="text-muted mb-0">{children}</div>
      </div>
      
    </div>
  );
};

export default ItemContacto;