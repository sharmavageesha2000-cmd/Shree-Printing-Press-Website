import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const phone = '15552345678';
  const message = encodeURIComponent('Hello PrintCraft Pro! I would like to inquire about commercial printing press solutions and custom quotes.');
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        background: '#25D366',
        color: '#FFFFFF',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        zIndex: 999,
        transition: 'transform 0.25s ease'
      }}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
      title="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};
